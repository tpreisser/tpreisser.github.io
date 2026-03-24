"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { gsap } from "@/lib/gsap";

const embers = Array.from({ length: 96 }, (_, index) => ({
  id: index,
  left: `${(index * 11) % 100}%`,
  size: `${4 + (index % 4)}px`,
  duration: `${4.5 + (index % 7) * 0.38}s`,
  delay: `${(index % 12) * 0.16}s`,
}));

export function ForgeIntro() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const dismissingRef = useRef(false);

  const dismiss = useCallback(() => {
    if (!overlayRef.current || dismissingRef.current) {
      return;
    }

    dismissingRef.current = true;
    sessionStorage.setItem("iron-oak-forge-intro-seen", "true");

    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => setVisible(false),
    });
  }, []);

  useEffect(() => {
    if (pathname !== "/" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (sessionStorage.getItem("iron-oak-forge-intro-seen")) {
      return;
    }

    const id = window.setTimeout(() => {
      dismissingRef.current = false;
      setVisible(true);
    }, 0);

    return () => {
      window.clearTimeout(id);
    };
  }, [pathname]);

  useEffect(() => {
    if (!visible || !overlayRef.current || !titleRef.current || !lineRef.current) {
      return;
    }

    const titleWords = titleRef.current.querySelectorAll("[data-word]");
    const handleDismiss = () => dismiss();
    const timeline = gsap.timeline();

    gsap.set(overlayRef.current, { autoAlpha: 1 });

    timeline
      .fromTo(
        titleWords,
        { yPercent: 120, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.16,
          ease: "power4.out",
        },
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.75, ease: "power3.out" },
        "-=0.45",
      );

    const timeout = window.setTimeout(handleDismiss, 3600);

    window.addEventListener("wheel", handleDismiss, { passive: true, once: true });
    window.addEventListener("touchstart", handleDismiss, { passive: true, once: true });

    return () => {
      timeline.kill();
      window.clearTimeout(timeout);
      window.removeEventListener("wheel", handleDismiss);
      window.removeEventListener("touchstart", handleDismiss);
    };
  }, [dismiss, visible]);

  if (!visible || pathname !== "/") {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] overflow-hidden bg-[#090b0d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(196,132,62,0.24),_transparent_36%)]" />
      {embers.map((ember) => (
        <span
          key={ember.id}
          aria-hidden="true"
          className="ember-particle"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            animationDuration: ember.duration,
            animationDelay: ember.delay,
          }}
        />
      ))}
      <button
        type="button"
        onClick={() => dismiss()}
        className="absolute right-6 top-6 rounded-full border border-white/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-white/72 transition-colors duration-300 hover:border-white/24 hover:text-white"
      >
        Skip intro
      </button>
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <div
            ref={titleRef}
            className="font-display text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.86] tracking-[0.2em]"
          >
            <span
              data-word
              className="inline-block bg-[linear-gradient(135deg,#f3d6b6_0%,#8a9bae_45%,#4c5867_100%)] bg-clip-text text-transparent"
            >
              Iron
            </span>
            <span className="mx-[0.12em] inline-block text-[color:rgba(255,255,255,0.18)]">
              &
            </span>
            <span
              data-word
              className="inline-block bg-[linear-gradient(135deg,#ffd7a5_0%,#c4843e_45%,#6f4e24_100%)] bg-clip-text text-transparent"
            >
              Oak
            </span>
          </div>
          <div
            ref={lineRef}
            className="mx-auto mt-6 h-px w-48 bg-[image:linear-gradient(90deg,#8a9bae_0%,#c4843e_100%)]"
          />
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.34em] text-[color:rgba(242,237,232,0.72)]">
            Forged in conviction. Rooted in truth.
          </p>
        </div>
      </div>
    </div>
  );
}
