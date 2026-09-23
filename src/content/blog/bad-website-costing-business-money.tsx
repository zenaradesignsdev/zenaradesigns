import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

const SOURCES = {
  pageSpeed: 'https://pagespeed.web.dev/',
  coreWebVitals: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
  searchConsole: 'https://search.google.com/search-console',
  pageIndexing: 'https://support.google.com/webmasters/answer/7440203',
};

const BadWebsiteCostingMoneyContent = () => {
  return (
    <div>
      <p>
        You rarely see the customers your website loses. They don’t complain or leave a review. They close
        the tab and call someone else, and from your side nothing happened at all.
      </p>
      <p>
        The useful news is that most of the common problems can be checked in an afternoon, with free tools,
        without hiring anyone. Here are five checks, what a bad result looks like for each, and what usually
        causes it.
      </p>

      <h2 id="check-1-load-it-on-your-phone">Check 1: Load It on Your Phone, Away From Wi-Fi</h2>
      <p>
        Turn off Wi-Fi, open a private browser tab and load your homepage the way a new customer would. Then
        run the address through <ExternalLink href={SOURCES.pageSpeed}>PageSpeed Insights</ExternalLink> and
        look at the mobile results. If your site gets enough traffic, the report includes data from real
        visitors, not just a test run.
      </p>
      <p>
        Google’s <ExternalLink href={SOURCES.coreWebVitals}>Core Web Vitals</ExternalLink> guidance gives
        three targets: the main content should load within 2.5 seconds, the page should respond to a tap in
        under 200 milliseconds, and the layout shift score should stay under 0.1.
      </p>
      <p>
        <strong>A bad result looks like:</strong> a blank or half-built screen for several seconds, text that
        jumps as images load, or buttons that don’t respond on the first tap.
      </p>
      <p>
        <strong>Usual causes:</strong> oversized images, heavy themes and plugins, third-party scripts such as
        chat widgets and trackers, and slow hosting.
      </p>

      <h2 id="check-2-try-to-become-a-customer">Check 2: Try to Become a Customer</h2>
      <p>
        This is the most valuable check on the list, because the failures are silent. On your phone:
      </p>
      <ul>
        <li>Fill in and submit your own contact or quote form.</li>
        <li>Check that the confirmation message makes sense, so nobody submits twice wondering if it worked.</li>
        <li>Check how long the email takes to arrive, who receives it, and whether it lands in spam.</li>
        <li>Tap your phone number and confirm it dials.</li>
        <li>Check that the number matches your Google Business Profile.</li>
      </ul>
      <p>
        <strong>A bad result looks like:</strong> the form sends to a former employee’s address, lands in a
        spam folder nobody checks, or doesn’t send at all. The phone number is plain text that can’t be tapped.
      </p>
      <p>
        <strong>Fix:</strong> repair it, then repeat this test every month. If you use analytics, record form
        submissions and phone taps as conversions so a sudden drop is visible.
      </p>

      <h2 id="check-3-can-google-find-your-pages">Check 3: Check Whether Google Can Find Your Pages</h2>
      <p>
        Search Google for <code>site:yourdomain.ca</code> (with your own domain) for a rough list of the pages
        Google knows about. For the real answer, set up{' '}
        <ExternalLink href={SOURCES.searchConsole}>Google Search Console</ExternalLink> and open the{' '}
        <ExternalLink href={SOURCES.pageIndexing}>page indexing report</ExternalLink>, which lists the pages
        that are indexed and the reasons others aren’t.
      </p>
      <p>
        Then open the Performance report and look at the searches that show your site. If nearly all of them
        contain your business name, only people who already know you are finding you.
      </p>
      <p>
        <strong>A bad result looks like:</strong> important service pages missing from the index, or no
        searches for your services at all.
      </p>
      <p>
        <strong>Fix:</strong> usually a page for each main service, written to answer real questions. Our{' '}
        <Link href="/blog/seo-guide-small-business-toronto">local SEO guide</Link> covers this step by step.
      </p>

      <h2 id="check-4-the-five-second-test">Check 4: The Five-Second Test</h2>
      <p>
        Show your homepage on a phone to someone who doesn’t know your business. Take it away after five
        seconds and ask three questions:
      </p>
      <ol>
        <li>What does this business do?</li>
        <li>Where does it work?</li>
        <li>What would you do next if you needed it?</li>
      </ol>
      <p>
        <strong>A bad result looks like:</strong> they remember a slogan (“excellence in every detail”) but not
        the service, they can’t tell whether you cover their area, or they didn’t see a button or phone number.
      </p>
      <p>
        <strong>Fix:</strong> replace the slogan with a plain description of what you do and for whom. We walk
        through this in detail, using law firms as the example, in{' '}
        <Link href="/blog/ontario-law-firm-website-content">what an Ontario law firm website should say</Link>
        ; the same principle applies to any service business.
      </p>

      <h2 id="check-5-look-for-signs-of-neglect">Check 5: Look for Signs of Neglect</h2>
      <p>
        Visitors read small signals as evidence of whether you’re still in business and paying attention.
        Look for:
      </p>
      <ul>
        <li>A copyright year in the footer that is several years old</li>
        <li>Team members who have left, or services and prices you no longer offer</li>
        <li>A “latest news” section whose latest item is years old</li>
        <li>Links that lead to error pages</li>
        <li>Opening hours that don’t match your Business Profile</li>
        <li>A browser warning that the site is not secure</li>
      </ul>
      <p>
        None of these is serious alone. Together they tell a visitor that nobody is looking after the site,
        and they tend to wonder what else isn’t being looked after.
      </p>

      <h2 id="fix-it-or-redesign">Fix It Yourself, or Redesign?</h2>
      <p>
        Plenty of what these checks turn up can be fixed without a new website: updated text and prices, a
        corrected form address, compressed images, a clearer homepage headline.
      </p>
      <p>A redesign starts to make more sense when:</p>
      <ul>
        <li>The site is on a platform you can’t edit, or you don’t control the domain and hosting.</li>
        <li>Speed problems are built into the theme, so fixing them means rebuilding pages anyway.</li>
        <li>There is nowhere to put a page for each service without restructuring the site.</li>
        <li>The mobile layout is broken throughout, not on one page.</li>
      </ul>
      <p>
        One caution: a new design on its own doesn’t fix a message problem. If the five-second test fails,
        rewrite the homepage first, whichever route you choose. And if you do rebuild, our{' '}
        <Link href="/blog/website-launch-checklist">website launch checklist</Link> covers the redirects and
        checks that stop a redesign from losing the search visibility you already have.
      </p>

      <div className="blog-callout">
        <h3>Want Us to Run These Checks for You?</h3>
        <p>
          Send us your website address and we will run it through these checks and send you what we find, at
          no cost. If a rebuild is the right call, we will tell you why; if it isn’t, we will say that too.
        </p>
        <p>
          See our <Link href="/services/website-redesign">website redesign service</Link>, or{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </div>
    </div>
  );
};

export const badWebsiteCostingMoneyPost: BlogPost = {
  slug: 'bad-website-costing-business-money',
  title: 'How to Tell If Your Website Is Losing You Customers',
  seoTitle: 'Is Your Website Losing Customers? 5 Checks | Zenara Designs',
  description:
    'Five checks any small business owner can run in an afternoon with free tools to see whether their website is losing enquiries, and what to fix first.',
  excerpt:
    'You rarely see the customers a website loses. These five checks, all free and doable in an afternoon, show whether yours is quietly sending enquiries to competitors.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-04-02'),
  tags: ['web design', 'website redesign', 'conversions'],
  content: BadWebsiteCostingMoneyContent,
};
