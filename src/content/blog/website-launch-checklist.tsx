import { BlogPost } from '@/types';
import Link from 'next/link';

const H2 = 'text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-10 sm:mt-12 mb-4 sm:mb-6 tracking-tight';
const ACCENT = 'bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient';
const P = 'text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em] mb-6';
const UL = 'list-disc list-inside text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em] mb-6 space-y-2 ml-4';
const STRONG = 'text-cyan-300 font-semibold';

const WebsiteLaunchChecklistContent = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <p className={P}>
        Most small business websites launch with something broken. Not catastrophically — the site loads,
        the pages are there — but the contact form silently fails, or analytics was never connected, or
        every page carries the same meta description. These problems are cheap to catch before launch and
        expensive to discover three months later when you are trying to work out why nobody called.
      </p>
      <p className={P}>
        This is the checklist we run before every site we hand over. Work through it in order; each
        section depends on the one above it.
      </p>

      <h2 className={H2}><span className={ACCENT}>1. Content and Copy</span></h2>
      <ul className={UL}>
        <li><strong className={STRONG}>Every page has one H1</strong> that describes that page, not the business in general.</li>
        <li><strong className={STRONG}>Contact details match everywhere</strong> — site footer, contact page, and your Google Business Profile. Inconsistent phone numbers and addresses actively hurt local search.</li>
        <li><strong className={STRONG}>No placeholder text survives.</strong> Search the whole site for &quot;lorem&quot;, &quot;TODO&quot;, and your designer&apos;s template company name.</li>
        <li><strong className={STRONG}>Prices and timelines are current</strong> and say the same thing on every page they appear.</li>
        <li><strong className={STRONG}>Nothing claims a statistic you cannot source.</strong> If you would not want to be asked where a number came from, take it out.</li>
      </ul>

      <h2 className={H2}><span className={ACCENT}>2. Technical Setup</span></h2>
      <ul className={UL}>
        <li><strong className={STRONG}>One canonical domain.</strong> Pick www or non-www and 301 the other. Both being reachable splits your search signals in half.</li>
        <li><strong className={STRONG}>SSL is active</strong> and every internal link uses https.</li>
        <li><strong className={STRONG}>Every page has a unique title and meta description.</strong> Keep titles under about 60 characters or Google truncates them mid-word.</li>
        <li><strong className={STRONG}>A canonical tag on every page</strong> pointing at itself.</li>
        <li><strong className={STRONG}>robots.txt does not block anything you want indexed.</strong> A common trap: blocking a page in robots.txt while also marking it noindex. The block stops the crawler ever reading the noindex, so the page stays in the index indefinitely.</li>
        <li><strong className={STRONG}>The sitemap lists real, indexable URLs only</strong> — no redirects, no 404s, no staging pages.</li>
        <li><strong className={STRONG}>Staging and demo subdomains are noindexed.</strong> A preview build competing with your live site is a surprisingly common and completely avoidable problem.</li>
      </ul>

      <h2 className={H2}><span className={ACCENT}>3. Forms and Conversion</span></h2>
      <p className={P}>
        Test this from a real device, on real data, not from the machine that built the site.
      </p>
      <ul className={UL}>
        <li><strong className={STRONG}>Submit every form</strong> and confirm the email actually arrives — including checking the spam folder.</li>
        <li><strong className={STRONG}>Check the reply-to address</strong> so you can respond directly to an enquiry.</li>
        <li><strong className={STRONG}>Phone numbers are click-to-call</strong> links on mobile.</li>
        <li><strong className={STRONG}>Spam protection is active</strong> — a honeypot field at minimum.</li>
        <li><strong className={STRONG}>The thank-you state is clear</strong> so nobody submits twice wondering whether it worked.</li>
      </ul>

      <h2 className={H2}><span className={ACCENT}>4. Measurement</span></h2>
      <p className={P}>
        Skip this and you will have no idea whether the site works. It takes under an hour and cannot be
        backfilled — data starts the day you connect it.
      </p>
      <ul className={UL}>
        <li><strong className={STRONG}>Google Analytics 4 installed</strong> and firing on every page.</li>
        <li><strong className={STRONG}>Google Search Console verified</strong> and the sitemap submitted.</li>
        <li><strong className={STRONG}>Conversions tracked as events</strong> — form submissions and click-to-call taps. Sessions alone will not tell you whether anyone tried to reach you.</li>
        <li><strong className={STRONG}>The accounts are in your name</strong>, with your agency added as a user. If you ever change providers you keep every historical data point.</li>
      </ul>
      <p className={P}>
        This is exactly what our{' '}
        <Link href="/services/website-maintenance" className="text-cyan-300 underline hover:text-cyan-200">website care and analytics</Link>{' '}
        service sets up and reports on each month.
      </p>

      <h2 className={H2}><span className={ACCENT}>5. Performance and Accessibility</span></h2>
      <ul className={UL}>
        <li><strong className={STRONG}>Run Lighthouse on mobile</strong>, not desktop. Desktop scores flatter you and are not where your traffic is.</li>
        <li><strong className={STRONG}>Images are compressed and correctly sized.</strong> An unoptimised hero image is the single most common cause of a slow first load.</li>
        <li><strong className={STRONG}>Every image has descriptive alt text</strong> — what it shows, not &quot;image of&quot;.</li>
        <li><strong className={STRONG}>The site is navigable by keyboard</strong> and body text meets a 4.5:1 contrast ratio.</li>
        <li><strong className={STRONG}>Nothing scrolls horizontally</strong> at 375px wide.</li>
      </ul>

      <h2 className={H2}><span className={ACCENT}>6. Local Search</span></h2>
      <ul className={UL}>
        <li><strong className={STRONG}>Google Business Profile claimed</strong>, with categories, hours, and service areas complete.</li>
        <li><strong className={STRONG}>LocalBusiness structured data</strong> present in the page source — server-rendered, not injected by JavaScript after load, or crawlers that do not run scripts will never see it.</li>
        <li><strong className={STRONG}>Business name, address, and phone are identical</strong> across your site, your profile, and any directory listings.</li>
        <li><strong className={STRONG}>A review request process exists</strong> before launch, so reviews start accumulating from day one.</li>
      </ul>

      <h2 className={H2}><span className={ACCENT}>7. After Launch</span></h2>
      <ul className={UL}>
        <li><strong className={STRONG}>If you replaced an old site, 301 every old URL</strong> to its new home. Skipping this is the most common way a redesign destroys rankings that took years to build.</li>
        <li><strong className={STRONG}>Watch Search Console for two weeks</strong> — coverage errors and crawl problems surface there first.</li>
        <li><strong className={STRONG}>Confirm pages are actually getting indexed.</strong> A page that is live is not necessarily a page that is in Google.</li>
        <li><strong className={STRONG}>Know who fixes things.</strong> Agree in writing who handles updates, and how fast, before you need it urgently.</li>
      </ul>

      <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 mt-10 sm:mt-12 mb-6 border border-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 relative z-10 tracking-tight">
          <span className={ACCENT}>Already launched and unsure?</span>
        </h3>
        <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em] relative z-10">
          We will run an existing site through this checklist and send you what we find, at no cost.{' '}
          <Link href="/services/website-redesign" className="text-cyan-300 underline hover:text-cyan-200">
            <strong className={STRONG}>Request a site audit</strong>
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="text-cyan-300 underline hover:text-cyan-200">
            <strong className={STRONG}>get in touch</strong>
          </Link>.
        </p>
      </div>
    </div>
  );
};

export const websiteLaunchChecklistPost: BlogPost = {
  slug: 'website-launch-checklist',
  title: 'The Small Business Website Launch Checklist',
  description: 'The 40-point checklist we run before handing over any website — content, technical setup, forms, analytics, performance, and local search. Free to use on your own site.',
  author: 'Zenara Designs',
  publishedAt: new Date('2026-08-23'),
  tags: ['checklist', 'website launch', 'SEO', 'analytics'],
  content: WebsiteLaunchChecklistContent,
};
