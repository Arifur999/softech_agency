import Link from "next/link";

import { externalLinkProps } from "@/lib/links";
import type { INavLink } from "@/types/common.types";

interface FooterColumnProps {
  title: string;
  links: INavLink[];
}

/** Figma nodes 1:805 / 1:811 / 1:817. */
export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-[9px] text-white">
      <p className="text-[18px] font-medium lg:text-[20px]">{title}</p>

      <ul className="flex flex-col gap-2 text-[15px] lg:text-[16px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-brand-200"
              {...externalLinkProps(link.href)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
