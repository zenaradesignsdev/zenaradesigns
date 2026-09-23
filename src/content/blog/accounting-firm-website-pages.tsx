import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

const GOOGLE_FAQ_DOCS = 'https://developers.google.com/search/docs/appearance/structured-data/faqpage';

const AccountingFirmWebsitePagesContent = () => {
  return (
    <div>
      <p>
        Tax season has a way of exposing how a website is put together. For most of the year an accounting
        firm’s site can coast. Then the busy season arrives and the same site is suddenly doing several jobs
        at once.
      </p>
      <ul>
        <li>New prospects are trying to work out whether you handle what they need.</li>
        <li>Existing clients are hunting for the portal link, or for instructions on what to send and how.</li>
        <li>
          People want to know whether you do corporate returns, personal returns, bookkeeping, payroll or
          advisory, or only some of those.
        </li>
        <li>Your front desk is answering the same questions by phone that the website could have answered.</li>
      </ul>
      <p>
        None of that is fixed by a new colour scheme. It is fixed by having the right pages, each with one
        clear job. These are the seven we would make sure an accounting firm website has, ideally sorted out
        in the quieter months, because nobody has time to rewrite service pages in the middle of the rush.
      </p>

      <h2 id="homepage-who-you-work-with">1. A Homepage That Explains Who You Actually Work With</h2>
      <p>Most accounting homepages open with a line like this:</p>
      <blockquote>
        <p>Professional accounting services for individuals and businesses.</p>
      </blockquote>
      <p>
        It’s accurate. It is also true of nearly every firm in the province, so it gives a visitor no way to
        tell whether you’re the right fit. Compare it with either of these:
      </p>
      <blockquote>
        <p>
          CPA firm helping owner-managed businesses in Markham with corporate tax, bookkeeping and year-round
          advisory.
        </p>
      </blockquote>
      <blockquote>
        <p>
          Personal and corporate tax services for professionals, consultants and incorporated small businesses
          across the GTA.
        </p>
      </blockquote>
      <p>
        Neither is clever. Both tell the reader, in one sentence, who the firm is for and what it does most.
        That is the job of the opening section. Within a few seconds a visitor should know:
      </p>
      <ul>
        <li>Who you work with</li>
        <li>Your most important services</li>
        <li>Where you work, if location matters to your clients</li>
        <li>What to do next: book a consultation, call, or sign in to the client portal</li>
      </ul>
      <p>
        This doesn’t mean every firm needs a narrow niche. If your practice genuinely serves a broad mix of
        individuals and small businesses, say that plainly and let the service pages do the sorting. The aim
        is an accurate description of the firm, not a positioning exercise that doesn’t match your client
        list.
      </p>
      <p>
        Remember that returning clients land on the homepage too, usually looking for one thing. A visible
        “Client login” in the main navigation saves them a search and saves your staff a phone call.
      </p>

      <h2 id="dedicated-service-pages">2. Dedicated Pages for Important Service Lines</h2>
      <p>
        A single Services page with a paragraph each for corporate tax, personal tax, bookkeeping, payroll and
        advisory is common. It is also where many prospects get stuck, because their questions are specific
        to one service, and a paragraph can’t answer them.
      </p>
      <p>Separate pages let each service answer its own questions:</p>
      <ul>
        <li>
          <strong>Bookkeeping:</strong> how often the books are done (monthly or quarterly), which software you
          work in, what reports the client receives and when, whether payroll runs alongside it, and how
          receipts and statements get to you.
        </li>
        <li>
          <strong>Corporate tax:</strong> the kinds of corporations you typically serve, such as owner-managed
          operating companies, holding companies or professional corporations, how year-end work is scheduled,
          what the client needs to provide, and how it connects to their bookkeeping.
        </li>
        <li>
          <strong>Personal tax:</strong> who it suits (employees, the self-employed, landlords, shareholders
          whose corporation you also look after) and how documents are collected each year.
        </li>
        <li>
          <strong>Payroll:</strong> pay frequencies you support, what the client does and what you do, and how
          new hires and changes are communicated.
        </li>
        <li>
          <strong>Advisory:</strong> decisions, not filings. Forecasting, cash flow, management reporting,
          pricing, planning for growth or a sale. This page should read differently from the compliance
          pages, because the person reading it is asking a different question.
        </li>
        <li>
          <strong>Virtual CFO or fractional finance:</strong> only if you actually offer it, with a clear
          description of what a month of that service includes.
        </li>
      </ul>
      <p>
        Not every service needs the same depth. The services you actively want more of deserve the most
        thorough pages. Services listed mainly for completeness can share a page without anyone minding.
      </p>
      <p>
        There is a search benefit here too. A page dedicated to corporate tax gives Google something specific
        to match against a search like “corporate tax accountant Markham”, which a general services page
        rarely does. That is the foundation of{' '}
        <Link href="/services/seo">local SEO</Link> for an accounting firm, well before any blog posts or
        directory listings.
      </p>

      <h2 id="team-page">3. A Proper Team Page</h2>
      <p>
        Clients hand their accountant financial statements, payroll records, tax slips and sometimes details
        about their family. Before they do, most want to know who will actually be looking at them. A team page
        with names and job titles only doesn’t answer that.
      </p>
      <p>Useful profile information includes:</p>
      <ul>
        <li>Professional designations the person actually holds, such as CPA</li>
        <li>Their role in the firm: partner, manager, senior accountant, bookkeeper</li>
        <li>Areas of focus and relevant experience</li>
        <li>Industries they commonly work with</li>
        <li>Software certifications, where clients care about them</li>
        <li>Languages spoken</li>
        <li>A current, professional photo</li>
      </ul>
      <p>
        Industry experience is worth stating when it’s real. If one of your accountants has spent years
        working with construction companies, physicians’ professional corporations or real estate investors,
        saying so helps the right prospect pick up the phone. Listing industries just because people search
        for them is a different thing, and it tends to unravel in the first meeting.
      </p>
      <p>
        Include the people clients deal with most, not only the partners. The bookkeeper or administrator who
        answers the portal questions every spring is often the person a client talks to more than anyone else.
      </p>

      <h2 id="client-portal-page">4. A Client Portal Page</h2>
      <p>
        This one is for the clients you already have, and it is surprisingly often missing. Many firms use a
        secure portal or practice-management platform for exchanging documents. A client gets an invitation
        once, then has to find the link again a year later. If the only route back is an old email, your phone
        line becomes the portal help desk.
      </p>
      <p>Give it a permanent place in the navigation and a simple page that covers:</p>
      <ul>
        <li>The sign-in link</li>
        <li>What clients use the portal for: uploading documents, downloading returns, anything else your platform handles</li>
        <li>Basic upload guidance, such as accepted file types and how to name files</li>
        <li>How to get access for the first time, or recover it</li>
        <li>Who to contact for technical or account help, and when they’re available</li>
      </ul>
      <p>
        The page should also say plainly what not to do. Tax slips, bank statements, payroll records and
        identification belong in the firm’s secure platform, not in email attachments and not in the website’s
        contact form. An ordinary website form is built to receive enquiries. It is the wrong place for
        financial records, so don’t add document uploads or a Social Insurance Number field to it.
      </p>

      <h2 id="who-we-work-with">5. A “Who We Work With” Page</h2>
      <p>
        Some firms genuinely do a lot of work with particular kinds of clients: incorporated consultants,
        construction businesses, healthcare professionals, real estate investors, restaurants, professional
        services firms or e-commerce sellers.
      </p>
      <p>
        Where that experience is real, a page about it is useful. A construction company owner wants to know
        whether you understand job costing and how their projects are billed. A physician wants to know
        whether you already work with professional corporations. A restaurant owner may care most about how
        you handle point-of-sale data and payroll with variable hours. A page that speaks to those specifics
        tells the right client they’ve found a firm that has seen their situation before. It also helps search
        engines understand what the firm is known for.
      </p>
      <p>
        The line to hold is between real specialization and pages made up for search. A firm should not
        publish thirty thin industry pages, each saying “we understand the unique needs of your industry”
        with the industry name swapped, just because thirty keywords exist. Those pages don’t help anyone,
        and they make the genuine ones harder to believe.
      </p>
      <p>
        A sensible structure for most firms is one “Who we work with” page that lists your main client types
        honestly, plus a dedicated page only for the one or two where you have real depth.
      </p>

      <h2 id="faq-from-real-questions">6. An FAQ Based on Real Client Questions</h2>
      <p>
        The best source for an FAQ isn’t a keyword tool. It is the people answering your phone and inbox. Ask
        reception, admin staff and the accountants one question: what do prospects and clients ask
        constantly? You will probably hear things like:
      </p>
      <ul>
        <li>Do you accept new clients partway through the year?</li>
        <li>Do you work with QuickBooks Online?</li>
        <li>Can you handle both my corporation and my personal return?</li>
        <li>Do you work virtually?</li>
        <li>How do I send you documents?</li>
        <li>What happens during the first consultation?</li>
        <li>Do you do bookkeeping monthly or quarterly?</li>
        <li>Do you work with businesses outside your city?</li>
      </ul>
      <p>
        Every question answered on the site is one fewer call during your busiest weeks. These questions also
        match the way people phrase searches, so honest answers tend to pick up useful, specific search
        traffic without anyone trying to engineer it. Answer them properly. If the answer is “it depends”,
        say what it depends on.
      </p>
      <p>
        Service-specific questions can sit on the relevant service page, with a general FAQ for everything
        else. You can add FAQ structured data, but don’t expect it to change how you appear in results.
        Google’s <ExternalLink href={GOOGLE_FAQ_DOCS}>FAQ documentation</ExternalLink> says those rich
        results are only shown for well-known, authoritative government and health websites. The value of an
        FAQ is for the people reading it.
      </p>

      <h2 id="contact-page-that-routes">7. A Contact Page That Routes Inquiries Properly</h2>
      <p>
        A form that only asks for a name, an email address and a message means someone has to read every
        submission to work out who it’s for. During tax season, that person is busy.
      </p>
      <p>One extra field fixes most of it. Ask what the enquiry is about:</p>
      <ul>
        <li>Personal tax</li>
        <li>Corporate tax</li>
        <li>Bookkeeping</li>
        <li>Payroll</li>
        <li>Advisory</li>
        <li>Existing client support</li>
        <li>Something else</li>
      </ul>
      <p>
        Now enquiries can go straight to the right person, and existing clients with a portal problem don’t
        land in a partner’s inbox. Keep the rest of the form short: name, email, phone if they prefer a call,
        the enquiry type and a brief message.
      </p>
      <p>
        The first form should collect enough to route the enquiry and nothing more. It is not the place for
        someone’s income, their SIN or their year-end statements. Once there is a real conversation, sensitive
        information moves into the firm’s secure process. A one-line note under the form asking people not to
        include financial details makes that clear.
      </p>
      <p>
        Round the page out with a phone number that can be tapped on mobile, an email address, the office
        address and parking or transit notes, whether you meet virtually, and your hours, including any
        seasonal changes.
      </p>

      <h2 id="what-about-a-blog">What About a Blog?</h2>
      <p>
        Publishing articles can help, but only once the pages above are in good shape. Another post called
        “5 Tax Tips for Small Businesses” won’t fix a website where prospects can’t tell what services the firm
        offers or existing clients can’t find the portal.
      </p>
      <p>
        When you do write, answer questions your clients actually ask. For example:
      </p>
      <ul>
        <li>What records should an incorporated consultant keep each month?</li>
        <li>What should a business prepare before switching accountants?</li>
        <li>Bookkeeping versus year-end accounting: what is the difference?</li>
        <li>What does an accountant typically need before a corporate year-end?</li>
      </ul>
      <p>
        Articles like these should be written or reviewed by the accountants themselves. If one mentions rates,
        thresholds or deadlines, link to the Canada Revenue Agency as the source and review it every year.
      </p>

      <h2 id="accounting-firm-website-checklist">Accounting Firm Website Checklist</h2>
      <ul className="blog-checklist">
        <li>The homepage clearly explains who the firm serves.</li>
        <li>The main revenue-driving services have their own pages.</li>
        <li>Team members and their credentials are visible.</li>
        <li>Returning clients can find the portal in one click.</li>
        <li>The contact form routes enquiries by type.</li>
        <li>No ordinary web form asks for financial documents or a SIN.</li>
        <li>Client industries are explained only where there is genuine experience.</li>
        <li>The FAQ answers questions clients really ask.</li>
        <li>Phone, email and location are easy to find.</li>
        <li>The site is straightforward to use on a phone.</li>
        <li>Every major page has an obvious next step.</li>
      </ul>

      <div className="blog-callout">
        <h3>Does Your Accounting Website Need a Cleanup?</h3>
        <p>
          Zenara Designs builds websites for accountants, CPA firms, bookkeepers and professional service
          businesses across the GTA.
        </p>
        <p>
          If your current website has grown into a collection of disconnected service pages, we can help
          reorganize it around the way prospective clients actually search, compare firms and get in touch.
          Explore our <Link href="/accountants">accounting firm web design</Link> services or{' '}
          <Link href="/contact">talk to our team</Link> about your current website.
        </p>
      </div>
    </div>
  );
};

export const accountingFirmWebsitePagesPost: BlogPost = {
  slug: 'accounting-firm-website-pages',
  title: '7 Pages an Accounting Firm Website Needs Before Tax Season',
  seoTitle: '7 Pages an Accounting Firm Website Needs | Zenara Designs',
  description:
    'A practical website structure for CPA firms, bookkeepers and tax practices. See the pages that help accounting firms build trust and turn searches into consultations.',
  excerpt:
    'Tax season exposes weak website structure: prospects who can’t tell what you do, clients who can’t find the portal, and staff answering the same questions. These are the seven pages that fix it.',
  featuredImageAlt:
    'Wireframe of a fictional accounting firm website, with navigation for corporate tax, bookkeeping, advisory, team, client portal and contact.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-09-23'),
  tags: ['industry guides', 'accounting firms', 'web design'],
  content: AccountingFirmWebsitePagesContent,
};
