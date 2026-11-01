import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

// Facts checked against ontario.ca on 2026-10-25:
//   accessibility-rules-businesses-and-non-profits (updated 2026-06-16)
//   how-make-websites-accessible (updated 2026-09-21)
//   completing-your-accessibility-compliance-report (updated 2026-02-19)
// FTC accessiBe final order: ftc.gov press release, 2025-04-22.
// Re-check them before changing any threshold, date or standard below.
const AODA_RULES = 'https://www.ontario.ca/page/accessibility-rules-businesses-and-non-profits';
const AODA_WEBSITES = 'https://www.ontario.ca/page/how-make-websites-accessible';
const AODA_REPORT = 'https://www.ontario.ca/page/completing-your-accessibility-compliance-report';
const WCAG_20 = 'https://www.w3.org/TR/WCAG20/';
const FTC_ACCESSIBE = 'https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million';

const AodaSmallBusinessWebsiteContent = () => {
  return (
    <div>
      <p>
        Every three years, Ontario businesses with 20 or more employees have to file an accessibility
        compliance report, and the next one is due on <strong>December 31, 2026</strong>. That deadline has a lot
        of owners asking a narrower question: does the AODA actually require anything of my website?
      </p>
      <p>
        The answer depends almost entirely on how many people you employ. Here is what the rules say, what they
        don’t, and what is worth doing either way. This is general information drawn from the Government of
        Ontario’s own guidance, not legal advice; if your situation is unusual, check with a lawyer.
      </p>

      <h2 id="the-short-answer">The Short Answer, by Business Size</h2>
      <ul>
        <li>
          <strong>1 to 19 employees:</strong> the AODA does not set a technical standard for your website. You still
          have{' '}
          <ExternalLink href={AODA_RULES}>customer service duties</ExternalLink>, including providing information in
          an accessible format when someone asks for it and offering accessible ways to give feedback. You do not
          file a compliance report.
        </li>
        <li>
          <strong>20 to 49 employees:</strong> the same position on websites, plus the{' '}
          <ExternalLink href={AODA_REPORT}>accessibility compliance report</ExternalLink>, due December 31, 2026 and
          every three years after that.
        </li>
        <li>
          <strong>50 or more employees:</strong> your public website must meet{' '}
          <ExternalLink href={AODA_WEBSITES}>WCAG 2.0 Level AA</ExternalLink>, and you file the compliance report.
        </li>
      </ul>
      <p>
        When you count, the{' '}
        <ExternalLink href={AODA_RULES}>government’s guidance</ExternalLink> says to include full-time, part-time
        and seasonal staff and contract workers, and to leave out staff based outside Ontario, volunteers and
        independent contractors. A business close to 20 or 50 people should plan as if it has already crossed the
        line.
      </p>

      <h2 id="what-the-website-rule-requires">What the Website Rule Requires (50+ Employees)</h2>
      <p>
        Since January 1, 2021, businesses and non-profits with 50 or more employees must make their public
        websites accessible. In the government’s words, a public website and the web content{' '}
        <ExternalLink href={AODA_WEBSITES}>“posted after January 1, 2012, must meet the WCAG 2.0 Level AA success
        criteria”</ExternalLink>. Two criteria are exempt: live captions (1.2.4) and pre-recorded audio descriptions
        (1.2.5).
      </p>
      <p>A few details trip people up:</p>
      <ul>
        <li>
          <strong>The organization that controls the site is responsible.</strong> That stays true when a web
          designer or agency builds and runs it for you. Your contract with them should say which standard they are
          building to.
        </li>
        <li>
          <strong>It covers public websites.</strong> Intranets and extranets are generally out of scope for
          businesses.
        </li>
        <li>
          <strong>It is WCAG 2.0, not 2.1 or 2.2.</strong> Newer versions add criteria, so building to WCAG 2.1 or
          2.2 AA covers 2.0 AA as well. The legal minimum in Ontario is still 2.0 AA.
        </li>
      </ul>

      <h2 id="the-december-2026-report">The December 31, 2026 Compliance Report</h2>
      <p>
        The compliance report is filed online through the Accessibility Compliance Reporting Portal. It
        confirms that you have met your current accessibility requirements, so for a business with 50 or more
        employees it is, in part, a statement about your website. The government notes that filing is a legal
        obligation and that not filing can lead to{' '}
        <ExternalLink href={AODA_REPORT}>enforcement measures, which can include financial penalties</ExternalLink>.
      </p>
      <p>
        If you are in the 50-plus group and have not looked at your site against WCAG 2.0 AA, do that before you
        file, not after.
      </p>

      <h2 id="what-wcag-aa-means-in-practice">What WCAG 2.0 AA Means in Practice</h2>
      <p>
        <ExternalLink href={WCAG_20}>WCAG 2.0</ExternalLink> runs to dozens of success criteria, but most problems
        on small business sites come from the same short list:
      </p>
      <ul className="blog-checklist">
        <li><strong>Images have useful alt text</strong>, and purely decorative images are hidden from screen readers.</li>
        <li><strong>Body text has a contrast ratio of at least 4.5:1</strong> against its background. Light grey on white usually fails.</li>
        <li><strong>Everything works with a keyboard.</strong> Menus, forms, sliders and pop-ups can be reached and closed without a mouse, and you can see where focus is.</li>
        <li><strong>Every form field has a label</strong>, and errors say what went wrong in text, not only in red.</li>
        <li><strong>Headings follow a logical order</strong>, so a screen reader user can skim the page the way a sighted visitor does.</li>
        <li><strong>Pre-recorded video has captions.</strong></li>
        <li><strong>Text isn’t baked into images</strong>, and the page still works when zoomed to 200%.</li>
        <li><strong>Links make sense out of context.</strong> “Read our fee guide” rather than “click here”.</li>
      </ul>
      <p>
        Automated checkers such as Lighthouse or WAVE catch some of these, contrast and missing alt text in
        particular. They cannot tell you whether alt text is accurate or whether a menu is usable with a keyboard,
        so a manual pass is still needed.
      </p>

      <h2 id="why-an-overlay-is-not-the-answer">Why an Accessibility Overlay Isn’t the Answer</h2>
      <p>
        You will see plug-ins that promise to make any website compliant with one line of code. Be careful. In
        2025 the U.S. Federal Trade Commission{' '}
        <ExternalLink href={FTC_ACCESSIBE}>ordered one of the best-known overlay vendors, accessiBe, to pay
        $1 million</ExternalLink> over claims that its AI tool could make any website WCAG-compliant. An overlay
        sits on top of the site; it does not fix the underlying code, labels and structure that the standard is
        actually about.
      </p>

      <h2 id="under-50-employees">Under 50 Employees: Is It Worth Doing Anyway?</h2>
      <p>
        Usually, yes, and not only because you may grow past 50. Ontario’s Human Rights Code applies to every
        business regardless of size. The fixes above also make a site easier for everyone: older clients,
        someone reading on a phone in bright sunlight, a visitor using voice control. For law firms, clinics and
        accounting practices, whose clients are often older or under stress, that matters.
      </p>
      <p>
        The cheapest time to build accessibility in is when the site is built. Retrofitting an existing site is
        possible, but it means touching nearly every template.
      </p>

      <h2 id="a-ten-minute-self-check">A Ten-Minute Self-Check</h2>
      <ul className="blog-checklist">
        <li>Put the mouse away and press Tab through your homepage. Can you reach and use the menu and the contact form?</li>
        <li>Zoom the browser to 200%. Does anything overlap or disappear?</li>
        <li>Run Lighthouse in Chrome’s DevTools and read the Accessibility section, not just the score.</li>
        <li>Submit your contact form with an empty required field. Is the error message written in words?</li>
        <li>Check that every video on the site has captions.</li>
      </ul>

      <div className="blog-callout">
        <h3>Want a Second Pair of Eyes?</h3>
        <p>
          We hand-code every site with accessibility built in from the first template: real alt text, readable
          contrast, labelled forms and keyboard access, checked with Lighthouse before launch. We will never sell
          you a “compliant” badge. If you would like us to look over your current site before you file, we will
          send you what we find.
        </p>
        <p>
          See our <Link href="/services/website-redesign">website redesign service</Link>, the{' '}
          <Link href="/resources/ontario-law-firm-website-checklist">Ontario law firm website checklist</Link>, or{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </div>
    </div>
  );
};

export const aodaSmallBusinessWebsitePost: BlogPost = {
  slug: 'aoda-small-business-website',
  title: 'Does the AODA Apply to Your Small Business Website? (2026)',
  seoTitle: 'AODA Website Rules for Small Businesses (2026) | Zenara Designs',
  description:
    'Which Ontario businesses must make their website meet WCAG 2.0 AA, who files an accessibility report by December 31, 2026, and what smaller firms should do.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-10-25'),
  tags: ['accessibility', 'AODA', 'Ontario'],
  content: AodaSmallBusinessWebsiteContent,
};
