import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';
import { PRICES, formatCad, packagePriceWithRegular } from '@/lib/pricing-data';

const AODA_WEBSITES = 'https://www.ontario.ca/page/how-make-websites-accessible';

const WebsiteCostMarkhamContent = () => {
  return (
    <div>
      <p>
        If you run a business in Markham and ask around for website quotes, you will hear numbers from a few
        hundred dollars to well into five figures. Markham has no shortage of web designers: freelancers,
        small studios along Highway 7, and agencies that serve the corporate offices in the same corridor.
        The spread is real, but most of it comes down to what each quote actually includes. This guide covers
        what a small business website costs in Markham in 2026, what is specific to building one here, and
        how to judge the quotes you get.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <p>
        These are the broad bands you will see when you collect quotes in Markham and the rest of York Region.
        They are what the market charges, not survey data:
      </p>
      <ul>
        <li>
          <strong>Website builder, done yourself:</strong> a monthly subscription, usually somewhere around
          CA$20 to CA$45 a month for a business plan, plus your own time.
        </li>
        <li>
          <strong>Freelancer:</strong> from a few hundred dollars for a template set up with your content to
          a few thousand for a more involved build.
        </li>
        <li>
          <strong>Small studio:</strong> typically low to mid four figures for a small-business site of five
          to ten pages, usually as a fixed package.
        </li>
        <li>
          <strong>Agency:</strong> usually five figures and up, with a project manager, a longer discovery
          phase and a bigger team.
        </li>
      </ul>
      <p>
        For most independent Markham businesses, such as a clinic, an accounting practice, a contractor or a
        restaurant, a well-built site of five or six pages lands in the small-studio band.
      </p>

      <h2 id="what-is-different-about-markham">What Is Different About Building a Website in Markham</h2>
      <p>
        Most of what drives the price is the same anywhere: page count, who writes the content, integrations
        and how much is designed from scratch. Three things come up more often in Markham than elsewhere in the
        GTA.
      </p>
      <h3>A second language</h3>
      <p>
        Census data puts Cantonese, Mandarin and Tamil among the most common mother tongues in Markham after
        English. Many local businesses serve those communities and want key pages in a second language. That
        is a real cost: every translated page needs its own copy, its own page title and description, and its
        own version of each form and confirmation email. Budget for the translation itself, from you or a
        professional translator, and for the extra pages in the build. Translating your homepage, main
        services and contact page usually covers what a new customer needs, and costs much less than
        translating everything.
      </p>
      <h3>A competitive, tech-literate audience</h3>
      <p>
        Markham customers are used to fast, polished sites from the technology companies they work for. A
        slow or dated site stands out here for the wrong reasons. That doesn’t mean you need an expensive
        site, but it does mean the cheapest template rarely does the job.
      </p>
      <h3>Local search is crowded</h3>
      <p>
        Search “web design Markham” or “physiotherapy Markham” and you will see how many businesses compete
        for the same customers. A site that names the neighbourhoods you actually serve, such as Unionville,
        Cornell or Markham Village, and has a properly set up Google Business Profile behind it, is worth more
        than extra pages that say nothing specific. Make sure your quote includes basic SEO setup, not just
        design.
      </p>

      <h2 id="what-drives-the-price">What Actually Drives the Price</h2>
      <ul>
        <li>
          <strong>Distinct page layouts, not page count.</strong> Ten pages that share two layouts cost less
          than six pages that each need their own design.
        </li>
        <li>
          <strong>Content.</strong> If you supply finished text and photos, the job is smaller. If the designer
          writes your copy, that is real work and should be in the quote.
        </li>
        <li>
          <strong>Integrations.</strong> Online booking, payments, a client portal or a store each add setup
          and testing time.
        </li>
        <li>
          <strong>Accessibility.</strong> Ontario businesses with 50 or more employees must make their public
          websites meet{' '}
          <ExternalLink href={AODA_WEBSITES}>WCAG 2.0 Level AA under the AODA</ExternalLink>. Building to
          that standard from the start is cheaper than fixing it later, and it is good practice at any size.
        </li>
      </ul>

      <h2 id="running-costs">Running Costs After Launch</h2>
      <p>
        The build is a one-time cost. Plan for the domain (a few tens of dollars a year), hosting, business
        email if you don’t already have it, and maintenance. Our own{' '}
        <Link href="/services/website-maintenance">hosting and maintenance plans</Link> start at{' '}
        {formatCad(PRICES.subscriptions.core)} a month, and you can host the site anywhere you like instead.
        Whoever you hire, get the running costs in writing before you sign.
      </p>

      <h2 id="how-to-judge-a-markham-quote">How to Judge a Markham Quote</h2>
      <ol>
        <li>
          <strong>Ask what “custom” means.</strong> Designed for you from scratch, or a purchased theme with your
          logo? Both are legitimate; they shouldn’t cost the same.
        </li>
        <li>
          <strong>Ask who owns what.</strong> The domain, hosting, Google Analytics and your Business Profile
          should be in your name.
        </li>
        <li>
          <strong>Ask who you will deal with.</strong> At a larger shop the person who sells the project is
          rarely the person who builds it. At a small studio it often is.
        </li>
        <li>
          <strong>Ask about a second language</strong> if you need one: how it is built, who translates, and
          whether translated pages get their own URLs so they can appear in search.
        </li>
        <li>
          <strong>Ask to meet.</strong> A Markham designer should be able to meet you in person at least once,
          for the kickoff or the design review. It is the fastest way to judge whether you can work together.
        </li>
      </ol>
      <p>
        Our guide to <Link href="/blog/choosing-web-designer-gta">choosing a web designer in the GTA</Link>{' '}
        covers the rest of the questions to ask on a first call.
      </p>

      <h2 id="what-we-charge">What We Charge</h2>
      <p>
        We are a small studio based in Markham, and our prices are fixed and published. These figures include
        any promotion running when you read this:
      </p>
      <ul>
        <li>
          <strong>Starter, {packagePriceWithRegular('starter')}:</strong> up to three pages, with a contact form
          and SEO setup, ready in 3–5 days once we have your content.
        </li>
        <li>
          <strong>Small Business, {packagePriceWithRegular('smallBusiness')}:</strong> up to six pages with custom
          sections and forms, two rounds of revisions, live in 1–2 weeks.
        </li>
        <li>
          <strong>Pro, from {formatCad(PRICES.pro.from)}:</strong> larger sites, integrations such as booking or payments,
          an online store, or a second language across the whole site.
        </li>
      </ul>
      <p>
        Every project starts with a written brief and a fixed price, and payment is split 50% upfront and 50%
        on completion. See the <Link href="/pricing">pricing page</Link> for everything each package includes.
      </p>

      <div className="blog-callout">
        <h3>Get a Fixed Quote From a Markham Studio</h3>
        <p>
          Tell us what your business needs and we will come back with a written scope and a fixed price. We are
          happy to meet in person in Markham.
        </p>
        <p>
          See our <Link href="/web-design/markham">web design in Markham</Link> page, or{' '}
          <Link href="/contact">get a quote</Link>.
        </p>
      </div>
    </div>
  );
};

export const websiteCostMarkhamPost: BlogPost = {
  slug: 'how-much-does-a-website-cost-markham',
  title: 'How Much Does a Website Cost in Markham? (2026 Prices)',
  seoTitle: 'How Much Does a Website Cost in Markham? (2026) | Zenara',
  description:
    'What a small business website costs in Markham in 2026: freelancer, studio and agency price bands, multilingual sites, running costs, and how to judge a quote.',
  excerpt:
    'Markham website quotes run from a few hundred dollars to five figures. Here is what drives the price, what is different about building a site in Markham, and how to judge the quotes you get.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-10-20'),
  tags: ['pricing & planning', 'web design', 'small business'],
  content: WebsiteCostMarkhamContent,
};
