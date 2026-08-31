import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** The "Bring it together →" links in the What We Solve cards. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[13px] font-medium text-brand-500 transition-colors hover:text-brand-700 sm:text-[14px]",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
