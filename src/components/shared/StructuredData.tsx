import { buildStructuredData } from "@/data/site";

/**
 * Renders the JSON-LD graph. A script tag with a non-JS type — invisible to
 * visitors, never executed, and read only by crawlers.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
    />
  );
}
