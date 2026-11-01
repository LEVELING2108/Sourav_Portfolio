"use client";

/**
 * Optional, OFF-by-default UI sounds, synthesised with Web Audio (no audio files).
 * Tuned to be soft: everything is low-passed, no sharp highs.
 *   thock    – muted mechanical-key press (buttons, nav links)
 *   graphite – short pencil-on-paper scratch (hover on drawable things)
 *   page     – paper page flip (route change)
 *   pop      – soft marimba note in C-major pentatonic (mascot)
 *   whoosh   – airy paper-plane swish (resume, contact send)
 */
import { createContext, useCallback, useContext, useRef, useState } from "react";

type SoundName = "thock" | "graphite" | "page" | "pop" | "whoosh";
type Ctx = { enabled: boolean; toggle: () => void; play: (s: SoundName) => void };
const SoundCtx = createContext<Ctx>({ enabled: false, toggle: () => {}, play: () => {} });

const PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);

  const ensure = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const c = new AC();
    const buf = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    ctxRef.current = c; noiseRef.current = buf;
    return c;
  }, []);

  const raw = useCallback((name: SoundName) => {
    const c = ctxRef.current, noise = noiseRef.current;
    if (!c || !noise) return;
    const t = c.currentTime;
    const out = c.createGain(); out.gain.value = 0.5;
    const tone = c.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 4200;
    out.connect(tone).connect(c.destination);

    const noiseBurst = (lo: number, hi: number, start: number, dur: number, peak: number, attack = 0.004) => {
      const s = c.createBufferSource(); s.buffer = noise;
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = Math.sqrt(lo * hi); bp.Q.value = Math.sqrt(lo * hi) / (hi - lo);
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, start); g.gain.linearRampToValueAtTime(peak, start + attack); g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      s.connect(bp).connect(g).connect(out); s.start(start, Math.random() * 0.6, dur + 0.05);
      return bp;
    };
    const sine = (f: number, start: number, dur: number, peak: number) => {
      const o = c.createOscillator(); o.frequency.value = f;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, start); g.gain.linearRampToValueAtTime(peak, start + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      o.connect(g).connect(out); o.start(start); o.stop(start + dur + 0.05);
    };

    if (name === "thock") {
      const f = 210 + Math.random() * 50;
      sine(f, t, 0.09, 0.22); noiseBurst(900, 2300, t, 0.03, 0.12, 0.001);
      noiseBurst(1200, 2800, t + 0.075, 0.02, 0.05, 0.001);
    } else if (name === "graphite") {
      for (let i = 0; i < 3; i++) noiseBurst(1300, 4200, t + i * 0.07, 0.09, 0.05, 0.02);
    } else if (name === "page") {
      const bp = noiseBurst(300, 1500, t, 0.8, 0.18, 0.12);
      bp.frequency.setValueAtTime(400, t); bp.frequency.linearRampToValueAtTime(1300, t + 0.4); bp.frequency.linearRampToValueAtTime(450, t + 0.75);
      sine(105, t + 0.7, 0.12, 0.08);
    } else if (name === "pop") {
      sine(PENTA[Math.floor(Math.random() * PENTA.length)], t, 0.45, 0.12);
    } else if (name === "whoosh") {
      const bp = noiseBurst(350, 1100, t, 1.2, 0.16, 0.3);
      bp.frequency.setValueAtTime(350, t); bp.frequency.linearRampToValueAtTime(1100, t + 0.5); bp.frequency.linearRampToValueAtTime(300, t + 1.1);
    }
  }, []);

  const play = useCallback((s: SoundName) => { if (enabled) raw(s); }, [enabled, raw]);
  const toggle = useCallback(() => {
    const c = ensure();
    if (!c) return;
    if (c.state === "suspended") void c.resume();
    setEnabled((on) => { if (!on) raw("thock"); return !on; });
  }, [ensure, raw]);

  return <SoundCtx.Provider value={{ enabled, toggle, play }}>{children}</SoundCtx.Provider>;
}

export const useSound = () => useContext(SoundCtx);

/** Nav button "♪ off/on". */
export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label="Pencil sounds"
      className={`sk-box-b inline-flex min-h-11 items-center gap-2 px-3.5 text-[15px] font-bold ${enabled ? "bg-accent text-[var(--on-accent)]" : "bg-card text-ink"}`}
    >
      ♪ {enabled ? "on" : "off"}
    </button>
  );
}
