"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost" | "steel";
  size?: "sm" | "md" | "lg";
}>;

function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<ButtonProps, "variant" | "size" | "className">) {
  return cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full border font-body font-medium uppercase tracking-[0.18em] transition-[transform,filter,box-shadow,border-color,background-color] duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-oak)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]",
    size === "sm" && "min-h-11 px-5 text-[0.68rem]",
    size === "md" && "min-h-12 px-6 text-[0.72rem]",
    size === "lg" && "min-h-14 px-8 text-[0.78rem]",
    variant === "primary" &&
      "spark-trigger border-[color:rgba(255,255,255,0.1)] bg-[linear-gradient(135deg,var(--accent-oak-light)_0%,var(--accent-oak)_34%,#8a6b45_58%,var(--accent-iron)_100%)] text-[#120e0a] shadow-[0_18px_48px_rgba(0,0,0,0.24)] hover:brightness-110 hover:shadow-[0_0_56px_rgba(196,132,62,0.18)]",
    variant === "ghost" &&
      "border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_70%,transparent)] text-[color:var(--text-primary)] hover:border-[color:rgba(196,132,62,0.3)] hover:bg-[color:color-mix(in_srgb,var(--bg-tertiary)_84%,transparent)]",
    variant === "steel" &&
      "border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#d5dee7_0%,var(--accent-iron-light)_18%,var(--accent-iron)_52%,#324352_100%)] text-[#f8fafc] shadow-[0_14px_36px_rgba(32,40,52,0.24)] hover:brightness-110",
    className,
  );
}

export function Button({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  const activate = () => {
    onClick?.();
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-full bg-white/6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-y-[1px] left-[10%] w-1/3 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] opacity-0 blur-sm transition-[transform,opacity] duration-500 group-hover:translate-x-[180%] group-hover:opacity-100" />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={activate}
        className={buttonClasses({ variant, size, className })}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={activate}
      className={buttonClasses({ variant, size, className })}
    >
      {content}
    </button>
  );
}
