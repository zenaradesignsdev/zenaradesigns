import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';
import { LSO_RULES_URL } from '@/lib/constants';

const SOURCES = {
  localRanking: 'https://support.google.com/business/answer/7091',
  profileGuidelines: 'https://support.google.com/business/answer/3038177',
  reviewPolicy: 'https://support.google.com/contributionpolicy/answer/7400114',
  lsoConfidentiality: 'https://lso.ca/about-lso/legislation-and-rules/rules-of-professional-conduct/chapter-3',
  lsoDirectory: 'https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory',
};

const LawFirmSeoTorontoContent = () => {
  return (
    <div>
      <p>
        Search “family lawyer Toronto” or “real estate lawyer Markham” and the first screen is mostly map
        results and firms with large marketing budgets. A sole practitioner or a five-lawyer firm will not
        outspend them. It doesn’t need to. Small firms win search by being the most relevant, most local and
        most clearly described answer for a narrower set of searches, and by doing the basics properly where
        larger competitors often don’t.
      </p>
      <p>
        This guide covers what matters most for a small Toronto or GTA firm, in the order we would tackle it,
        and where the Law Society of Ontario’s rules change the usual SEO advice.
      </p>

      <h2 id="how-google-chooses">How Google Chooses Which Firms to Show</h2>
      <p>
        Google says <ExternalLink href={SOURCES.localRanking}>local results are based mainly on relevance,
        distance and prominence</ExternalLink>. You can’t change how far a searcher is from your office. You can
        make it unmistakable what you do and where, and you can build the reviews, mentions and links that
        make a firm prominent. Everything below serves one of those two.
      </p>

      <h2 id="google-business-profile">Step 1: Get the Google Business Profile Right</h2>
      <p>For most local legal searches, the map results come before the website. Check:</p>
      <ul>
        <li>
          <strong>Primary category:</strong> the most specific one that fits your main practice, rather than a
          generic one. Add secondary categories only for work you actually do.
        </li>
        <li>
          <strong>Name:</strong> your firm’s real name, exactly as it appears on your signage and letterhead.
          Adding keywords such as “Best Family Lawyer Toronto” breaks{' '}
          <ExternalLink href={SOURCES.profileGuidelines}>Google’s profile guidelines</ExternalLink> and risks
          suspension.
        </li>
        <li>
          <strong>Address:</strong> one profile per real office. A virtual office or mail drop doesn’t
          qualify unless it is staffed during your business hours.
        </li>
        <li>
          <strong>Services and description:</strong> list your practice areas in plain language and say which
          parts of the GTA you serve.
        </li>
        <li>
          <strong>Photos:</strong> the office, the entrance, and the lawyers. Clients want to know who they will
          meet and where.
        </li>
      </ul>

      <h2 id="reviews-within-the-rules">Step 2: Reviews, Within the Rules</h2>
      <p>
        Reviews are one of the strongest prominence signals, and the place where law firms most need to be
        careful.
      </p>
      <ul>
        <li>
          <strong>Ask, consistently.</strong> The firms with the most reviews usually just ask every satisfied
          client at the end of the matter, with a direct link.
        </li>
        <li>
          <strong>Don’t offer anything in return.</strong> Incentivised reviews break{' '}
          <ExternalLink href={SOURCES.reviewPolicy}>Google’s review policy</ExternalLink>.
        </li>
        <li>
          <strong>Reply without confirming anything.</strong> Under{' '}
          <ExternalLink href={SOURCES.lsoConfidentiality}>rule 3.3-1</ExternalLink>, a lawyer must hold in
          strict confidence all information about a client’s affairs. A reply to a review, especially a negative
          one, should not confirm that the reviewer was a client or mention anything about their matter. A short,
          general reply that invites them to contact the office is the safe pattern.
        </li>
        <li>
          <strong>Be careful quoting reviews on your website.</strong> The commentary to the Law Society’s{' '}
          <ExternalLink href={LSO_RULES_URL}>marketing rule 4.2-1</ExternalLink> lists testimonials with
          emotional appeals as marketing that may contravene the rule.
        </li>
      </ul>

      <h2 id="practice-area-pages">Step 3: One Strong Page per Practice Area</h2>
      <p>
        A single “Practice Areas” page listing ten services gives Google very little to rank. A dedicated page
        for each area you want clients from, such as separation and divorce, residential real estate, or wills
        and estates, can rank for the searches people actually make. Each page should explain:
      </p>
      <ul>
        <li>Who the service is for and the situations you handle</li>
        <li>How the process works and roughly how long it takes</li>
        <li>How fees work, or at least what drives them</li>
        <li>Which lawyers at the firm do this work</li>
        <li>How to book a consultation, and what it costs</li>
      </ul>
      <p>
        Be careful with city pages. A page per GTA city that only swaps the city name is what Google calls a
        doorway page. Build a page for a location only when you have something specific to say about it, such
        as an office there.
      </p>

      <h2 id="answer-the-questions">Step 4: Answer the Questions Clients Search</h2>
      <p>
        People search their problem before they search for a lawyer: what happens to the house in a separation,
        what a real estate lawyer charges, whether they need a will if they have a small estate. A firm that
        answers those questions plainly on its own site earns both the search traffic and the trust. Keep every
        answer accurate and general; it is information, not advice, and it is marketing under the Law
        Society’s rules, so it has to be demonstrably true.
      </p>

      <h2 id="local-links-and-mentions">Step 5: Earn Local Links and Mentions</h2>
      <p>For a law firm, the links worth having are the ones that come from being part of the profession and the community:</p>
      <ul>
        <li>
          Your listing in the{' '}
          <ExternalLink href={SOURCES.lsoDirectory}>Law Society’s Lawyer and Paralegal Directory</ExternalLink>,
          kept accurate with your current firm and address
        </li>
        <li>Your county or regional law association, and Ontario Bar Association or CBA sections you belong to</li>
        <li>Articles, talks or CLE sessions you have given, published on the organizer’s site</li>
        <li>Community organizations, charities and local business groups you are genuinely involved with</li>
        <li>Being quoted in local news on a legal topic you know well</li>
      </ul>
      <p>
        Skip paid “best lawyer” badges and directories that rank anyone who pays. The rule 4.2-1 commentary
        says awards, rankings and endorsements that are paid for or are not the result of a reasonable
        evaluative process may contravene the rule, and Google doesn’t value them either.
      </p>

      <h2 id="technical-basics">Step 6: The Technical Basics</h2>
      <ul>
        <li>The site is fast and easy to use on a phone; most local searches start there.</li>
        <li>Every page has a unique title naming the practice area and, where it helps, the city.</li>
        <li>Name, address and phone number match exactly across the site, the profile and directories.</li>
        <li>LegalService structured data describes the firm, its address and its practice areas.</li>
        <li>The site is registered in Google Search Console, with a sitemap submitted.</li>
      </ul>

      <h2 id="measuring">How to Measure It</h2>
      <p>
        Rankings move around, so watch outcomes instead: calls and direction requests from the Business
        Profile, consultation requests from the website, and in Search Console, which searches bring people to
        each practice page. Ask every new client how they found you. For a small firm, a few extra consultations
        a month from search is a meaningful result, and it usually takes several months of steady work, not a
        few weeks.
      </p>

      <div className="blog-callout">
        <h3>Start With a Site That Can Rank</h3>
        <p>
          We build law firm websites with practice-area structure, local SEO and Law Society-aware copy from the
          first draft.
        </p>
        <p>
          See our <Link href="/lawyers">law firm website design</Link>, our{' '}
          <Link href="/services/seo">local SEO services</Link>, or the{' '}
          <Link href="/resources/ontario-law-firm-website-checklist">Ontario law firm website checklist</Link>.
        </p>
      </div>
    </div>
  );
};

export const lawFirmSeoTorontoPost: BlogPost = {
  slug: 'law-firm-seo-toronto',
  title: 'Law Firm SEO in Toronto: A Practical Guide for Small Firms',
  seoTitle: 'Law Firm SEO Toronto: A Guide for Small Firms | Zenara',
  description:
    'Local SEO for small Toronto and GTA law firms: Google Business Profile, reviews within the Law Society rules, practice-area pages, local links and what to measure.',
  excerpt:
    'A sole practitioner won’t outspend the big firms in search, and doesn’t need to. Here is what matters most for a small Toronto law firm, and where the Law Society’s rules change the usual SEO advice.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-10-20'),
  tags: ['industry guides', 'law firms', 'SEO'],
  content: LawFirmSeoTorontoContent,
};
