import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink as External } from '@/components/Blog/ExternalLink';

const SOURCES = {
  localRanking: 'https://support.google.com/business/answer/7091',
  profileGuidelines: 'https://support.google.com/business/answer/3038177',
  reviewPolicy: 'https://support.google.com/contributionpolicy/answer/7400114',
  peopleFirst: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
  doorways: 'https://developers.google.com/search/docs/essentials/spam-policies',
  pageIndexing: 'https://support.google.com/webmasters/answer/7440203',
  coreWebVitals: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
};

const SeoGuideTorontoContent = () => {
  return (
    <div>
      <p>
        Most local SEO advice arrives as a list of fifty tactics with equal weight. For a small business in
        Toronto or the wider GTA, a handful of things do most of the work, and the rest is either minor or a
        distraction. This guide covers the handful, in the order we would do them.
      </p>

      <h2 id="how-google-chooses-local-results">How Google Chooses Which Local Businesses to Show</h2>
      <p>
        Google is unusually direct about this. Its Business Profile help pages say{' '}
        <External href={SOURCES.localRanking}>local results are based mainly on relevance, distance and
        prominence</External>, and that there is no way to request or pay for a better local ranking.
      </p>
      <ul>
        <li>
          <strong>Relevance</strong> is how well your profile matches what someone searched for.
        </li>
        <li>
          <strong>Distance</strong> is how far you are from the person searching. You can’t change it.
        </li>
        <li>
          <strong>Prominence</strong> is how well known you are. Google says this draws on information such as
          how many websites link to your business and how many reviews you have.
        </li>
      </ul>
      <p>
        Everything below is about the two you can influence: making it obvious what you do (relevance) and
        building evidence that people know and use your business (prominence).
      </p>

      <h2 id="get-your-business-profile-right">Step 1: Get Your Google Business Profile Right</h2>
      <p>
        The profile is where most local visibility starts, and the common mistakes are easy to fix.
      </p>
      <ul>
        <li>
          <strong>Use your real business name.</strong> Google’s{' '}
          <External href={SOURCES.profileGuidelines}>profile guidelines</External> say the name should match
          what you use on your storefront, website and stationery, and they prohibit adding service or
          location keywords. “Example Plumbing” is fine. “Example Plumbing Markham 24/7 Emergency Plumber”
          breaks the guidelines.
        </li>
        <li>
          <strong>Pick the most specific primary category</strong> for your main line of work, and use
          secondary categories for the rest.
        </li>
        <li>
          <strong>Set up a service area correctly.</strong> If customers don’t come to your address (most
          trades working from home, for example), Google’s guidelines say to hide the address and list the
          areas you serve instead.
        </li>
        <li>
          <strong>Write a useful description.</strong> What you do, who for, and where. Google’s guidelines
          ask for useful information about your services and exclude links and promotional offers.
        </li>
        <li>
          <strong>Ask every satisfied customer for a review.</strong> Send the direct review link by text or
          email the day the job finishes, and reply to every review you get. Don’t offer anything in return:
          Google’s <External href={SOURCES.reviewPolicy}>review policy</External> prohibits incentives such
          as discounts or free services in exchange for reviews.
        </li>
        <li>
          <strong>Add real photos</strong> of your work, your team and, if customers visit, your premises.
        </li>
      </ul>

      <h2 id="give-each-service-a-real-page">Step 2: Give Each Service a Real Page</h2>
      <p>
        Your website supports relevance too. A single “Services” page with one line per service gives Google
        very little to match against a specific search like “basement waterproofing Scarborough”. A page
        dedicated to that service gives it a lot.
      </p>
      <p>A useful service page usually covers:</p>
      <ul>
        <li>What the service includes, and what it doesn’t</li>
        <li>Who it is typically for, and the problems it solves</li>
        <li>How pricing works, even if that is a range or the factors that affect a quote</li>
        <li>What happens from first contact to finished job</li>
        <li>The questions people ask before they call, answered</li>
        <li>Where you do the work</li>
      </ul>
      <p>
        Write it for the customer first. Google’s own guidance on{' '}
        <External href={SOURCES.peopleFirst}>people-first content</External> recommends content made
        primarily for people, not content made primarily to gain rankings. In practice the two line up: the
        page that answers a customer’s real questions naturally uses the words they search with.
      </p>
      <p>
        Give each page a clear title and heading that name the service, and where it helps, the area. For
        example: “Basement Waterproofing in Scarborough | Example Plumbing”.
      </p>

      <h2 id="be-careful-with-city-pages">Step 3: Be Careful With City Pages</h2>
      <p>
        A common piece of local SEO advice is to build a page for every town you serve. Done badly, that
        creates exactly what Google’s spam policies call{' '}
        <External href={SOURCES.doorways}>doorway abuse</External>, which includes “having multiple domain
        names or pages targeted at specific regions or cities that funnel users to one page”.
      </p>
      <p>A city page is justified when it has something specific to say about that city. For example:</p>
      <ul>
        <li>Projects you have completed there, with photos</li>
        <li>Local differences that matter to the customer, such as which municipality issues the permit</li>
        <li>How you serve that area: travel, scheduling, or a team member based nearby</li>
      </ul>
      <p>
        If the only difference between two pages would be the town name, don’t build the second page.
        Mention the areas you serve on your service pages and in your Business Profile instead.
      </p>

      <h2 id="technical-basics-worth-your-time">Step 4: The Technical Basics Worth Your Time</h2>
      <p>
        Technical SEO can absorb unlimited time. For a small business site, these checks cover what
        matters:
      </p>
      <ul>
        <li>
          <strong>Your pages are actually indexed.</strong> Set up Google Search Console and check the{' '}
          <External href={SOURCES.pageIndexing}>page indexing report</External>. A page marked “Crawled,
          currently not indexed” was seen by Google but not added to results. When that happens to an
          important page, ask whether it offers anything the rest of your site doesn’t.
        </li>
        <li>
          <strong>Every page has its own title and description.</strong> There is no official character
          limit; Google shortens titles to fit the screen, so put the important words first.
        </li>
        <li>
          <strong>The site is fast on a phone.</strong> Google’s{' '}
          <External href={SOURCES.coreWebVitals}>Core Web Vitals</External> guidance suggests aiming for the
          main content to load within 2.5 seconds, responses to taps under 200 milliseconds, and a layout
          shift score under 0.1. PageSpeed Insights will measure all three for free.
        </li>
        <li>
          <strong>Your name, address and phone number match</strong> across your website, Business Profile
          and any directory listings.
        </li>
      </ul>
      <p>
        For the full pre-launch list, including redirects, analytics and form testing, see our{' '}
        <Link href="/blog/website-launch-checklist">website launch checklist</Link>.
      </p>

      <h2 id="earn-local-links-and-mentions">Step 5: Earn Local Links and Mentions</h2>
      <p>
        Links from other websites are part of prominence, and this is where most small businesses are
        weakest. The useful ones are usually the ones that exist because of a real relationship:
      </p>
      <ul>
        <li>Supplier or manufacturer “find an installer” pages that list you</li>
        <li>Your local board of trade or chamber of commerce member directory</li>
        <li>Local teams, events or charities you actually sponsor or support</li>
        <li>Industry associations and professional directories you belong to</li>
        <li>Local news coverage of work that is genuinely newsworthy</li>
      </ul>
      <p>
        Skip anything sold as a link package. It is the fastest way to spend money on SEO that can hurt you.
      </p>

      <h2 id="how-to-measure-local-seo">How to Measure Whether It Is Working</h2>
      <p>Three sources tell you most of what you need:</p>
      <ol>
        <li>
          <strong>Search Console:</strong> which searches show your site, how often, and which pages people
          land on. Watch for service-and-town searches growing.
        </li>
        <li>
          <strong>Business Profile performance:</strong> calls, direction requests and website clicks from
          your profile.
        </li>
        <li>
          <strong>Your own records:</strong> ask every new enquiry how they found you, and write it down.
        </li>
      </ol>
      <p>
        How long results take depends on how competitive your service and area are, so be wary of anyone who
        promises a timeline. Plan in months, not weeks, and judge progress by enquiries rather than by where
        you rank on a given day.
      </p>

      <h2 id="what-to-skip">What to Skip</h2>
      <ul>
        <li>Keyword-stuffed business names and fake locations</li>
        <li>Bought reviews, or discounts in exchange for reviews</li>
        <li>Link packages and directory blasts</li>
        <li>Dozens of near-identical city pages</li>
        <li>
          Writing “near me” into your pages. “Near me” searches are answered using the searcher’s location,
          which is the distance factor above.
        </li>
      </ul>

      <h2 id="what-about-ai-search">What About AI Search?</h2>
      <p>
        AI answers, such as Google’s AI Overviews and assistants like ChatGPT, draw on the same public web.
        The fundamentals above (clear service pages, a consistent Business Profile, genuine mentions of your
        business elsewhere) are also what makes a business easy for those tools to describe accurately. Our{' '}
        <Link href="/services/geo">AI search page</Link> covers the few things that are specific to them.
      </p>

      <div className="blog-callout">
        <h3>Want Help With Local SEO?</h3>
        <p>
          We do this work for small businesses in Markham and across the GTA: Business Profile setup, service
          pages, technical fixes and monthly reporting in plain English.
        </p>
        <p>
          See our <Link href="/services/seo">local SEO services</Link>, or{' '}
          <Link href="/contact">get in touch</Link> and we will tell you what we would fix first on your site.
        </p>
      </div>
    </div>
  );
};

export const seoGuideTorontoPost: BlogPost = {
  slug: 'seo-guide-small-business-toronto',
  title: 'Local SEO for GTA Small Businesses: What Actually Moves Rankings',
  seoTitle: 'Local SEO Guide for GTA Small Businesses | Zenara Designs',
  description:
    'A practical local SEO guide for Toronto and GTA small businesses: Google Business Profile, service pages, city pages, technical basics and measuring results.',
  excerpt:
    'Most local SEO advice is a list of fifty tactics. For a small business in the GTA, a handful do most of the work. Here they are, in the order we would do them, with Google’s own guidance linked.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-06-03'),
  tags: ['SEO', 'local SEO', 'small business'],
  content: SeoGuideTorontoContent,
};
