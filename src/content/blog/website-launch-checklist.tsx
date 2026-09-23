import { BlogPost } from '@/types';
import Link from 'next/link';

const WebsiteLaunchChecklistContent = () => {
  return (
    <div>
      <p>
        Most small business websites launch with something broken. Not catastrophically (the site loads,
        the pages are there), but the contact form silently fails, or analytics was never connected, or
        every page carries the same meta description. These problems are cheap to catch before launch and
        expensive to discover three months later when you are trying to work out why nobody called.
      </p>
      <p>
        This is the checklist we run before every site we hand over. Work through it in order; each
        section depends on the one above it.
      </p>

      <h2 id="1-content-and-copy">1. Content and Copy</h2>
      <ul>
        <li><strong>Every page has one H1</strong> that describes that page, not the business in general.</li>
        <li><strong>Contact details match everywhere</strong>: site footer, contact page, and your Google Business Profile. Mismatched phone numbers and addresses confuse customers, and consistency is one of the easiest local search basics to get right.</li>
        <li><strong>No placeholder text survives.</strong> Search the whole site for &quot;lorem&quot;, &quot;TODO&quot;, and your designer&apos;s template company name.</li>
        <li><strong>Prices and timelines are current</strong> and say the same thing on every page they appear.</li>
        <li><strong>Nothing claims a statistic you cannot source.</strong> If you would not want to be asked where a number came from, take it out.</li>
      </ul>

      <h2 id="2-technical-setup">2. Technical Setup</h2>
      <ul>
        <li><strong>One canonical domain.</strong> Pick www or non-www and 301 the other. If both are reachable, Google has to choose between two copies of every page and links get split between them.</li>
        <li><strong>SSL is active</strong> and every internal link uses https.</li>
        <li><strong>Every page has a unique title and meta description.</strong> Google shortens long titles to fit the screen, so put the words that matter first.</li>
        <li><strong>A canonical tag on every page</strong> pointing at itself.</li>
        <li><strong>robots.txt does not block anything you want indexed.</strong> A common trap: blocking a page in robots.txt while also marking it noindex. The block stops the crawler from ever reading the noindex, so the page can stay in search results.</li>
        <li><strong>The sitemap lists real, indexable URLs only</strong>: no redirects, no 404s, no staging pages.</li>
        <li><strong>Staging and demo subdomains are noindexed.</strong> A preview build competing with your live site is a surprisingly common and completely avoidable problem.</li>
      </ul>

      <h2 id="3-forms-and-conversion">3. Forms and Conversion</h2>
      <p>
        Test this from a real device, on real data, not from the machine that built the site.
      </p>
      <ul>
        <li><strong>Submit every form</strong> and confirm the email actually arrives, including checking the spam folder.</li>
        <li><strong>Check the reply-to address</strong> so you can respond directly to an enquiry.</li>
        <li><strong>Phone numbers are click-to-call</strong> links on mobile.</li>
        <li><strong>Spam protection is active</strong>, with a honeypot field at minimum.</li>
        <li><strong>The thank-you state is clear</strong> so nobody submits twice wondering whether it worked.</li>
      </ul>

      <h2 id="4-measurement">4. Measurement</h2>
      <p>
        Skip this and you will have no idea whether the site works. It takes under an hour and cannot be
        backfilled: data starts the day you connect it.
      </p>
      <ul>
        <li><strong>Google Analytics 4 installed</strong> and firing on every page.</li>
        <li><strong>Google Search Console verified</strong> and the sitemap submitted.</li>
        <li><strong>Conversions tracked as events</strong>: form submissions and click-to-call taps. Sessions alone will not tell you whether anyone tried to reach you.</li>
        <li><strong>The accounts are in your name</strong>, with your agency added as a user. If you ever change providers you keep every historical data point.</li>
      </ul>
      <p>
        Our Grow and Prime{' '}
        <Link href="/services/website-maintenance">maintenance plans</Link>{' '}
        set this up and report on it each month.
      </p>

      <h2 id="5-performance-and-accessibility">5. Performance and Accessibility</h2>
      <ul>
        <li><strong>Run Lighthouse on mobile</strong>, not desktop. Desktop scores flatter you, and many visitors to a small business site are on a phone.</li>
        <li><strong>Images are compressed and correctly sized.</strong> An oversized hero image is one of the most common causes of a slow first load.</li>
        <li><strong>Every image has descriptive alt text</strong> that says what it shows, not &quot;image of&quot;.</li>
        <li><strong>The site is navigable by keyboard</strong> and body text meets a 4.5:1 contrast ratio.</li>
        <li><strong>Nothing scrolls horizontally</strong> at 375px wide.</li>
      </ul>

      <h2 id="6-local-search">6. Local Search</h2>
      <ul>
        <li><strong>Google Business Profile claimed</strong>, with categories, hours, and service areas complete.</li>
        <li><strong>LocalBusiness structured data</strong> present in the page source. It should be server-rendered, not injected by JavaScript after load, or crawlers that do not run scripts will never see it.</li>
        <li><strong>Business name, address, and phone are identical</strong> across your site, your profile, and any directory listings.</li>
        <li><strong>A review request process exists</strong> before launch, so reviews start accumulating from day one.</li>
      </ul>

      <h2 id="7-after-launch">7. After Launch</h2>
      <ul>
        <li><strong>If you replaced an old site, 301 every old URL</strong> to its new home. Skipping this is one of the most common ways a redesign loses rankings that took years to build.</li>
        <li><strong>Watch Search Console for two weeks.</strong> Indexing errors and crawl problems show up in the page indexing report first.</li>
        <li><strong>Confirm pages are actually getting indexed.</strong> A page that is live is not necessarily a page that is in Google.</li>
        <li><strong>Know who fixes things.</strong> Agree in writing who handles updates, and how fast, before you need it urgently.</li>
      </ul>

      <div className="blog-callout">
        <h3>Already Launched and Unsure?</h3>
        <p>
          We will run an existing site through this checklist and send you what we find, at no cost.{' '}
          <Link href="/services/website-redesign">
            <strong>Request a site audit</strong>
          </Link>{' '}
          or{' '}
          <Link href="/contact">
            <strong>get in touch</strong>
          </Link>.
        </p>
      </div>
    </div>
  );
};

export const websiteLaunchChecklistPost: BlogPost = {
  slug: 'website-launch-checklist',
  title: 'The Small Business Website Launch Checklist',
  seoTitle: 'Small Business Website Launch Checklist | Zenara Designs',
  description:
    'The checklist we run before handing over any website: content, technical setup, forms, analytics, performance and local search. Free to use on your own site.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-08-23'),
  updatedAt: new Date('2026-09-23'),
  tags: ['checklists', 'website launch', 'SEO'],
  content: WebsiteLaunchChecklistContent,
};
