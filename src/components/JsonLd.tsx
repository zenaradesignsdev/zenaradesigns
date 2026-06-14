// Server component for emitting server-rendered JSON-LD. Renders schema into the
// initial HTML (data-ssr) so AI crawlers that don't execute JS can read it.
// See SEO-RANKING-PLAN.md §8.1.
interface JsonLdProps {
  schema: object;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      data-ssr="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
