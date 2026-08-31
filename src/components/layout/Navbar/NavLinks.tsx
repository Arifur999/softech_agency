import Link from "next/link";

import { NAV_LINKS } from "@/data/navigation";
import { externalLinkProps } from "@/lib/links";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  /** `bar` is the floating desktop pill, `stack` is the mobile sheet list. */
  layout?: "bar" | "stack";
  onNavigate?: () => void;
}

/**
 * Figma: Montserrat Medium 16px / #383838, 50px gap, the active item wearing
 * an #e2eaff pill at rounded-[30px].
 */
export function NavLinks({ layout = "bar", onNavigate }: NavLinksProps) {
  const [home, ...rest] = NAV_LINKS;

  return (
    <nav
      className={cn(
        "font-nav font-medium text-[#383838]",
        layout === "bar"
          ? [
              "flex h-[50px] items-center rounded-[32px] bg-white/71 backdrop-blur-sm 2xl:h-[57px]",
              "gap-2.5 px-3 text-[14px]",
              "xl:gap-4 xl:px-5 xl:text-[15px]",
              "2xl:gap-[50px] 2xl:px-8 2xl:text-[16px]",
            ]
          : "flex flex-col items-stretch gap-1 text-[16px]",
      )}
    >
      <Link
        href={home.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center justify-center rounded-[30px] bg-[#e2eaff] whitespace-nowrap",
          layout === "bar" ? "h-[37px] px-3" : "px-4 py-3",
        )}
      >
        {home.label}
      </Link>

      {rest.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          {...externalLinkProps(link.href)}
          className={cn(
            "whitespace-nowrap transition-colors hover:text-brand-600",
            layout === "stack" && "rounded-[30px] px-4 py-3 hover:bg-[#e2eaff]",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
