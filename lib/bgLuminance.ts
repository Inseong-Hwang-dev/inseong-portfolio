type BgListener = (timeSec: number, isDark: boolean) => void;

let currentTimeSec = 0;
let currentIsDark = true;
const listeners = new Set<BgListener>();

export function publishBgFrame(timeSec: number, isDark: boolean) {
  currentTimeSec = timeSec;
  currentIsDark = isDark;
  listeners.forEach((listener) => listener(timeSec, isDark));
}

export function subscribeBgFrame(listener: BgListener) {
  listeners.add(listener);
  listener(currentTimeSec, currentIsDark);
  return () => {
    listeners.delete(listener);
  };
}

/** Mirrors BackgroundShader fragment math for a screen point. */
export function sampleBgLuma(
  clientX: number,
  clientY: number,
  timeSec: number,
  isDark: boolean
): number {
  const width = typeof window !== "undefined" ? window.innerWidth || 1 : 1;
  const height = typeof window !== "undefined" ? window.innerHeight || 1 : 1;
  const uvx = clientX / width;
  const uvy = 1 - clientY / height;
  const time = timeSec * 0.2;

  let noise =
    Math.sin(uvx * 3.0 + time) * Math.cos(uvy * 2.0 - time * 0.8);
  noise += Math.sin(uvy * 4.0 + time * 1.2) * Math.cos(uvx * 5.0 + time);

  const darkColor1 = [0.02, 0.08, 0.14];
  const darkColor2 = [0.0, 0.1, 0.15];
  const darkAccent = [0.0, 0.898, 1.0];

  const lightColor1 = [0.91, 0.94, 0.97];
  const lightColor2 = [0.88, 0.92, 0.96];
  const lightAccent = [0.35, 0.62, 0.68];

  const t = isDark ? 1 : 0;
  const color1 = mix3(lightColor1, darkColor1, t);
  const color2 = mix3(lightColor2, darkColor2, t);
  const accent = mix3(lightAccent, darkAccent, t);
  const accentStrength = isDark ? 0.1 : 0.22;

  const mixNoise = noise * 0.5 + 0.5;
  const base = mix3(color1, color2, mixNoise);
  const accentFlash = Math.pow(Math.max(0, noise), 3.0);
  const final = mix3(
    base,
    accent.map((c) => c * accentStrength) as [number, number, number],
    accentFlash
  );

  // Rec. 709 relative luminance
  return 0.2126 * final[0] + 0.7152 * final[1] + 0.0722 * final[2];
}

function mix3(
  a: number[] | [number, number, number],
  b: number[] | [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}
