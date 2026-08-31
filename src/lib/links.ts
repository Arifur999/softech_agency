/** True for anything that leaves this site, so it can open in a new tab. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * `target`/`rel` for a link, or an empty object for in-page anchors. Spread
 * this onto a link so external destinations open safely without every call
 * site repeating the same two attributes.
 */
export function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
