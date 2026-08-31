import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PillVariant = "gradient" | "outline" | "white" | "ghostOnDark";

/**
 * Figma draws every CTA as a double ring: a thin outer ring at rounded-[115px]
 * with a ~5px gap, then the filled inner pill at rounded-[110px]. Both layers
 * are described here once so no section repeats the class soup.
 */
const RING: Record<PillVariant, string> = {
  gradient: "border border-brand-600",
  outline: "border-2 border-brand-600",
  white: "border border-white/70",
  ghostOnDark: "border border-white/80",
};

const FILL: Record<PillVariant, string> = {
  gradient:
    "border border-brand-600 bg-gradient-to-r from-brand-600 to-brand-400 text-white",
  outline: "text-ink-700",
  white: "bg-white text-brand-600",
  ghostOnDark: "text-white",
};

interface PillButtonBaseProps {
  children: ReactNode;
  variant?: PillVariant;
  /** Sizes the outer ring — pass the Figma width, e.g. `w-[243px]`. */
  className?: string;
  icon?: ReactNode;
}

type PillButtonProps = PillButtonBaseProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
  );

export function PillButton({
  children,
  variant = "gradient",
  className,
  icon,
  ...props
}: PillButtonProps) {
  const ring = cn(
    "group inline-flex h-[50px] shrink-0 rounded-[115px] p-[4px] transition-transform duration-200 hover:-translate-y-0.5 sm:h-[56px] lg:h-[62px] lg:p-[5px]",
    RING[variant],
    className,
  );

  const fill = cn(
    "flex size-full items-center justify-center gap-2 rounded-[110px] px-5 text-center",
    "font-ui text-[14px] font-normal whitespace-nowrap sm:text-[16px] lg:text-[18px]",
    FILL[variant],
  );

  const inner = (
    <span className={fill}>
      {children}
      {icon}
    </span>
  );

  if (props.href !== undefined) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={ring} {...linkProps}>
        {inner}
      </Link>
    );
  }

  const { href: _ignored, ...buttonProps } = props;
  void _ignored;

  return (
    <button type="button" className={ring} {...buttonProps}>
      {inner}
    </button>
  );
}
