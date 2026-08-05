"use client";

import { publishBgFrame } from "@/lib/bgLuminance";
import {
  getBgShadowEnabled,
  hydrateBgShadowPreference,
  subscribeBgShadow
} from "@/lib/bgShadowPreference";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_isDark;
  varying vec2 v_texCoord;

  void main() {
    vec2 uv = v_texCoord;
    float time = u_time * 0.2;
    float noise = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time * 0.8);
    noise += sin(uv.y * 4.0 + time * 1.2) * cos(uv.x * 5.0 + time);

    vec3 darkColor1 = vec3(0.02, 0.08, 0.14);
    vec3 darkColor2 = vec3(0.0, 0.1, 0.15);
    vec3 darkAccent = vec3(0.0, 0.898, 1.0);

    vec3 lightColor1 = vec3(0.91, 0.94, 0.97);
    vec3 lightColor2 = vec3(0.88, 0.92, 0.96);
    vec3 lightAccent = vec3(0.35, 0.62, 0.68);

    vec3 color1 = mix(lightColor1, darkColor1, u_isDark);
    vec3 color2 = mix(lightColor2, darkColor2, u_isDark);
    vec3 accent = mix(lightAccent, darkAccent, u_isDark);
    float accentStrength = mix(0.22, 0.1, u_isDark);

    vec3 baseColor = mix(color1, color2, noise * 0.5 + 0.5);
    vec3 finalColor = mix(baseColor, accent * accentStrength, pow(max(0.0, noise), 3.0));
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(1);
  const shadowEnabledRef = useRef(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    isDarkRef.current = resolvedTheme === "light" ? 0 : 1;
  }, [resolvedTheme]);

  useEffect(() => {
    hydrateBgShadowPreference();
    shadowEnabledRef.current = getBgShadowEnabled();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.visibility = shadowEnabledRef.current ? "visible" : "hidden";
    }
    return subscribeBgShadow((enabled) => {
      shadowEnabledRef.current = enabled;
      if (canvasRef.current) {
        canvasRef.current.style.visibility = enabled ? "visible" : "hidden";
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resLocation = gl.getUniformLocation(program, "u_resolution");
    const isDarkLocation = gl.getUniformLocation(program, "u_isDark");

    let frameId = 0;

    const render = (time: number) => {
      const timeSec = time * 0.001;
      const isDark = isDarkRef.current === 1;
      const shadowOn = shadowEnabledRef.current;

      if (shadowOn) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(timeLocation, timeSec);
        gl.uniform2f(resLocation, canvas.width, canvas.height);
        gl.uniform1f(isDarkLocation, isDarkRef.current);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      publishBgFrame(timeSec, isDark);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden />;
}
