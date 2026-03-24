"use client";

import { motion } from "framer-motion";

import type { Host } from "@/types/content";

export function HostsSection({
  hosts,
}: Readonly<{
  hosts: Host[];
}>) {
  return (
    <section className="site-container section-space">
      <div className="grid overflow-hidden rounded-[1.5rem] border border-[color:var(--border-default)] bg-[color:var(--bg-secondary)] lg:grid-cols-[1fr_auto_1fr]">
        {hosts.map((host, index) => (
          <motion.article
            key={host.name}
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative overflow-hidden px-8 py-12 sm:px-10 sm:py-14 ${
              index === 0 ? "host-panel-iron" : "host-panel-oak"
            }`}
          >
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent-oak)]">
              {host.role}
            </span>
            <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--text-primary)]">
              {host.name}
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--text-secondary)]">
              {host.shortBio} {host.bio.split(". ").slice(0, 2).join(". ")}.
            </p>
          </motion.article>
        ))}
        <div className="hidden w-px bg-[linear-gradient(180deg,var(--accent-iron),var(--accent-oak))] lg:block" />
      </div>
    </section>
  );
}
