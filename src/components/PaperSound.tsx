"use client";

import { useRef, useCallback } from "react";

export function usePaperSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      const now = ctx.currentTime;

      // White noise buffer — longer paper slide sound
      const duration = 0.6;
      const sampleRate = ctx.sampleRate;
      const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        // Shape the noise — louder in the middle like a page sliding
        const t = i / data.length;
        const envelope = Math.sin(t * Math.PI);
        data[i] = (Math.random() * 2 - 1) * 0.4 * envelope;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass — papery mid-high frequencies
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2500;
      filter.Q.value = 0.5;

      // Sweep the filter frequency down during playback — like a page settling
      filter.frequency.setValueAtTime(3500, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + duration);

      // Highpass to remove rumble
      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 600;

      // Volume envelope — gentle swell and fade
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.setValueAtTime(0.06, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      source.connect(filter);
      filter.connect(highpass);
      highpass.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + duration);
    } catch {
      // Audio not available — fail silently
    }
  }, []);

  return play;
}
