import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

const AODA_WEBSITES = 'https://www.ontario.ca/page/how-make-websites-accessible';

const WebsiteCostTorontoContent = () => {
  return (
    <div>
      <p>
        Ask five web designers in Toronto what a small business website costs and you can get five answers
        that differ by a factor of ten. Some of that is the market, and some of it is that people quote for
        very different things under the same word, “website”. This guide explains what actually drives the
        price, what you keep paying after launch, and how to compare two quotes fairly.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <p>
        Prices in the GTA fall into rough bands by who builds the site. These are broad bands you will see
        when you collect quotes, not survey data:
      </p>
      <ul>
        <li>
          <strong>Do it yourself on a website builder:</strong> a monthly subscription, plus your own time.
          The cheapest in dollars and often the most expensive in hours.
        </li>
        <li>
          <strong>Freelancer:</strong> from under a thousand dollars to several thousand, depending heavily on
          the person and the scope.
        </li>
        <li>
          <strong>Small studio:</strong> typically low to mid four figures for a small-business site, with
          fixed packages more common.
        </li>
        <li>
          <strong>Traditional agency:</strong> often five figures, with longer timelines and more people
          involved.
        </li>
      </ul>
      <p>
        Where a specific project lands inside those bands depends on the factors below.
      </p>

      <h2 id="what-drives-the-price">What Actually Drives the Price</h2>
      <ul>
        <li>
          <strong>Number of pages and page types.</strong> Ten pages that share two layouts cost less than six
          pages that each need their own design. Ask how many distinct templates you are paying for.
        </li>
        <li>
          <strong>Who writes the content.</strong> If you supply finished text and photos, the job is smaller.
          If the designer writes the copy, organizes a photo shoot or restructures your services, that is
          real work and should appear in the quote.
        </li>
        <li>
          <strong>Integrations.</strong> Online booking, payments, a customer portal or an online store each add
          setup and testing time.
        </li>
        <li>
          <strong>Languages.</strong> A bilingual site is closer to two sites than to one site with a toggle,
          because every page, form and email needs a second version.
        </li>
        <li>
          <strong>Accessibility obligations.</strong> In Ontario, businesses and non-profits with 50 or more
          employees must make their public websites meet{' '}
          <ExternalLink href={AODA_WEBSITES}>WCAG 2.0 Level AA under the AODA</ExternalLink>. Building to
          that standard from the start costs far less than fixing an existing site later.
        </li>
        <li>
          <strong>Custom design versus an adapted template.</strong> Both are legitimate. They are not the
          same product, and they shouldn’t be priced as if they were.
        </li>
      </ul>

      <h2 id="running-costs-after-launch">Running Costs After Launch</h2>
      <p>
        The build is a one-time cost. These keep going:
      </p>
      <ul>
        <li>
          <strong>Domain name:</strong> a .ca or .com usually costs a few tens of dollars a year.
        </li>
        <li>
          <strong>Hosting:</strong> anywhere from a few dollars a month for basic shared hosting to managed
          plans that include backups, security updates and monitoring.
        </li>
        <li>
          <strong>Business email:</strong> usually a per-user monthly fee through Google Workspace or
          Microsoft 365.
        </li>
        <li>
          <strong>Maintenance:</strong> updates, fixes and small content changes, either paid per request or
          through a monthly plan.
        </li>
      </ul>
      <p>
        For a concrete example, our own <Link href="/services/website-maintenance">maintenance plans</Link>{' '}
        start at $45 a month for managed hosting, SSL and daily backups. That is $540 a year, plus the
        domain. Whoever you hire, ask for the running costs in writing before you sign, not after launch.
      </p>

      <h2 id="how-to-compare-two-quotes">How to Compare Two Quotes</h2>
      <p>
        Two quotes for “a five-page website” can describe completely different projects. Before comparing
        the totals, line them up on these points:
      </p>
      <ol>
        <li>
          <strong>What “custom” means.</strong> Designed for you from scratch, or a purchased theme with your
          logo and colours?
        </li>
        <li>
          <strong>Who owns what.</strong> The domain, hosting account, analytics and Business Profile should
          all be registered to you, with the designer added as a user.
        </li>
        <li>
          <strong>Revision rounds.</strong> How many are included, and what does an extra round cost?
        </li>
        <li>
          <strong>Content.</strong> Who writes it, who sources the photos, and what happens if your content is
          late?
        </li>
        <li>
          <strong>Support after launch.</strong> How long are fixes and small edits included, and what does it
          cost after that?
        </li>
        <li>
          <strong>Timeline and payment schedule.</strong> When does work start, when does it finish, and how
          much is due before anything is delivered?
        </li>
      </ol>
      <p>
        We cover the rest of the hiring process, including questions to ask on the first call, in{' '}
        <Link href="/blog/choosing-web-designer-gta">how to choose a web designer in the GTA</Link>.
      </p>

      <h2 id="what-zenara-charges">What We Charge</h2>
      <p>
        Our prices are fixed and published, so here they are. Regular prices are shown; the{' '}
        <Link href="/pricing">pricing page</Link> always has the current figures and any promotion running.
      </p>
      <ul>
        <li>
          <strong>Starter, $999:</strong> up to three pages for freelancers and personal brands, with a
          contact form, SEO setup and a 3–5 day turnaround once content is received.
        </li>
        <li>
          <strong>Small Business, $1,999:</strong> up to six pages with custom sections and forms, two
          revision rounds, and a 1–2 week turnaround once content is received.
        </li>
        <li>
          <strong>Pro, from $4,999:</strong> larger sites with a custom design system, integrations such as
          booking or payments, or an online store, typically 3–4 weeks.
        </li>
      </ul>
      <p>
        Every project starts with a written brief and a fixed price before any work begins, and we split
        payment 50% upfront and 50% on completion.
      </p>

      <h2 id="why-we-can-charge-less">Why We Can Charge Less Than a Traditional Agency</h2>
      <p>
        A lower price reasonably raises the question of what has been cut. In our case the savings come from
        how we work, not from what we deliver:
      </p>
      <ul>
        <li>
          <strong>A small senior team.</strong> We are a two-engineer studio working with a contract designer.
          The people you talk to are the people building your site, so there are no account managers or
          hand-offs to pay for.
        </li>
        <li>
          <strong>AI-assisted development.</strong> AI tools speed up the repetitive parts of a build, such as
          scaffolding pages, drafting routine code and checking our work. Decisions about structure, design and
          what your site says are made by us, and everything is reviewed before it ships.
        </li>
        <li>
          <strong>Automation where it is reliable.</strong> Deployment is automated, and we run scripted
          PageSpeed and Search Console audits instead of checking every page by hand.
        </li>
        <li>
          <strong>No downtown overhead.</strong> We are based in Markham and work directly with clients, which
          keeps fixed costs low.
        </li>
      </ul>
      <p>
        What doesn’t change: the site is designed for your business and built in code rather than on a page
        builder, and you own the site, the domain and the accounts when it is done.
      </p>

      <h2 id="when-to-spend-more-or-less">When to Spend More, and When Not To</h2>
      <p>
        Spending more is justified when the site has to do more: complex booking or payment flows, a large
        catalogue, several languages, strict accessibility requirements, or integration with systems you
        already run.
      </p>
      <p>
        Spending less stops being a saving when the cheap site has to be rebuilt within a year, when you
        don’t own the domain or accounts, or when nobody can make changes after launch. The number to compare
        isn’t the first invoice; it’s what the site costs you over the next few years, including your own
        time.
      </p>

      <div className="blog-callout">
        <h3>Want a Fixed Price for Your Site?</h3>
        <p>
          Tell us what your business needs and we will come back with a written scope and a fixed quote, with
          no obligation.
        </p>
        <p>
          Compare our <Link href="/pricing">plans and current pricing</Link>, or{' '}
          <Link href="/contact">get a quote</Link>.
        </p>
      </div>
    </div>
  );
};

export const websiteCostTorontoPost: BlogPost = {
  slug: 'how-much-does-a-website-cost-toronto',
  title: 'How Much Does a Website Cost in Toronto and the GTA?',
  seoTitle: 'How Much Does a Website Cost in Toronto? | Zenara Designs',
  description:
    'What a small business website costs in Toronto and the GTA, what drives the price, the running costs after launch, and how to compare two quotes fairly.',
  excerpt:
    'Quotes for a small business website in Toronto can differ by a factor of ten. Here is what actually drives the price, what you keep paying after launch, and how to compare quotes fairly.',
  author: 'Kavin Mural',
  publishedAt: new Date('2025-02-20'),
  updatedAt: new Date('2026-09-23'),
  tags: ['pricing & planning', 'web design', 'small business'],
  content: WebsiteCostTorontoContent,
};
