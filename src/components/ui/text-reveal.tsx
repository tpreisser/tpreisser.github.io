import { cn } from "@/lib/utils";

type TextRevealProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function TextReveal({ children, className }: TextRevealProps) {
  return <div className={cn(className)}>{children}</div>;
}
