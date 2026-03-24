"use client";

import { startTransition, useId, useState } from "react";

import { Button } from "@/components/ui/button";

export function NewsletterForm({
  compact = false,
  placeholder = "Enter your email",
  buttonLabel = "Join the List",
  successLabel = "You are on the list.",
  className,
}: Readonly<{
  compact?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  successLabel?: string;
  className?: string;
}>) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={className}>
      <form
        className={`flex w-full flex-col gap-3 ${compact ? "md:flex-row" : "sm:flex-row"}`}
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(() => {
            setSubmitted(true);
          });
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (submitted) {
              setSubmitted(false);
            }
          }}
          placeholder={placeholder}
          className="min-h-14 flex-1 rounded-full border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_80%,transparent)] px-6 text-base text-[color:var(--text-primary)] outline-none transition-colors duration-300 placeholder:text-[color:var(--text-tertiary)] focus:border-[color:var(--accent-oak)]"
          required
        />
        <Button type="submit" className={compact ? "sm:min-w-44" : "sm:min-w-52"}>
          {submitted ? "Joined" : buttonLabel}
        </Button>
      </form>
      {submitted ? (
        <p className="mt-3 text-sm text-[color:var(--text-secondary)]">{successLabel}</p>
      ) : null}
    </div>
  );
}
