"use client";

import ContrastAware from "@/components/ContrastAware";
import { useEffect, useRef } from "react";

const COLOR_DEFAULT = 0x00e5ff;
const COLOR_ON_DARK = 0xb8f7ff;

export default function ThreeDecoration() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;

    const init = async () => {
      const THREE = await import("three");

      if (disposed || !container) return;

      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const pointLight = new THREE.PointLight(0x00e5ff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const material = new THREE.MeshPhongMaterial({
        color: COLOR_DEFAULT,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2, 1),
        material
      );
      scene.add(mesh);
      camera.position.z = 5;

      const syncContrast = () => {
        const onDark = container.dataset.onDark === "true";
        material.color.setHex(onDark ? COLOR_ON_DARK : COLOR_DEFAULT);
        material.opacity = onDark ? 0.95 : 0.8;
        pointLight.intensity = onDark ? 1.35 : 1;
      };

      syncContrast();
      const contrastObserver = new MutationObserver(syncContrast);
      contrastObserver.observe(container, {
        attributes: true,
        attributeFilter: ["data-on-dark", "class"]
      });

      let mouseX = 0;
      let mouseY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const onResize = () => {
        const w = container.clientWidth || 300;
        const h = container.clientHeight || 300;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const animate = () => {
        if (disposed) return;
        frameId = requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        mesh.position.x += (mouseX * 0.5 - mesh.position.x) * 0.05;
        mesh.position.y += (mouseY * 0.5 - mesh.position.y) * 0.05;
        renderer.render(scene, camera);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);
      animate();

      return () => {
        contrastObserver.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frameId);
        renderer.dispose();
        mesh.geometry.dispose();
        material.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, []);

  return (
    <ContrastAware
      elementRef={(el) => {
        containerRef.current = el;
      }}
      className="glass-card relative min-h-[18.75rem] overflow-hidden rounded-xl"
      aria-hidden
    />
  );
}
