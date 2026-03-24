"use client";

import { useEffect, useRef } from "react";

export function Magnetic({
  children,
  strength = 14,
  className,
}: Readonly<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const node = ref.current;

    const handleMove = (event: MouseEvent) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      node.animate(
        {
          transform: `translate(${(x / bounds.width) * strength}px, ${(y / bounds.height) * strength}px)`,
        },
        {
          duration: 180,
          fill: "forwards",
          easing: "ease-out",
        },
      );
    };

    const reset = () => {
      node.animate(
        {
          transform: "translate(0px, 0px)",
        },
        {
          duration: 240,
          fill: "forwards",
          easing: "ease-out",
        },
      );
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
