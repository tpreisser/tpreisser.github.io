"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function MaterialBackground() {
  const { scrollYProgress } = useScroll();
  const ironOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.07, 0.035, 0.015]);
  const oakOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.02, 0.045, 0.06]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,132,62,0.16),_transparent_26%),radial-gradient(circle_at_76%_12%,_rgba(138,155,174,0.16),_transparent_28%),radial-gradient(circle_at_50%_120%,_rgba(196,132,62,0.08),_transparent_32%),var(--bg-primary)]" />
      <motion.div
        className="absolute inset-0 material-iron"
        style={{ opacity: ironOpacity }}
      />
      <motion.div
        className="absolute inset-0 material-oak"
        style={{ opacity: oakOpacity }}
      />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:140px_140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.18))]" />
    </div>
  );
}
