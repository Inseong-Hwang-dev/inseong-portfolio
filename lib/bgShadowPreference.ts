type BgShadowListener = (enabled: boolean) => void;

const STORAGE_KEY = "portfolio-bg-shadow";

let enabled = true;
let hydrated = false;
const listeners = new Set<BgShadowListener>();

function readStored(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === "1" || raw === "true";
  } catch {
    return true;
  }
}

function writeStored(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function syncDom(value: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.bgShadow = value ? "on" : "off";
}

/** Call once on the client to hydrate from localStorage. */
export function hydrateBgShadowPreference() {
  if (hydrated || typeof window === "undefined") return enabled;
  enabled = readStored();
  hydrated = true;
  syncDom(enabled);
  listeners.forEach((listener) => listener(enabled));
  return enabled;
}

export function getBgShadowEnabled() {
  return enabled;
}

export function setBgShadowEnabled(next: boolean) {
  enabled = next;
  writeStored(next);
  syncDom(next);
  listeners.forEach((listener) => listener(enabled));
}

export function subscribeBgShadow(listener: BgShadowListener) {
  listeners.add(listener);
  listener(enabled);
  return () => {
    listeners.delete(listener);
  };
}
