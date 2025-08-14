"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const blobRef = useRef<HTMLDivElement | null>(null);
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedText, setTypedText] = useState("");
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const heroGradientRef = useRef<HTMLDivElement | null>(null);

  const fullTitle = useMemo(
    () => "Hayden — CS student — builder — X.com shitposter",
    []
  );

  useEffect(() => setMounted(true), []);

  // Cursor-follow glow blob
  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - el.offsetWidth / 2}px, ${e.clientY - el.offsetHeight / 2}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Starfield background
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrame = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: Math.random() * 0.9 + 0.1,
    }));
    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
    };
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const px = star.x * canvas.width;
        const py = star.y * canvas.height;
        const size = star.s * 1.6;
        ctx.fillStyle = `hsla(${200 + star.x * 80}, 90%, ${60 + star.y * 40}%, ${0.7 * star.z})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
        star.x += (0.0008 + star.s * 0.0012);
        if (star.x > 1.05) star.x = -0.05;
      }
      animationFrame = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Typewriter effect for hero title
  useEffect(() => {
    let index = 0;
    let cancelled = false;
    const baseDelay = 36;
    const kick = () => {
      if (cancelled) return;
      setTypedText(fullTitle.slice(0, index));
      index += 1;
      if (index <= fullTitle.length) {
        const ch = fullTitle[index - 1] || "";
        const punctuationPause = ch === "—" || ch === "," || ch === "." ? 140 : 0;
        setTimeout(kick, baseDelay + Math.random() * 50 + punctuationPause);
      }
    };
    kick();
    return () => { cancelled = true; };
  }, [fullTitle]);

  // Parallax layers
  useEffect(() => {
    const container = parallaxRef.current;
    const gradient = heroGradientRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      container.style.setProperty("--dx", String(px));
      container.style.setProperty("--dy", String(py));
      if (gradient) {
        gradient.style.transform = `translate3d(${px * 18}px, ${py * 18}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white bg-noise" ref={parallaxRef}>
      {/* Starfield */}
      <canvas ref={starCanvasRef} className="starfield" />
      {/* Cursor glow */}
      <div ref={blobRef} className="cursor-blob" />
      {/* Neon grid + holo overlay */}
      <div className="neon-grid" />
      {/* Aurora background blobs */}
      <div className="aurora top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.65), transparent 70%)",
        }}
      />
      <div className="aurora bottom-[-10%] right-[-5%] h-[60vh] w-[45vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.55), transparent 65%)",
        }}
      />
      <div className="aurora top-[30%] right-[40%] h-[35vh] w-[35vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(249,115,22,0.45), transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-6 md:px-10 py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
          aria-label="Scroll to top"
        >
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 animate-pulse" />
          <span className="font-medium tracking-wide text-sm sm:text-base">hayden.ooo — online</span>
        </button>
        <nav className="hidden sm:flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="opacity-80 hover:opacity-100">contact —</button>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="px-5 sm:px-6 md:px-10 pt-8 pb-16 sm:pt-14 sm:pb-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">portfolio —</p>
              <h1 className="glitch text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight gradient-text animate-shimmer text-glow chromatic">
                {typedText}
                <span className="caret" aria-hidden="true" />
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-prose">
                I write code — that sometimes ships — and tweets — that never should. Currently exploring web dev — systems — and questionable UI choices.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="glass breathe-glow button-sheen inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm sm:text-base"
                >
                  <span>say hi — now</span>
                  <span className="text-white/60">↗</span>
                </button>
                <a
                  href="https://x.com/haydendevs"
          target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm sm:text-base border border-white/15 hover:border-white/30 button-sheen"
                >
                  <span>follow — @haydendevs — on X —</span>
                  <span className="opacity-60">(not responsible)</span>
                </a>
              </div>

              {/* Tech marquee */}
              <div className="mt-8 overflow-hidden rounded-lg border border-white/10 animated-border">
                <div className="whitespace-nowrap animate-marquee flex gap-8 py-3 px-4 text-sm text-white/80">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Bun</span>
                  <span>Tailwind</span>
                  <span>Vercel</span>
                  <span>Postgres</span>
                  <span>Cloudflare</span>
                  <span>Edge Runtime</span>
                  <span>Low-level vibes</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 sm:p-8 glass border-white/15 animated-border">
              <div className="holo-overlay" />
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                  <div className="absolute inset-[-4px] rounded-full bg-[conic-gradient(var(--accent-1),var(--accent-2),var(--accent-3),var(--accent-4),var(--accent-5),var(--accent-1))] opacity-60 blur-[6px] animate-spin-slow" />
                  <div ref={heroGradientRef} className="relative h-full w-full rounded-full grid place-items-center bg-gradient-to-br from-violet-600/70 to-cyan-400/60 text-white font-semibold text-2xl will-change-transform">
                    H
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Hey — I'm</div>
                  <div className="text-xl sm:text-2xl font-semibold">Hayden</div>
                  <div className="text-white/70 text-sm">CS student — web dev — enjoys posting on X</div>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Frontend — Next.js — Tailwind — TypeScript</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Backend — Bun — APIs — edge stuff</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Interests — systems — UI — automation</li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {["nextjs", "typescript", "tailwind", "bun", "vercel"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-white/12 text-xs text-white/80 bg-white/[0.03]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        {/* Removed projects and posts sections for a hero-only layout */}

        {/* Contact */}
        <section id="contact" className="px-5 sm:px-6 md:px-10 py-20 sm:py-28 relative">
          <div className="scanlines" />
          <div className="max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 glass border-white/15">
            <h2 className="text-2xl sm:text-3xl font-semibold gradient-text animate-shimmer chromatic">say hi</h2>
            <p className="mt-2 text-white/80">DMs open. Emails read. PRs welcome.</p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              <a href="https://x.com/haydendevs" target="_blank" rel="noreferrer noopener" className="rounded-xl border border-white/15 px-4 py-3 text-center hover:border-white/30">email — @haydendevs</a>
              <a href="https://x.com/haydendevs" target="_blank" rel="noreferrer noopener" className="rounded-xl border border-white/15 px-4 py-3 text-center hover:border-white/30">x.com — @haydendevs</a>
              <a href="https://x.com/haydendevs" target="_blank" rel="noreferrer noopener" className="rounded-xl border border-white/15 px-4 py-3 text-center hover:border-white/30">github — @haydendevs</a>
            </div>
          </div>
        </section>
      </main>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 z-20 rounded-full px-3 py-2 text-xs bg-white/10 border border-white/15 hover:bg-white/15 backdrop-blur"
        aria-label="Back to top"
      >
        ↑ top
      </button>

      {/* Footer */}
      <footer className="relative z-10 px-5 sm:px-6 md:px-10 py-8 text-xs text-white/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} hayden — built with Next.js, Tailwind, and questionable taste</div>
          <div className="opacity-70">this site uses 5 gradients per component</div>
        </div>
      </footer>
    </div>
  );
}
