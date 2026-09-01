"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Milliseconds. Used to stagger siblings. */
  delay?: number;
  /** Fraction of the element that must be visible before it plays. */
  threshold?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Plays a small entrance animation the first time an element scrolls into
 * view, then stops observing it.
 *
 * The hidden state lives in CSS behind `prefers-reduced-motion: no-preference`
 * and a `<noscript>` override in the root layout, so anyone who has asked for
 * less motion — or has no JS at all — simply sees the finished page. Content
 * is always in the DOM either way, so nothing here affects crawlers.
 *
 * The revealed flag is written straight to the DOM rather than held in state:
 * it only ever drives one attribute, so a re-render would buy nothing, and
 * this keeps the effect free of the setState-in-effect pattern.
 *
 * Only opacity and transform are animated. Both are compositor-only, so this
 * cannot reflow the layout or introduce horizontal overflow.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.setAttribute("data-revealed", "true");

    // Older browsers, or reduced motion: show it and never animate.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      // The bottom margin lets it start just before the element is on screen.
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: ReactNode[];
  /** Gap between each child's start, in milliseconds. */
  step?: number;
  variant?: RevealVariant;
  className?: string;
  itemClassName?: string;
}

/** Reveals a list of siblings one after another — used for every card grid. */
export function RevealGroup({
  children,
  step = 150,
  variant = "up",
  className,
  itemClassName,
}: RevealGroupProps) {
  return (
    <div className={cn(className)}>
      {children.map((child, index) => (
        <Reveal key={index} variant={variant} delay={index * step} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
