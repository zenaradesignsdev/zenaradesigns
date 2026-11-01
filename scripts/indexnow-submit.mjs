/**
 * IndexNow submission script
 *
 * Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that
 * pages changed, so they recrawl in minutes instead of weeks. Bing's index
 * also feeds ChatGPT search and Copilot. Google does not use IndexNow.
 *
 * Run it AFTER a deploy is live, never before: the engines fetch the URLs
 * straight away, and the key file must already be served.
 *
 * Usage:
 *   npm run indexnow -- /web-design/scarborough /about   # specific paths
 *   npm run indexnow -- --all                            # every URL in the live sitemap
 *   npm run indexnow -- --changed-since 2026-10-20       # sitemap URLs whose lastmod is on/after that date
 *
 * .github/workflows/indexnow.yml runs the --changed-since form after every
 * successful production deploy, passing the date of the previous one. That
 * relies on sitemap lastmod dates being bumped when a page's content changes
 * (see src/app/sitemap.ts).
 *
 * The key is public by design (it only proves we control the host) and is
 * served at https://zenaradesigns.com/<key>.txt by src/app/<key>.txt/route.ts.
 */

const HOST = 'zenaradesigns.com';
const ORIGIN = `https://${HOST}`;
// Keep in sync with the route folder name in src/app/.
const INDEXNOW_KEY = '5aae825e3d1e913a716de390ed499cd3';
const KEY_LOCATION = `${ORIGIN}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// IndexNow accepts up to 10,000 URLs per request.
const MAX_URLS = 10000;

async function sitemapEntries() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1].trim() ?? '',
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].trim() ?? '',
  }));
}

// lastmod values are content dates (often midnight UTC), not deploy times, so
// compare by calendar day: anything dated on or after the cutoff day counts.
async function changedSince(dateArg) {
  const cutoff = new Date(dateArg);
  if (Number.isNaN(cutoff.getTime())) throw new Error(`--changed-since needs a date, got "${dateArg}"`);
  const cutoffDay = cutoff.toISOString().slice(0, 10);
  const entries = await sitemapEntries();
  return entries.filter((e) => e.loc && e.lastmod && e.lastmod.slice(0, 10) >= cutoffDay).map((e) => e.loc);
}

function toUrl(arg) {
  if (arg.startsWith('http')) {
    const url = new URL(arg);
    if (url.host !== HOST) throw new Error(`${arg} is not on ${HOST}`);
    return url.href;
  }
  return `${ORIGIN}${arg.startsWith('/') ? arg : `/${arg}`}`;
}

async function assertKeyIsLive() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : '';
  if (body !== INDEXNOW_KEY) {
    throw new Error(`Key file at ${KEY_LOCATION} is missing or wrong (status ${res.status}). Deploy first.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Pass page paths (e.g. /about), --all or --changed-since <date>. See the header of this file.');
    process.exit(1);
  }

  const sinceIndex = args.indexOf('--changed-since');
  let urls;
  if (args.includes('--all')) {
    urls = (await sitemapEntries()).map((e) => e.loc).filter(Boolean);
  } else if (sinceIndex !== -1) {
    urls = await changedSince(args[sinceIndex + 1] ?? '');
  } else {
    urls = args.map(toUrl);
  }
  const urlList = [...new Set(urls)].slice(0, MAX_URLS);
  if (urlList.length === 0) {
    console.log('No changed URLs to submit.');
    return;
  }

  await assertKeyIsLive();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // 200 = accepted, 202 = accepted while the key is being validated.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted ${urlList.length} URL(s) (HTTP ${res.status}).`);
    return;
  }
  console.error(`IndexNow rejected the submission: HTTP ${res.status} ${await res.text()}`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
