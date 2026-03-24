"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (
      !node ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      visible: false,
      width: 8,
      height: 8,
      targetWidth: 8,
      targetHeight: 8,
      borderRadius: 999,
      targetRadius: 999,
      fill: 0,
      targetFill: 0,
    };

    let raf = 0;
    document.documentElement.classList.add("has-fancy-cursor");
    const interactiveSelector =
      "a, button, input, textarea, select, [data-cursor='interactive']";
    const textSelector =
      "h1, h2, h3, h4, h5, h6, p, blockquote, li, em, strong, span, small, [data-cursor='text']";

    const reset = () => {
      state.targetWidth = 8;
      state.targetHeight = 8;
      state.targetRadius = 999;
      state.targetFill = 0;
    };

    const setMode = (target: HTMLElement | null) => {
      if (!target) {
        reset();
        return;
      }

      if (target.closest(interactiveSelector)) {
        state.targetWidth = 40;
        state.targetHeight = 40;
        state.targetRadius = 999;
        state.targetFill = 0.18;
        return;
      }

      if (target.closest(textSelector)) {
        state.targetWidth = 4;
        state.targetHeight = 28;
        state.targetRadius = 999;
        state.targetFill = 0.28;
        return;
      }

      reset();
    };

    const move = (event: PointerEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;
      state.visible = true;
      const target = document.elementFromPoint(event.clientX, event.clientY);
      setMode(target instanceof HTMLElement ? target : null);
    };

    const leaveWindow = () => {
      state.visible = false;
      reset();
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        leaveWindow();
      }
    };

    const render = () => {
      state.x += (state.tx - state.x) * 0.18;
      state.y += (state.ty - state.y) * 0.18;
      state.width += (state.targetWidth - state.width) * 0.18;
      state.height += (state.targetHeight - state.height) * 0.18;
      state.borderRadius += (state.targetRadius - state.borderRadius) * 0.18;
      state.fill += (state.targetFill - state.fill) * 0.18;

      node.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      node.style.width = `${state.width}px`;
      node.style.height = `${state.height}px`;
      node.style.borderRadius = `${state.borderRadius}px`;
      node.style.opacity = state.visible ? "1" : "0";
      node.style.backgroundColor = `rgba(196, 132, 62, ${state.fill})`;

      raf = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", leaveWindow);

    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", leaveWindow);
      document.documentElement.classList.remove("has-fancy-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[color:var(--accent-oak)] opacity-0 transition-[background-color,border-radius] duration-200 md:flex"
    >
      <span className="absolute inset-[30%] rounded-full bg-[color:var(--accent-oak-light)]" />
    </div>
  );
}
