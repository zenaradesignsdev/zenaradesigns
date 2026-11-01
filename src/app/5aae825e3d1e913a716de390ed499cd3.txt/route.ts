// IndexNow key file. Bing, Yandex and the other IndexNow engines fetch
// https://zenaradesigns.com/<key>.txt and check that it contains the key before
// accepting URL submissions from scripts/indexnow-submit.mjs. The key is public
// by design; it only proves we control the host. Served as a route rather than
// a file in /public so it lives next to the code that uses it.
//
// Keep in sync with INDEXNOW_KEY in scripts/indexnow-submit.mjs.

export const dynamic = 'force-static';

export function GET(): Response {
  return new Response('5aae825e3d1e913a716de390ed499cd3', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
