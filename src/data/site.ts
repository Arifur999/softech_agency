import { EXTERNAL_LINKS } from "@/data/externalLinks";

/** Single source of truth for anything that describes the site to machines. */
export const SITE = {
  name: "Softech",
  legalName: "Softech Agency",
  url: "https://softech.agency",
  /** Mirrors the hero headline, so the snippet matches the page. */
  title: "Softech — Software built for local businesses",
  titleTemplate: "%s | Softech",
  description:
    "We build software for specific industries, and custom software for businesses that need something built around their own needs.",
  locale: "en",
  ogLocale: "en_US",
  twitterHandle: undefined as string | undefined,
} as const;

/** Descriptive rather than keyword-stuffed — these mirror real page copy. */
export const SITE_KEYWORDS = [
  "custom software development",
  "industry-specific software",
  "SaaS for local businesses",
  "business workflow software",
  "furniture business software",
  "software agency",
  "Furnify",
];

/**
 * Organization + WebSite JSON-LD. Injected as a script tag, so it changes
 * nothing a visitor sees while giving search engines an explicit description
 * of the business and its one live product.
 */
export function buildStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/nav-logo.png`,
    },
    description: SITE.description,
    sameAs: [EXTERNAL_LINKS.furnify],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.locale,
  };

  const product = {
    "@type": "SoftwareApplication",
    name: "Furnify",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: EXTERNAL_LINKS.furnify,
    description:
      "Software built specifically for furniture businesses — workflows, operations, orders, customers and reporting in one platform.",
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  return { "@context": "https://schema.org", "@graph": [organization, website, product] };
}
