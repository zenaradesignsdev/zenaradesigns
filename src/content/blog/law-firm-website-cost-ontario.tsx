import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';
import { LSO_RULES_URL } from '@/lib/constants';
import { PRICES, formatCad, packagePriceWithRegular } from '@/lib/pricing-data';

const AODA_WEBSITES = 'https://www.ontario.ca/page/how-make-websites-accessible';

const LawFirmWebsiteCostContent = () => {
  return (
    <div>
      <p>
        Law firm website quotes in Ontario cover an unusually wide range. Legal marketing agencies quote tens of
        thousands of dollars; at least one Toronto agency publishes ranges of $25,000 to $100,000. A freelancer
        might quote a few thousand. Both can be fair prices for what they include. The question for a small or
        mid-size firm is which of those things you actually need.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <ul>
        <li>
          <strong>Website builder or legal website platform:</strong> a monthly subscription, and usually your
          own time or a staff member’s to set it up.
        </li>
        <li>
          <strong>Freelancer:</strong> roughly a few hundred to a few thousand dollars, often on a WordPress
          theme.
        </li>
        <li>
          <strong>Small studio:</strong> typically low to mid four figures for a custom site of five to ten
          pages, with fixed pricing more common.
        </li>
        <li>
          <strong>Legal marketing agency:</strong> mid five figures and up, usually bundled with ongoing SEO,
          content and advertising management.
        </li>
      </ul>
      <p>
        A sole practitioner or a firm of two to ten lawyers rarely needs what the top band includes. It does
        need more care than a generic small business site, for the reasons below.
      </p>

      <h2 id="what-drives-the-cost">What Drives the Cost of a Law Firm Website</h2>
      <h3>Practice area pages</h3>
      <p>
        Each major practice area deserves its own page that explains who it is for, how the process works and
        how fees are structured. Three solid practice pages cost more to write and build than one list, and are
        worth it: they are what ranks and what convinces.
      </p>
      <h3>Lawyer profiles and photography</h3>
      <p>
        Prospective clients want to know who they will be dealing with. Real profiles with year of call,
        practice focus, languages and a professional photo are one of the most-read parts of a law firm site.
        Budget for a photographer if you don’t have current photos.
      </p>
      <h3>Content, written to the Law Society’s rules</h3>
      <p>
        Your website is marketing, so{' '}
        <ExternalLink href={LSO_RULES_URL}>chapter 4 of the Law Society’s Rules of Professional
        Conduct</ExternalLink> applies: claims must be demonstrably true, “specialist” is reserved for certified
        specialists, past results need a disclaimer, and published fees must say what they include. Writing copy
        that is persuasive and compliant takes longer than writing either alone. If a quote doesn’t mention who
        writes the content, ask.
      </p>
      <h3>Intake and booking</h3>
      <p>
        A consultation form that asks for the type of matter and the other parties’ names, so you can run a
        conflict check, is worth building properly. So is keeping it short: the form shouldn’t invite people to
        send confidential details before a retainer exists. Online booking or a connection to practice
        management software adds setup time.
      </p>
      <h3>Accessibility and languages</h3>
      <p>
        Firms with 50 or more employees in Ontario must meet{' '}
        <ExternalLink href={AODA_WEBSITES}>WCAG 2.0 Level AA under the AODA</ExternalLink>, and it is good
        practice for any firm. Pages in French or another language your clients speak add translation and build
        time for each page.
      </p>

      <h2 id="what-you-can-skip">What a Small Firm Can Usually Skip</h2>
      <ul>
        <li>Dozens of thin pages for every city and sub-practice</li>
        <li>Custom illustration and animation that slows the site down</li>
        <li>A long-term content or advertising retainer before the site itself is right</li>
        <li>An enterprise content management system when two or three people will ever edit the site</li>
      </ul>

      <h2 id="running-costs">Running Costs After Launch</h2>
      <p>
        Plan for the domain, hosting, business email, and someone to make changes when a lawyer joins or a
        practice area changes. Our{' '}
        <Link href="/services/website-maintenance">hosting and maintenance plans</Link> start at{' '}
        {formatCad(PRICES.subscriptions.core)} a month; whoever you hire, get the running costs in writing.
      </p>

      <h2 id="what-we-charge">What We Charge for a Law Firm Website</h2>
      <p>Our prices are fixed and published, including any promotion running when you read this:</p>
      <ul>
        <li>
          <strong>Small Business, {packagePriceWithRegular('smallBusiness')}:</strong> up to six pages, which fits
          most sole practitioners and small firms: home, about and lawyers, two or three practice areas, and
          contact.
        </li>
        <li>
          <strong>Pro, from {formatCad(PRICES.pro.from)}:</strong> larger firms with more practice areas and lawyer profiles,
          booking or intake integrations, or a second language.
        </li>
      </ul>
      <p>
        Every project gets a written scope and a fixed price before work starts. You can see how we approach a
        legal site in our <Link href="/projects/law-firm-concept">law firm concept build</Link>.
      </p>

      <div className="blog-callout">
        <h3>Get a Fixed Quote for Your Firm</h3>
        <p>
          Tell us about your practice areas and team, and we will come back with a written scope and a fixed
          price.
        </p>
        <p>
          See our <Link href="/lawyers">law firm website design</Link>, the{' '}
          <Link href="/resources/ontario-law-firm-website-checklist">Ontario law firm website checklist</Link>, or{' '}
          <Link href="/contact">get a quote</Link>.
        </p>
      </div>
    </div>
  );
};

export const lawFirmWebsiteCostPost: BlogPost = {
  slug: 'law-firm-website-cost-ontario',
  title: 'How Much Does a Law Firm Website Cost in Ontario? (2026)',
  seoTitle: 'How Much Does a Law Firm Website Cost in Ontario? | Zenara',
  description:
    'What a law firm website costs in Ontario in 2026, from freelancers to legal marketing agencies, what drives the price for a small firm, and what you can skip.',
  excerpt:
    'Law firm website quotes in Ontario run from a few thousand dollars to six figures. Here is what drives the cost for a small or mid-size firm, and what you can safely skip.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-10-20'),
  tags: ['industry guides', 'law firms', 'pricing & planning'],
  content: LawFirmWebsiteCostContent,
};
