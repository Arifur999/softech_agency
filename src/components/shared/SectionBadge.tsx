import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: string;
  /** `light` is the default white pill; `onDark` is the translucent one used on blue bands. */
  tone?: "light" | "onDark";
  className?: string;
}

/**
 * The "• OUR SOFTWARE" pill. Figma: 16px DM Sans Light, px-16 py-8,
 * rounded-[42px], 1px border #a5c5fb, 8px dot.
 */
export function SectionBadge({ children, tone = "light", className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[42px] border px-3 py-1.5 sm:px-4 sm:py-2",
        "font-ui text-[12px] font-light tracking-[0.02em] whitespace-nowrap sm:text-[14px] lg:text-[16px]",
        tone === "light"
          ? "border-brand-200 bg-white/80 text-ink-900"
          : "border-white/50 bg-white/10 text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 shrink-0 rounded-full",
          tone === "light" ? "bg-brand-600" : "bg-white",
        )}
      />
      {children}
    </span>
  );
}
