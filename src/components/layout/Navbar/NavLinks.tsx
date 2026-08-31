import Link from "next/link";

import { NAV_LINKS } from "@/data/navigation";
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
        "font-nav text-[16px] font-medium text-[#383838]",
        layout === "bar"
          ? "flex h-[57px] items-center gap-6 rounded-[32px] bg-white/71 px-5 backdrop-blur-sm xl:gap-[50px] xl:px-8"
          : "flex flex-col items-stretch gap-1",
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
