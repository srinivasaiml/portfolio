"use client";

import React, { useEffect, useRef, useState } from "react";

interface VaultLoginProps {
  onUnlock: (secretKey: string) => void;
  defaultSecretKey?: string;
}

export default function VaultLogin({ onUnlock, defaultSecretKey = "Srinivas61078@" }: VaultLoginProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageOuterRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const wheelGRef = useRef<SVGGElement>(null);
  const lcdTextRef = useRef<HTMLSpanElement>(null);
  const ledRef = useRef<HTMLSpanElement>(null);
  const keypadRef = useRef<HTMLDivElement>(null);
  const interiorClockRef = useRef<HTMLSpanElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [customKey, setCustomKey] = useState(defaultSecretKey);

  useEffect(() => {
    /* ============ config ============ */
    const CODE = "0422"; // matches the serial on the plate

    /* ============ helpers ============ */
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function tween(
      dur: number,
      ease: (t: number) => number,
      onUpdate: (v: number) => void
    ) {
      return new Promise<void>((res) => {
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / dur);
          onUpdate(ease(t));
          t < 1 ? requestAnimationFrame(step) : res();
        };
        requestAnimationFrame(step);
      });
    }

    /* ============ synthesized sound ============ */
    let audioCtx: AudioContext | null = null;
    let masterGain: GainNode | null = null;
    let noiseBuffer: AudioBuffer | null = null;
    let isSoundOn = true;

    try {
      isSoundOn = localStorage.getItem("vault-sound") !== "off";
    } catch (_) {}
    setSoundEnabled(isSoundOn);

    function ensureSound() {
      if (!audioCtx) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (!AC) return;
        audioCtx = new AC();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.55;
        masterGain.connect(audioCtx.destination);
        noiseBuffer = audioCtx.createBuffer(
          1,
          (audioCtx.sampleRate * 0.35) | 0,
          audioCtx.sampleRate
        );
        const d = noiseBuffer.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
    }

    const live = () => isSoundOn && audioCtx && audioCtx.state === "running";

    function blip({
      type = "square" as OscillatorType,
      f = 1500,
      f2 = null as number | null,
      dur = 0.04,
      vol = 0.08,
      at = 0,
    }) {
      if (!live() || !audioCtx || !masterGain) return;
      const t = audioCtx.currentTime + at;
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(masterGain);
      o.start(t);
      o.stop(t + dur + 0.05);
    }

    function hiss({
      dur = 0.06,
      vol = 0.2,
      type = "lowpass" as BiquadFilterType,
      f = 800,
      q = 1,
      at = 0,
    }) {
      if (!live() || !audioCtx || !masterGain || !noiseBuffer) return;
      const t = audioCtx.currentTime + at;
      const src = audioCtx.createBufferSource();
      src.buffer = noiseBuffer;
      const flt = audioCtx.createBiquadFilter();
      flt.type = type;
      flt.frequency.value = f;
      flt.Q.value = q;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(flt);
      flt.connect(g);
      g.connect(masterGain);
      src.start(t);
      src.stop(t + dur + 0.05);
    }

    const Sound = {
      ensure: ensureSound,
      key() {
        blip({ type: "square", f: 1750, f2: 900, dur: 0.03, vol: 0.05 });
        hiss({ type: "highpass", f: 2600, dur: 0.02, vol: 0.1 });
      },
      tick() {
        blip({ type: "triangle", f: 1350 + Math.random() * 450, dur: 0.018, vol: 0.03 });
      },
      ratchet() {
        blip({ type: "square", f: 1050 + Math.random() * 220, dur: 0.016, vol: 0.035 });
        hiss({ type: "highpass", f: 1900, dur: 0.012, vol: 0.05 });
      },
      rattle() {
        blip({ type: "square", f: 300 + Math.random() * 260, dur: 0.02, vol: 0.04 });
      },
      clunk() {
        hiss({ type: "lowpass", f: 210, dur: 0.07, vol: 0.5 });
        blip({ type: "sine", f: 150, f2: 64, dur: 0.09, vol: 0.22 });
      },
      thunk() {
        hiss({ type: "lowpass", f: 140, dur: 0.11, vol: 0.55 });
        blip({ type: "sine", f: 92, f2: 48, dur: 0.14, vol: 0.3 });
        hiss({ type: "bandpass", f: 640, q: 9, dur: 0.1, vol: 0.09 });
      },
      accept() {
        blip({ type: "sine", f: 660, dur: 0.12, vol: 0.06 });
        blip({ type: "sine", f: 990, dur: 0.16, vol: 0.05, at: 0.09 });
      },
      chime() {
        [
          [523.25, 0, 0.085],
          [659.25, 0.1, 0.08],
          [783.99, 0.2, 0.075],
          [1046.5, 0.32, 0.055],
        ].forEach(([f, at, v]) => blip({ type: "sine", f, dur: 0.9, vol: v, at }));
        blip({ type: "sine", f: 131, f2: 98, dur: 0.35, vol: 0.12, at: 0.02 });
      },
      buzz() {
        blip({ type: "square", f: 96, dur: 0.13, vol: 0.09 });
        blip({ type: "square", f: 82, dur: 0.16, vol: 0.09, at: 0.17 });
        hiss({ type: "lowpass", f: 300, dur: 0.3, vol: 0.12 });
      },
    };

    const firstInteract = () => Sound.ensure();
    document.addEventListener("pointerdown", firstInteract, { once: true });

    /* ============ engraved stencil digit glyphs ============ */
    const GLYPHS: Record<string, string> = {
      "0": "M32 8C44 8 50 21 50 50C50 79 44 92 32 92C20 92 14 79 14 50C14 21 20 8 32 8Z",
      "1": "M20 21L38 8L38 92M24 92H52",
      "2": "M15 22C15 11 22 7 32 7C42 7 49 13 49 22C49 33 40 42 29 51C22 57 16 68 15 92L50 92",
      "3": "M16 10C19 7 25 6.5 32 6.5C42 6.5 48 12 48 20C48 28 41 34 33 36C43 38 49 45 49 55C49 73 40 88 28 88C20 88 14 84 11 78",
      "4": "M42 92L42 8L14 66L50 66",
      "5": "M47 8L16 8L16 38C21 36 26 35 31 35C41 35 48 42 48 54C48 68 39 88 26 88C18 88 12 83 10 77",
      "6": "M45 10C38 6.5 27 13 21 28C16 40 13 50 13 60C13 80 22 92 33 92C43 92 49 85 49 74C49 63 42 56 32 56C22 56 15 62 13.5 70",
      "7": "M13 8L51 8L26 92",
      "8": "M32 7C40 7 46 13 46 22C46 31 40 37 32 37C24 37 18 31 18 22C18 13 24 7 32 7ZM32 37C42 37 50 45 50 58C50 75 42 92 32 92C22 92 14 75 14 58C14 45 22 37 32 37Z",
      "9": "M19 90C26 93.5 37 87 43 72C48 60 51 50 51 40C51 20 42 8 31 8C21 8 15 15 15 26C15 37 22 44 32 44C42 44 49 38 50.5 30",
    };
    const glyphSVG = (d: string) =>
      `<svg class="glyph" viewBox="0 0 64 100" aria-hidden="true"><path d="${GLYPHS[d]}"/></svg>`;

    /* ============ odometer reels ============ */
    const BASE = 11;
    const CELL_HEIGHT = 108;
    const SYMS = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const idxOf = (d: string) => d.charCodeAt(0) - 48 + 1;

    class Reel {
      slot: HTMLElement;
      win: HTMLElement;
      strip: HTMLDivElement;
      H: number;
      pos: number;
      animId: number;
      lastTick: number;

      constructor(slot: HTMLElement) {
        this.slot = slot;
        this.win = slot.querySelector(".window") as HTMLElement;
        this.strip = document.createElement("div");
        this.strip.className = "strip";
        let h = "";
        for (let c = 0; c < 10; c++)
          for (let i = 0; i < BASE; i++)
            h += `<div class="cell${i ? "" : " blank"}">${
              SYMS[i] ? glyphSVG(SYMS[i]) : ""
            }</div>`;
        this.strip.innerHTML = h;
        this.win.appendChild(this.strip);
        this.H = CELL_HEIGHT;
        this.pos = BASE;
        this.animId = 0;
        this.lastTick = 0;
        this.render();
      }
      render() {
        this.strip.style.transform = `translate3d(0,${(
          -this.pos * this.H
        ).toFixed(2)}px,0)`;
      }
      mod(v: number) {
        return ((v % BASE) + BASE) % BASE;
      }

      spinTo(sym: number, opt: any = {}) {
        const {
          loops = 2,
          dur = 640,
          overshoot = 0.34,
          settle = 160,
          ease = easeOutCubic,
        } = opt;
        const id = ++this.animId;
        this.pos = BASE + this.mod(this.pos);
        const from = this.pos;
        const end = from + this.mod(sym - from) + BASE * loops;
        const over = end + overshoot;
        return this._run(from, over, dur, ease, id)
          .then((ok) =>
            ok && overshoot > 0
              ? this._run(over, end, settle, easeOutQuad, id)
              : ok
          )
          .then((ok) => {
            if (ok) {
              this.pos = BASE + this.mod(end);
              this.render();
              this.strip.style.filter = "";
            }
            return ok;
          });
      }

      async scrambleFor(ms: number, delay = 0) {
        const id = ++this.animId;
        await wait(delay);
        this.pos = BASE + this.mod(this.pos);
        const stopAt = performance.now() + ms;
        while (id === this.animId && performance.now() < stopAt - 300) {
          const span = Math.min(
            320 + Math.random() * 240,
            stopAt - performance.now()
          );
          const ok = await this._run(
            this.pos,
            this.pos + 7 + Math.random() * 8,
            Math.max(260, span),
            easeInOutSine,
            id
          );
          if (!ok) return;
        }
      }

      wobble() {
        const id = ++this.animId;
        const base = this.pos,
          A = 0.48,
          dur = 640;
        let lastDir = 0;
        return new Promise((res) => {
          const t0 = performance.now();
          const step = (now: number) => {
            if (id !== this.animId) return res(false);
            const t = (now - t0) / dur;
            if (t >= 1) {
              this.pos = base;
              this.render();
              this.strip.style.filter = "";
              return res(true);
            }
            const p = base + Math.sin(t * 24) * A * Math.exp(-t * 4.6);
            const dir = Math.sign(p - this.pos);
            if (dir && dir !== lastDir) Sound.rattle();
            lastDir = dir;
            this.pos = p;
            this.render();
            requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }

      _run(
        from: number,
        to: number,
        dur: number,
        ease: (t: number) => number,
        id: number
      ) {
        const ok = () => id === this.animId;
        if (!ok()) return Promise.resolve(false);
        return new Promise<boolean>((res) => {
          const t0 = performance.now();
          let lastP = from,
            lastT = t0;
          const step = (now: number) => {
            if (!ok()) return res(false);
            const t = Math.min(1, (now - t0) / dur);
            const p = from + (to - from) * ease(t);
            const v =
              (Math.abs(p - lastP) / Math.max(1, now - lastT)) * 1000;
            this._blur(v);
            if (
              Math.floor(p) !== Math.floor(lastP) &&
              now - this.lastTick > 26
            ) {
              this.lastTick = now;
              Sound.tick();
            }
            lastP = p;
            lastT = now;
            this.pos = p;
            this.render();
            t < 1 ? requestAnimationFrame(step) : res(true);
          };
          requestAnimationFrame(step);
        });
      }

      _blur(v: number) {
        const b = Math.max(0, Math.min(4.2, (v - 6.5) * 0.5));
        this.strip.style.filter = b > 0.25 ? `blur(${b.toFixed(2)}px)` : "";
      }
    }

    /* build 4 drum slots */
    const slots: HTMLElement[] = [];
    const reels: Reel[] = [];
    if (reelsContainerRef.current) {
      reelsContainerRef.current.innerHTML = "";
      for (let i = 0; i < 4; i++) {
        const s = document.createElement("div");
        s.className = "slot";
        s.innerHTML =
          '<div class="window"></div><div class="shade"></div><div class="ring"></div>';
        reelsContainerRef.current.appendChild(s);
        slots.push(s);
        reels.push(new Reel(s));
      }
    }

    /* ============ wheel ============ */
    let wheelDeg = 0,
      wheelTickRef = 0;
    function rotateWheelTo(
      target: number,
      dur: number,
      ease = easeInOutSine
    ) {
      const from = wheelDeg;
      return tween(dur, ease, (v) => {
        wheelDeg = from + (target - from) * v;
        if (wheelGRef.current) {
          wheelGRef.current.setAttribute(
            "transform",
            `rotate(${wheelDeg.toFixed(2)} 75 75)`
          );
        }
        if (Math.abs(wheelDeg - wheelTickRef) >= 12) {
          wheelTickRef = wheelDeg;
          Sound.ratchet();
        }
      });
    }

    async function wheelRock(ms: number) {
      const moves = [36, -28, 24, -18, 14, -10, 7];
      const stopAt = performance.now() + ms;
      let acc = 0;
      for (const m of moves) {
        if (performance.now() > stopAt - 240) break;
        acc += m;
        await rotateWheelTo(acc, 250);
      }
    }

    /* ============ feedback ============ */
    function lcd(text: string, tone?: "green" | "red") {
      if (!lcdTextRef.current) return;
      lcdTextRef.current.textContent = text;
      lcdTextRef.current.classList.remove("green", "red", "swap");
      if (tone) lcdTextRef.current.classList.add(tone);
      void lcdTextRef.current.offsetWidth;
      lcdTextRef.current.classList.add("swap");
    }

    function setLed(mode: "idle" | "blink" | "ok" | "err") {
      if (ledRef.current) {
        ledRef.current.className = "led " + mode;
      }
    }

    function markNext(i: number) {
      slots.forEach((s, j) =>
        s.classList.toggle("next", j === i && i < 4)
      );
    }

    function flashSlot(i: number, cls = "flash") {
      const s = slots[i];
      if (!s) return;
      s.classList.remove("flash", "flash-err");
      void s.offsetWidth;
      s.classList.add(cls);
      setTimeout(() => s.classList.remove(cls), 700);
    }

    const nudgeDoor = () => {
      if (doorRef.current) {
        doorRef.current.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(1.5px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 170, easing: "ease-out" }
        );
      }
    };

    const shakeDoor = () => {
      if (doorRef.current) {
        doorRef.current.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-7px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(3px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 480, easing: "ease-in-out" }
        );
      }
    };

    /* ============ state & input ============ */
    const state = { phase: "boot", digits: [] as string[] };

    function pressDigit(d: string) {
      if (state.phase !== "entering" || state.digits.length >= 4) return;
      const i = state.digits.length;
      state.digits.push(d);
      markNext(state.digits.length);
      Sound.key();
      lcd(`CIPHER BUFFER · ${state.digits.length}/4`);
      reels[i].spinTo(idxOf(d), { loops: 2, dur: 620 }).then((ok) => {
        if (!ok || state.phase !== "entering") return;
        flashSlot(i);
        Sound.clunk();
        if (state.digits.length === 4) {
          state.phase = "armed";
          setTimeout(() => {
            if (state.phase === "armed") verify();
          }, 430);
        }
      });
    }

    function backspace() {
      if (
        (state.phase !== "entering" && state.phase !== "armed") ||
        !state.digits.length
      )
        return;
      if (state.phase === "armed") state.phase = "entering";
      const i = state.digits.length - 1;
      state.digits.pop();
      Sound.key();
      reels[i].spinTo(0, { loops: 1, dur: 460 });
      markNext(i);
      lcd(
        state.digits.length
          ? `CIPHER BUFFER · ${state.digits.length}/4`
          : "READY — ENTER 4-DIGIT NODE CODE"
      );
    }

    function clearAll() {
      if (
        (state.phase !== "entering" && state.phase !== "armed") ||
        !state.digits.length
      )
        return;
      if (state.phase === "armed") state.phase = "entering";
      const n = state.digits.length;
      state.digits = [];
      Sound.key();
      for (let i = 0; i < n; i++)
        setTimeout(() => reels[i].spinTo(0, { loops: 1, dur: 440 }), i * 80);
      markNext(0);
      lcd("READY — ENTER 4-DIGIT NODE CODE");
    }

    function escapeAction() {
      if (state.phase === "entering" || state.phase === "armed") clearAll();
      else if (state.phase === "granted") closeVault();
    }

    /* ============ verification ============ */
    async function verify() {
      state.phase = "verifying";
      keypadRef.current?.classList.add("locked");
      markNext(4);
      const code = state.digits.join("");

      /* phase A — scramble */
      lcd("VERIFYING — QUANTUM DECRYPTION RUNNING");
      setLed("blink");
      reels.forEach((r, i) => r.scrambleFor(1150, i * 70));
      await wheelRock(1250);
      await wait(220);

      /* phase B — align tumblers */
      let failed = -1;
      for (let i = 0; i < 4; i++) {
        lcd(`SYNCING FREQUENCY TUMBLER ${i + 1}/4`);
        if (code[i] === CODE[i]) {
          reels[i].spinTo(idxOf(code[i]), { loops: 1, dur: 560 }).then((ok) => {
            if (ok && state.phase === "verifying") {
              flashSlot(i);
              Sound.clunk();
            }
          });
          await wait(300);
        } else {
          failed = i;
          await reels[i].spinTo(idxOf(code[i]), {
            loops: 1,
            dur: 560,
            overshoot: 0,
          });
          flashSlot(i, "flash-err");
          await reels[i].wobble();
          break;
        }
      }
      if (failed >= 0) return deny(failed);
      await wait(520);

      /* phase C — accepted */
      lcd("CIPHER VERIFIED // NODE UNLOCKED", "green");
      setLed("ok");
      Sound.accept();
      await wait(520);

      lcd("DISENGAGING HYDRAULIC LOCKS");
      await rotateWheelTo(wheelDeg + 375, 950, easeInOutCubic);
      const bolts = document.querySelectorAll(".bolt");
      for (const b of Array.from(bolts)) {
        b.classList.add("in");
        Sound.thunk();
        nudgeDoor();
        await wait(160);
      }
      await wait(220);

      lcd("CLEARANCE LEVEL 4 // ACCESS GRANTED", "green");
      if (interiorClockRef.current) {
        interiorClockRef.current.textContent = new Date().toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        );
      }
      frameRef.current?.classList.add("open");
      Sound.chime();
      state.phase = "granted";
    }

    async function deny(failedIdx: number) {
      lcd(`TUMBLER ${failedIdx + 1} DEVIATION DETECTED`, "red");
      setLed("err");
      Sound.buzz();
      shakeDoor();
      await wait(700);
      lcd("ACCESS DENIED // CIPHER MISMATCH", "red");
      await wait(900);

      state.digits = [];
      state.phase = "entering";
      keypadRef.current?.classList.remove("locked");
      setLed("idle");
      lcd("READY — ENTER 4-DIGIT NODE CODE");
      markNext(0);
      reels.forEach((r, i) =>
        setTimeout(() => r.spinTo(0, { loops: 1, dur: 500 }), i * 90)
      );
    }

    async function closeVault() {
      if (state.phase !== "granted") return;
      state.phase = "closing";
      lcd("SECURING VORTEX GATEWAY");
      setLed("blink");
      frameRef.current?.classList.remove("open");
      await wait(1080);
      const bolts = Array.from(document.querySelectorAll(".bolt")).reverse();
      for (const b of bolts) {
        b.classList.remove("in");
        Sound.thunk();
        nudgeDoor();
        await wait(150);
      }
      await rotateWheelTo(0, 850, easeInOutCubic);
      reels.forEach((r, i) =>
        setTimeout(() => r.spinTo(0, { loops: 1, dur: 480 }), i * 80)
      );
      state.digits = [];
      await wait(500);
      setLed("idle");
      lcd("READY — ENTER 4-DIGIT NODE CODE");
      markNext(0);
      keypadRef.current?.classList.remove("locked");
      state.phase = "entering";
    }

    /* ============ events ============ */
    function pressKeyVisual(key: string) {
      const b = keypadRef.current?.querySelector(`[data-key="${key}"]`);
      if (!b) return;
      b.classList.add("pressed");
      setTimeout(() => b.classList.remove("pressed"), 130);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      Sound.ensure();
      if (e.key >= "0" && e.key <= "9") {
        pressDigit(e.key);
        pressKeyVisual(e.key);
      } else if (e.key === "Backspace") {
        backspace();
        pressKeyVisual("back");
      } else if (e.key === "Escape") {
        escapeAction();
      } else if (e.key === "c" || e.key === "C") {
        clearAll();
        pressKeyVisual("clear");
      }
    };

    const handleKeypadPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const b = target.closest(".key") as HTMLElement | null;
      if (!b) return;
      e.preventDefault();
      const k = b.dataset.key;
      if (k === "back") backspace();
      else if (k === "clear") clearAll();
      else if (k) pressDigit(k);
    };

    document.addEventListener("keydown", handleKeyDown);
    const kp = keypadRef.current;
    if (kp) kp.addEventListener("pointerdown", handleKeypadPointer as any);

    /* close button inside interior */
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) closeBtn.onclick = closeVault;

    /* enter dashboard button inside interior */
    const enterBtn = document.getElementById("enterBtn");
    if (enterBtn) {
      enterBtn.onclick = () => {
        onUnlock(customKey);
      };
    }

    /* ============ fit the vault to the viewport ============ */
    const stage = stageRef.current;
    const stageOuter = stageOuterRef.current;
    let stageW = 0,
      stageH = 0;

    function fit() {
      if (!stage || !stageOuter) return;
      if (!stageW) {
        stageW = stage.offsetWidth || 432;
        stageH = stage.offsetHeight || 586;
      }
      const hudEl = document.querySelector(".hud") as HTMLElement;
      const hintEl = document.querySelector(".hint") as HTMLElement;
      const hudH = hudEl ? hudEl.offsetHeight : 0;
      const hintH = hintEl ? hintEl.offsetHeight : 44;
      const availH = window.innerHeight - hudH - hintH - 58;
      const availW = document.documentElement.clientWidth - 24;
      const s = Math.max(0.48, Math.min(1, availH / stageH, availW / stageW));
      stage.style.transform = `scale(${s})`;
      stageOuter.style.height = stageH * s + "px";
    }

    window.addEventListener("resize", fit);

    /* ============ boot ============ */
    async function boot() {
      fit();
      lcd("VORTEX PROTOCOL · NODE DIAGNOSTIC");
      setLed("blink");
      reels.forEach((r, i) =>
        setTimeout(
          () =>
            r.spinTo(1 + Math.floor(Math.random() * 10), {
              loops: 1,
              dur: 520,
            }),
          90 * i
        )
      );
      await wait(1250);
      reels.forEach((r, i) =>
        setTimeout(() => r.spinTo(0, { loops: 1, dur: 420 }), 70 * i)
      );
      await wait(1000);
      setLed("idle");
      lcd("READY — ENTER 4-DIGIT NODE CODE");
      markNext(0);
      state.phase = "entering";
    }

    boot();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", firstInteract);
      window.removeEventListener("resize", fit);
      if (kp) kp.removeEventListener("pointerdown", handleKeypadPointer as any);
    };
  }, [onUnlock, customKey]);

  return (
    <div className="vault-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root{
          --cyber-primary:#6366f1;
          --cyber-primary-hi:#818cf8;
          --cyber-primary-lo:#312e81;
          --cyber-cyan:#38bdf8;
          --cyber-cyan-hi:#7dd3fc;
          --cyber-purple:#a855f7;
          --ink:#f8fafc;
          --amber:#38bdf8;
          --green:#10b981;
          --red:#f43f5e;
          --brass:#6366f1;
          --brass-hi:#38bdf8;
          --brass-lo:#4338ca;
          --noise:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        .vault-wrapper {
          min-height: 100vh;
          width: 100%;
          background:
            radial-gradient(1000px 600px at 50% 18%, rgba(99, 102, 241, 0.18), transparent 65%),
            radial-gradient(800px 500px at 50% 82%, rgba(6, 182, 212, 0.12), transparent 70%),
            radial-gradient(ellipse at center, #0b0f19 0%, #030712 100%);
          color: var(--ink);
          font-family: 'Chakra Petch', sans-serif;
          overflow-x: hidden;
          position: relative;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .vault-wrapper::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 90;
          background-image: var(--noise);
          opacity: 0.45;
        }

        /* ---------- HUD ---------- */
        .hud{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;
          padding:16px 24px;z-index:50}
        .hud-brand{display:flex;align-items:center;gap:10px;font:600 11px 'IBM Plex Mono';letter-spacing:2.5px;color:#94a3b8}
        .hud-brand::before{content:'';width:8px;height:8px;background:#6366f1;box-shadow:0 0 10px #6366f1;transform:rotate(45deg);flex:none}
        .hud-controls{display:flex;align-items:center;gap:10px}
        .icon-btn{width:36px;height:36px;display:grid;place-items:center;background:rgba(15,23,42,0.6);
          border:1px solid rgba(99,102,241,0.3);border-radius:10px;color:#94a3b8;cursor:pointer;transition:.2s}
        .icon-btn:hover{color:#38bdf8;border-color:#6366f1;background:rgba(99,102,241,0.15);box-shadow:0 0 14px rgba(99,102,241,0.3)}
        .icon-btn:focus-visible{outline:2px solid #6366f1;outline-offset:2px}

        .vault-main{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:20px;padding:24px 14px}
        .stage-outer{position:relative;animation:rise .9s cubic-bezier(.16,.8,.26,1) both .15s}
        @keyframes rise{from{opacity:0;transform:translateY(30px) scale(.985)}to{opacity:1;transform:none}}
        #stage{transform-origin:top center}

        .hint{font:400 11px/1.8 'IBM Plex Mono';letter-spacing:.8px;color:#64748b;text-align:center;max-width:540px}
        .hint b{color:#38bdf8;font-weight:600}

        /* ---------- Vault wall / frame ---------- */
        .frame{position:relative;width:432px;padding:46px 20px 20px;border-radius:26px;
          border:1px solid rgba(99,102,241,0.35);
          background:
            var(--noise),
            repeating-linear-gradient(0deg, rgba(255,255,255,.015) 0 1px, rgba(0,0,0,0) 1px 4px),
            linear-gradient(180deg,#151928,#0e1220 55%,#080a13);
          box-shadow:0 34px 70px -20px rgba(0,0,0,.9), 0 0 40px -10px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,.1), inset 0 -22px 40px rgba(0,0,0,.5);
          user-select:none}
        .frame-label{position:absolute;top:18px;left:0;right:0;text-align:center;
          font:600 9.5px 'IBM Plex Mono';letter-spacing:3.5px;color:#64748b}
        .screw{position:absolute;width:11px;height:11px;border-radius:50%;
          background:radial-gradient(circle at 35% 30%, #38bdf8, #0f172a 70%);
          box-shadow:inset 0 -1px 1px rgba(0,0,0,.9), 0 0 6px rgba(56,189,248,0.4)}
        .screw::before{content:'';position:absolute;left:1.5px;right:1.5px;top:50%;height:1.4px;margin-top:-.7px;
          background:rgba(0,0,0,.85);transform:rotate(38deg)}
        .s1{top:10px;left:11px}.s2{top:10px;right:11px}.s3{bottom:10px;left:11px}.s4{bottom:10px;right:11px}

        /* ---------- The opening (3D scene) ---------- */
        .opening{position:relative;width:392px;height:520px;border-radius:18px;perspective:1500px}
        .interior{position:absolute;inset:0;border-radius:18px;overflow:hidden;z-index:1;
          background:var(--noise), #030712}
        .interior .light{position:absolute;inset:-20%;opacity:0;transition:opacity .5s ease;
          background:radial-gradient(closest-side at 62% 50%, rgba(99,102,241,.25), rgba(6,182,212,.1) 45%, transparent 72%)}
        .frame.open .interior .light{opacity:1;transition:opacity 1.1s ease .35s}
        .interior-content{position:absolute;top:0;bottom:0;left:38%;right:0;z-index:2;
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;
          padding: 0 12px;
          opacity:0;transform:translateX(16px);transition:opacity .4s ease, transform .4s ease}
        .frame.open .interior-content{opacity:1;transform:none;
          transition:opacity .7s ease .55s, transform .8s cubic-bezier(.2,.7,.2,1) .55s}
        .ck{width:76px;height:76px}
        .ck-ring,.ck-mark{fill:none;stroke:#10b981;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;
          stroke-dasharray:100;stroke-dashoffset:100;filter:drop-shadow(0 0 12px rgba(16,185,129,0.7))}
        .frame.open .ck-ring{stroke-dashoffset:0;transition:stroke-dashoffset .65s ease .55s}
        .frame.open .ck-mark{stroke-dashoffset:0;transition:stroke-dashoffset .4s ease 1.02s}
        .granted{font:700 18px/1.3 'Chakra Petch';letter-spacing:3px;color:#10b981;text-shadow:0 0 18px rgba(16,185,129,0.7)}
        .meta{font:500 9px 'IBM Plex Mono';letter-spacing:1.8px;color:#38bdf8}
        .ghost-btn{font:600 10.5px 'Chakra Petch';letter-spacing:2px;color:#38bdf8;background:transparent;
          border:1px solid rgba(56,189,248,.45);padding:8px 14px;border-radius:8px;cursor:pointer;
          transition:.2s;margin-top:2px}
        .ghost-btn:hover{background:rgba(56,189,248,.12);border-color:#38bdf8;box-shadow:0 0 14px rgba(56,189,248,0.3)}
        .ghost-btn.enter-btn{background:linear-gradient(135deg, #6366f1, #8b5cf6);color:#ffffff;border-color:#38bdf8;font-weight:700;box-shadow:0 0 24px rgba(99,102,241,0.55)}
        .ghost-btn.enter-btn:hover{background:linear-gradient(135deg, #4f46e5, #7c3aed);transform:scale(1.03);box-shadow:0 0 30px rgba(99,102,241,0.8)}
        .spill{position:absolute;inset:0;border-radius:18px;z-index:2;pointer-events:none;opacity:0;
          transition:opacity .5s ease;box-shadow:inset 0 0 50px 8px rgba(99,102,241,.25)}
        .frame.open .spill{opacity:1;transition:opacity 1.2s ease .5s}
        .rcv{position:absolute;width:20px;height:42px;background:#030712;border-radius:4px;z-index:1;
          box-shadow:inset 0 2px 4px rgba(0,0,0,.95), 0 0 8px rgba(99,102,241,.2)}
        .rcv-l{left:-10px}.rcv-r{right:-10px}
        .rt1{top:calc(27% - 2px)}.rt2{top:calc(67% - 2px)}

        /* ---------- The door ---------- */
        .door{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;justify-content:space-between;
          align-items:center;padding:24px 22px;border-radius:18px;border:1px solid #0f1526;
          transform-origin:left center;transform-style:preserve-3d;will-change:transform;
          transition:transform 1.15s cubic-bezier(.6,-.08,.3,1.06);
          background:
            repeating-linear-gradient(90deg, rgba(255,255,255,.015) 0 1px, rgba(0,0,0,0) 1px 3px),
            linear-gradient(180deg,#1c2338,#131929 45%,#0d121f);
          box-shadow:0 24px 50px -18px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.1),
            inset 0 -16px 28px rgba(0,0,0,.5), inset 16px 0 28px -18px rgba(99,102,241,.2), inset -16px 0 28px -18px rgba(99,102,241,.2)}
        .frame.open .door{transform:rotateY(64deg)}
        .door::after{content:'';position:absolute;inset:0;border-radius:18px;background:rgba(3,7,18,.45);
          opacity:0;transition:opacity .9s ease .1s;pointer-events:none;z-index:9}
        .frame.open .door::after{opacity:1}
        .door-edge{position:absolute;top:3px;bottom:3px;right:0;width:20px;border-radius:0 4px 4px 0;
          transform-origin:right center;transform:rotateY(-90deg);background:#0a0e1a;
          box-shadow:inset 0 0 0 1px rgba(0,0,0,.8)}
        .hinge{position:absolute;left:-9px;width:18px;height:54px;border-radius:6px;border:1px solid #0f172a;z-index:4;
          background:linear-gradient(90deg,#312e81,#6366f1 45%,#1e1b4b);box-shadow:0 2px 6px rgba(0,0,0,.7), 0 0 10px rgba(99,102,241,.25)}
        .hinge::before,.hinge::after{content:'';position:absolute;left:50%;transform:translateX(-50%);
          width:6px;height:6px;border-radius:50%;background:#020617;
          box-shadow:inset 0 1px 1px rgba(0,0,0,.9), 0 0 4px #38bdf8}
        .hinge::before{top:5px}.hinge::after{bottom:5px}
        .hinge-t{top:9%}.hinge-b{bottom:9%}
        .bolt{position:absolute;width:24px;height:38px;border-radius:4px;z-index:4;border:1px solid #0f172a;
          background:linear-gradient(180deg,#818cf8,#6366f1 55%,#312e81);
          box-shadow:0 3px 8px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.4), 0 0 12px rgba(99,102,241,0.5);
          transition:transform .26s cubic-bezier(.3,1.35,.45,1)}
        .bolt::after{content:'';position:absolute;inset:7px 5px;border-radius:2px;background:rgba(3,7,18,.5);
          box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}
        .bolt-l{left:-12px}.bolt-r{right:-12px}
        .bolt-l.in{transform:translateX(12px)}.bolt-r.in{transform:translateX(-12px)}
        .bt1{top:27%}.bt2{top:67%}
        .rivet{position:absolute;width:11px;height:11px;border-radius:50%;z-index:1;
          background:radial-gradient(circle at 35% 30%, #38bdf8, #0f172a 65%);
          box-shadow:0 1px 2px rgba(0,0,0,.8), 0 0 6px rgba(56,189,248,0.25)}
        .r1{top:10px;left:10px}.r2{top:10px;right:10px}.r3{bottom:10px;left:10px}.r4{bottom:10px;right:10px}
        .r5{top:10px;left:50%;margin-left:-5.5px}.r6{bottom:10px;left:50%;margin-left:-5.5px}

        .plaque{display:flex;align-items:center;gap:14px;padding:8px 18px;border-radius:8px;
          background:linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));border:1px solid rgba(56,189,248,0.4);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 0 18px rgba(56,189,248,.25), 0 4px 10px rgba(0,0,0,.6)}
        .plaque b{font:700 15px 'Chakra Petch';color:#38bdf8;letter-spacing:3px;text-shadow:0 0 10px rgba(56,189,248,0.5)}
        .plaque span{font:600 9.5px 'IBM Plex Mono';color:#94a3b8;letter-spacing:1.8px;
          padding-left:14px;border-left:1px solid rgba(99,102,241,0.5)}

        .lcd{width:100%;height:34px;display:flex;align-items:center;gap:10px;padding:0 12px;border-radius:8px;
          background:#020617;border:1px solid rgba(56,189,248,0.4);
          box-shadow:inset 0 2px 8px rgba(0,0,0,.95), 0 0 14px rgba(56,189,248,.18), 0 1px 0 rgba(255,255,255,.05)}
        .lcd-text{font:600 11px 'IBM Plex Mono';letter-spacing:1.8px;color:#38bdf8;text-shadow:0 0 8px rgba(56,189,248,0.5);white-space:nowrap;overflow:hidden}
        .lcd-text.green{color:#10b981;text-shadow:0 0 8px rgba(16,185,129,0.7)}.lcd-text.red{color:#f43f5e;text-shadow:0 0 8px rgba(244,63,94,0.7)}
        .lcd-text.swap{animation:lcdSwap .16s linear}
        @keyframes lcdSwap{from{opacity:.15}to{opacity:1}}
        .led{width:8px;height:8px;border-radius:50%;background:#1e293b;flex:none}
        .led.idle{background:#38bdf8;box-shadow:0 0 12px #38bdf8;animation:ledPulse 2.4s ease-in-out infinite}
        .led.blink{background:#38bdf8;box-shadow:0 0 14px #38bdf8;animation:ledBlink .5s steps(2,end) infinite}
        .led.ok{background:#10b981;box-shadow:0 0 14px #10b981;animation:ledPulse 1.6s infinite}
        .led.err{background:#f43f5e;box-shadow:0 0 14px #f43f5e}
        @keyframes ledPulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes ledBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

        /* ---------- Digit drums ---------- */
        .reels{display:flex;justify-content:space-between;width:100%}
        .slot{position:relative;width:74px;height:112px;box-sizing:border-box;border-radius:10px;background:#080c18;
          border:1px solid rgba(99,102,241,0.3);
          box-shadow:inset 0 0 0 1px rgba(56,189,248,.15), 0 4px 12px rgba(0,0,0,.6)}
        .window{position:absolute;top:1px;left:2px;right:2px;height:108px;box-sizing:border-box;border-radius:8px;overflow:hidden;background:#020617;
          -webkit-mask-image:linear-gradient(180deg,transparent 2%,#000 18%,#000 82%,transparent 98%);
          mask-image:linear-gradient(180deg,transparent 2%,#000 18%,#000 82%,transparent 98%)}
        .strip{position:absolute;top:0;left:0;width:100%;margin:0;padding:0;display:flex;flex-direction:column;color:var(--ink);will-change:transform}
        .cell{height:108px;min-height:108px;max-height:108px;flex:0 0 108px;box-sizing:border-box;margin:0;padding:0;display:flex;align-items:center;justify-content:center}
        .glyph{display:block;width:37.1px;height:58px;flex-shrink:0;fill:none;stroke:#e0f2fe;
          stroke-width:10.5;stroke-linecap:round;stroke-linejoin:round;
          filter:drop-shadow(0 0 7px rgba(56,189,248,0.75))}
        .cell.blank::before{content:'';width:24px;height:4px;border-radius:2px;background:#38bdf8;
          box-shadow:0 0 10px #38bdf8}
        .shade{position:absolute;top:1px;left:2px;right:2px;height:108px;box-sizing:border-box;border-radius:8px;pointer-events:none;z-index:2}
        .shade::before{content:'';position:absolute;left:0;right:0;top:0;height:24px;
          background:linear-gradient(180deg,rgba(2,6,23,.95),rgba(2,6,23,0))}
        .shade::after{content:'';position:absolute;left:0;right:0;bottom:0;height:24px;
          background:linear-gradient(0deg,rgba(2,6,23,.95),rgba(2,6,23,0))}
        .slot::before,.slot::after{content:'';position:absolute;top:50%;transform:translateY(-50%);
          border:5px solid transparent;z-index:4;opacity:.5}
        .slot::before{left:-2px;border-left-color:#38bdf8}
        .slot::after{right:-2px;border-right-color:#38bdf8}
        .slot.next::before,.slot.next::after{animation:notchPulse 1.1s ease-in-out infinite;opacity:1;filter:drop-shadow(0 0 6px #38bdf8)}
        @keyframes notchPulse{0%,100%{opacity:.3}50%{opacity:1}}
        .ring{position:absolute;inset:-2px;border:2px solid #38bdf8;border-radius:12px;opacity:0;
          pointer-events:none;z-index:3}
        .slot.flash,.slot.flash-err{animation:slotFlash .55s ease-out}
        .slot.flash .ring{animation:ringPulse .55s cubic-bezier(.2,.7,.3,1)}
        .slot.flash-err .ring{border-color:var(--red);animation:ringPulse .6s cubic-bezier(.2,.7,.3,1)}
        .slot.flash-err .strip{animation:errText .65s ease-out}
        @keyframes slotFlash{
          0%{box-shadow:inset 0 0 0 2px rgba(56,189,248,.9), 0 0 20px rgba(56,189,248,.6)}
          100%{box-shadow:inset 0 0 0 2px rgba(56,189,248,0), inset 0 0 0 1px rgba(99,102,241,.3), 0 4px 12px rgba(0,0,0,.6)}}
        @keyframes ringPulse{0%{opacity:.9;transform:scale(.82)}100%{opacity:0;transform:scale(1.18)}}
        @keyframes errText{0%,35%{color:var(--red);filter:drop-shadow(0 0 8px var(--red))}100%{color:var(--ink)}}

        /* ---------- Lower band: wheel + keypad ---------- */
        .lower{display:flex;align-items:center;justify-content:space-between;width:100%}
        .wheel-wrap{width:142px;height:142px}
        .wheel{width:100%;height:100%;filter:drop-shadow(0 6px 14px rgba(0,0,0,.7))}
        .keypad{display:grid;grid-template-columns:repeat(3,56px);gap:10px;transition:opacity .3s}
        .keypad.locked{pointer-events:none}
        .keypad.locked .key{opacity:.5}
        .key{height:48px;border-radius:10px;background:#0f1526;border:1px solid rgba(99,102,241,0.25);border-top-color:rgba(99,102,241,0.5);
          color:#f1f5f9;font:600 17px 'IBM Plex Mono';cursor:pointer;display:grid;place-items:center;
          box-shadow:0 3px 0 #070a12, 0 4px 8px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08);
          transition:transform .06s, box-shadow .06s, background .15s, border-color .15s, opacity .3s}
        .key:hover{background:#172038;border-color:#38bdf8;box-shadow:0 3px 0 #070a12, 0 0 14px rgba(56,189,248,0.3)}
        .key:focus-visible{outline:2px solid #38bdf8;outline-offset:2px}
        .key:active,.key.pressed{transform:translateY(2px);background:#1e1b4b;border-color:#818cf8;
          box-shadow:0 1px 0 #070a12, 0 1px 3px rgba(0,0,0,.6), inset 0 1px 4px rgba(99,102,241,.4)}
        .key.aux{color:#38bdf8;font-size:13px;letter-spacing:1px}
      `}</style>


      {/* Main Content */}
      <main className="vault-main">
        <div className="stage-outer" ref={stageOuterRef}>
          <div id="stage" ref={stageRef}>
            <div className="frame" id="frame" ref={frameRef}>
              <div className="frame-label">QUANTUM CIPHER VAULT · 4-DIGIT AUTHORIZATION</div>
              <div className="screw s1"></div>
              <div className="screw s2"></div>
              <div className="screw s3"></div>
              <div className="screw s4"></div>

              <div className="opening">
                {/* interior, revealed when the door swings open */}
                <div className="interior">
                  <div className="light"></div>
                  <div className="interior-content">
                    <svg className="ck" viewBox="0 0 96 96" aria-hidden="true">
                      <circle
                        className="ck-ring"
                        cx="48"
                        cy="48"
                        r="41"
                        pathLength="100"
                      />
                      <path
                        className="ck-mark"
                        d="M31 49.5 43.5 62 66 36.5"
                        pathLength="100"
                      />
                    </svg>
                    <div className="granted">
                      ACCESS
                      <br />
                      GRANTED
                    </div>
                    <div className="meta">
                      VORTEX 07 · ONLINE ·{" "}
                      <span id="clock" ref={interiorClockRef}>
                        --:--
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <button
                        className="ghost-btn enter-btn"
                        id="enterBtn"
                        type="button"
                        onClick={() => onUnlock(customKey)}
                      >
                        ENTER DASHBOARD →
                      </button>
                      <button className="ghost-btn" id="closeBtn" type="button">
                        LOCK
                      </button>
                    </div>
                  </div>
                </div>
                <div className="spill"></div>

                {/* bolt receivers in the wall */}
                <div className="rcv rcv-l rt1"></div>
                <div className="rcv rcv-l rt2"></div>
                <div className="rcv rcv-r rt1"></div>
                <div className="rcv rcv-r rt2"></div>

                {/* the vault door */}
                <div className="door" id="door" ref={doorRef}>
                  <div className="door-edge"></div>
                  <div className="hinge hinge-t"></div>
                  <div className="hinge hinge-b"></div>
                  <div className="rivet r1"></div>
                  <div className="rivet r2"></div>
                  <div className="rivet r3"></div>
                  <div className="rivet r4"></div>
                  <div className="rivet r5"></div>
                  <div className="rivet r6"></div>
                  <div className="bolt bolt-r bt1"></div>
                  <div className="bolt bolt-l bt1"></div>
                  <div className="bolt bolt-r bt2"></div>
                  <div className="bolt bolt-l bt2"></div>

                  <div className="plaque">
                    <b>VORTEX-07</b>
                    <span>NODE ID // 0422</span>
                  </div>

                  <div className="lcd" role="status" aria-live="polite">
                    <span className="led" id="led" ref={ledRef}></span>
                    <span className="lcd-text" id="lcdText" ref={lcdTextRef}>
                      INITIALIZING…
                    </span>
                  </div>

                  <div className="reels" id="reels" ref={reelsContainerRef}></div>

                  <div className="lower">
                    <div className="wheel-wrap">
                      <svg className="wheel" viewBox="0 0 150 150" aria-hidden="true">
                        <circle
                          cx="75"
                          cy="75"
                          r="71"
                          fill="#070a14"
                          stroke="#1e293b"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="75"
                          cy="75"
                          r="66"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.4"
                          strokeDasharray="1.7 15.579"
                          strokeDashoffset="0.85"
                          opacity="0.85"
                        />
                        <path d="M75 2.6 79.2 10.6 70.8 10.6Z" fill="#38bdf8" />
                        <g fill="#030712" stroke="#334155" strokeWidth="1">
                          <circle cx="24" cy="24" r="2.6" />
                          <circle cx="126" cy="24" r="2.6" />
                          <circle cx="24" cy="126" r="2.6" />
                          <circle cx="126" cy="126" r="2.6" />
                        </g>
                        <g id="wheelG" ref={wheelGRef}>
                          <circle
                            cx="75"
                            cy="75"
                            r="52"
                            fill="none"
                            stroke="#312e81"
                            strokeWidth="12"
                          />
                          <circle
                            cx="75"
                            cy="75"
                            r="52"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="7.5"
                          />
                          <g
                            stroke="#818cf8"
                            strokeWidth="6.5"
                            strokeLinecap="round"
                          >
                            <line x1="75" y1="75" x2="75" y2="26" />
                            <line x1="75" y1="75" x2="117.4" y2="50.5" />
                            <line x1="75" y1="75" x2="117.4" y2="99.5" />
                            <line x1="75" y1="75" x2="75" y2="124" />
                            <line x1="75" y1="75" x2="32.6" y2="99.5" />
                            <line x1="75" y1="75" x2="32.6" y2="50.5" />
                          </g>
                          <g fill="#06b6d4" stroke="#0284c7" strokeWidth="1.5">
                            <circle cx="75" cy="23" r="5.5" />
                            <circle cx="120" cy="49" r="5.5" />
                            <circle cx="120" cy="101" r="5.5" />
                            <circle cx="75" cy="127" r="5.5" />
                            <circle cx="30" cy="101" r="5.5" />
                            <circle cx="30" cy="49" r="5.5" />
                          </g>
                          <rect
                            x="73.7"
                            y="16.5"
                            width="2.6"
                            height="9"
                            rx="1.2"
                            fill="#38bdf8"
                          />
                          <circle
                            cx="75"
                            cy="75"
                            r="14"
                            fill="#0f172a"
                            stroke="#38bdf8"
                            strokeWidth="3"
                          />
                          <circle cx="75" cy="75" r="4.2" fill="#38bdf8" />
                        </g>
                      </svg>
                    </div>

                    <div className="keypad" id="keypad" ref={keypadRef}>
                      <button className="key" data-key="1" type="button">
                        1
                      </button>
                      <button className="key" data-key="2" type="button">
                        2
                      </button>
                      <button className="key" data-key="3" type="button">
                        3
                      </button>
                      <button className="key" data-key="4" type="button">
                        4
                      </button>
                      <button className="key" data-key="5" type="button">
                        5
                      </button>
                      <button className="key" data-key="6" type="button">
                        6
                      </button>
                      <button className="key" data-key="7" type="button">
                        7
                      </button>
                      <button className="key" data-key="8" type="button">
                        8
                      </button>
                      <button className="key" data-key="9" type="button">
                        9
                      </button>
                      <button
                        className="key aux"
                        data-key="clear"
                        type="button"
                        aria-label="Clear"
                      >
                        C
                      </button>
                      <button className="key" data-key="0" type="button">
                        0
                      </button>
                      <button
                        className="key aux"
                        data-key="back"
                        type="button"
                        aria-label="Backspace"
                      >
                        <svg
                          width="21"
                          height="15"
                          viewBox="0 0 24 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        >
                          <path d="M8.5 1.5 1.5 8l7 6.5h14v-13z" />
                          <path
                            d="m12 5.5 6 5.5M18 5.5 12 11"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* recessed doorway edge, painted above the door */}
                <div
                  className="opening-vignette"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "18px",
                    pointerEvents: "none",
                    zIndex: 4,
                    boxShadow:
                      "inset 0 0 0 1px rgba(0,0,0,.8), inset 0 14px 22px rgba(0,0,0,.6), inset 0 -14px 22px rgba(0,0,0,.5), inset 14px 0 22px rgba(0,0,0,.4), inset -14px 0 22px rgba(0,0,0,.4)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <p className="hint">
          Type on your keyboard or use the keypad — <b>Backspace</b> erases ·{" "}
          <b>Esc</b> resets
          <br />
          Node access code: [ <b>0422</b> ] etched on the titanium plaque opens this vault.
        </p>
      </main>

      {/* Secret Key Override Modal */}
      {showOverrideModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3,7,18,0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowOverrideModal(false)}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: "20px",
              padding: "26px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.85), 0 0 30px rgba(99,102,241,0.2)",
              color: "#f8fafc",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: "Chakra Petch",
                fontSize: "17px",
                fontWeight: 700,
                color: "#38bdf8",
                letterSpacing: "1.5px",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Backend Secret Key
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                fontFamily: "IBM Plex Mono",
                marginBottom: "16px",
                lineHeight: 1.5,
              }}
            >
              Vault unlock automatically passes this secret key to authenticate with your Vortex Control API.
            </p>
            <input
              type="password"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="Admin Secret Key"
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "#020617",
                border: "1px solid rgba(99, 102, 241, 0.35)",
                borderRadius: "10px",
                color: "#38bdf8",
                fontFamily: "IBM Plex Mono",
                fontSize: "13px",
                marginBottom: "18px",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                className="ghost-btn"
                type="button"
                onClick={() => setShowOverrideModal(false)}
              >
                SAVE & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
