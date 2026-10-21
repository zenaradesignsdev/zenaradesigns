import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogHeroBackdrop } from '@/components/Blog/BlogHeroBackdrop';
import { ExternalLink } from '@/components/Blog/ExternalLink';
import { LSO_RULES_URL } from '@/lib/constants';

// Server Component. A standing resource rather than a dated blog post: the
// sources it cites (Law Society rules, AODA, PIPEDA) were checked on the date
// in CHECKLIST_REVIEWED, which is also the schema's dateModified. Re-check the
// sources before bumping it.
export const CHECKLIST_REVIEWED = '2026-10-20';

// Pete Nuij, unsplash.com/photos/MNIaox8_zmI (Unsplash License).
export const CHECKLIST_IMAGE = '/images/osgoode-hall-law-society-of-ontario.jpg';
export const CHECKLIST_IMAGE_ALT = 'The front of Osgoode Hall on Queen Street West in Toronto, home of the Law Society of Ontario';

const SOURCES = {
  lsoConfidentiality: 'https://lso.ca/about-lso/legislation-and-rules/rules-of-professional-conduct/chapter-3',
  lsoDirectory: 'https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory',
  aoda: 'https://www.ontario.ca/page/how-make-websites-accessible',
  pipeda:
    'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/',
};

interface ChecklistSection {
  id: string;
  title: string;
  intro: ReactNode;
  items: ReactNode[];
}

const SECTIONS: ChecklistSection[] = [
  {
    id: 'law-society-marketing-rules',
    title: 'Law Society marketing rules',
    intro: (
      <>
        A law firm website is marketing, so{' '}
        <ExternalLink href={LSO_RULES_URL}>chapter 4 of the Rules of Professional Conduct</ExternalLink> applies to
        every page. Check each one against these points.
      </>
    ),
    items: [
      'Every claim is demonstrably true, accurate and verifiable, and nothing is likely to mislead (rule 4.2-1).',
      'No one is described as a “specialist”, “expert in” or similar unless certified as a specialist by the Law Society (rule 4.3-1).',
      'Any amount recovered or success rate is accompanied by a statement that past results are not necessarily indicative of future results and that outcomes vary with the facts of each case (4.2-1 commentary).',
      'Nothing suggests the firm is better than other lawyers, raises expectations, or describes the firm as aggressive (4.2-1 commentary).',
      'Testimonials don’t contain emotional appeals, and any award, ranking or endorsement is bona fide, not paid for, and the result of a reasonable evaluation (4.2-1 commentary).',
      'The site states that services are provided by licensed lawyers, and says clearly if any are provided by paralegals (rule 4.2-1.1).',
      'Any published fee says exactly what it covers and whether disbursements, third-party charges and HST are extra (rule 4.2-2). Residential real estate prices follow the stricter rule 4.2-2.1.',
      'There is no marketing of “second opinion” services (rule 4.2-1.2).',
    ],
  },
  {
    id: 'confidentiality-and-intake',
    title: 'Confidentiality and intake',
    intro: 'The contact form is often the first exchange with a prospective client. Design it so nothing confidential arrives before you are ready for it.',
    items: [
      'The consultation form asks only what you need to respond and run a conflict check: name, contact details, type of matter and the other parties’ names.',
      'A short notice beside the form says that submitting it does not create a lawyer-client relationship, and asks people not to send confidential details yet.',
      'Form submissions travel over HTTPS and go to an inbox only the right people can read.',
      'Replies to online reviews never confirm that the reviewer was a client or mention their matter (rule 3.3-1 requires strict confidence about a client’s affairs).',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    intro: (
      <>
        Ontario has no general private-sector privacy law of its own, so a firm’s commercial activities are covered
        by the federal <ExternalLink href={SOURCES.pipeda}>PIPEDA</ExternalLink>.
      </>
    ),
    items: [
      'A privacy policy explains what personal information the site collects, why, how long it is kept and who to contact about it.',
      'Analytics and any advertising pixels are disclosed in the privacy policy, and nothing is collected that the firm doesn’t use.',
      'The form only collects what the privacy policy says it collects.',
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    intro: (
      <>
        Under the AODA, Ontario organizations with 50 or more employees must make their public websites meet{' '}
        <ExternalLink href={SOURCES.aoda}>WCAG 2.0 Level AA</ExternalLink>. For smaller firms it is not required, but
        it is good practice, and clients with disabilities need legal services too.
      </>
    ),
    items: [
      'Text has enough contrast against its background, and the site is usable at 200% zoom.',
      'Every image that carries meaning has alt text; decorative images don’t.',
      'The whole site, including the menu and the contact form, works with a keyboard alone.',
      'Form fields have visible labels, and error messages say what to fix.',
      'Videos have captions.',
    ],
  },
  {
    id: 'content-clients-look-for',
    title: 'Content clients look for',
    intro: 'These are the questions a prospective client is trying to answer before they call.',
    items: [
      'Each major practice area has its own page explaining who it is for, how the process works and how fees are structured.',
      'Each lawyer has a profile with a real photo, year of call, practice focus and languages spoken.',
      'The site explains what happens at the first consultation, how long it takes and what it costs.',
      'Office address, hours, parking or transit, and accessibility of the office are easy to find.',
      'Phone number and consultation request are visible on every page, including on mobile.',
    ],
  },
  {
    id: 'search-and-local',
    title: 'Search and local listings',
    intro: 'The basics that decide whether the site is found at all.',
    items: [
      'Every page has a unique title naming the practice area and, where it helps, the city.',
      'The firm name, address and phone number match exactly across the website, Google Business Profile and directories.',
      <>
        Each lawyer’s listing in the{' '}
        <ExternalLink href={SOURCES.lsoDirectory}>Law Society’s Lawyer and Paralegal Directory</ExternalLink> is
        current.
      </>,
      'LegalService structured data describes the firm, its address and its practice areas.',
      'The site is verified in Google Search Console with a sitemap submitted.',
      'Pages load quickly on a phone.',
    ],
  },
];

const LawFirmChecklist = () => (
  <div className="min-h-screen bg-black">
    <section className="relative overflow-clip pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
      <BlogHeroBackdrop />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <article>
          <header className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
                <li>
                  <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-white/20">/</li>
                <li>
                  <Link href="/lawyers" className="text-white/40 hover:text-white transition-colors">Law firm web design</Link>
                </li>
                <li aria-hidden="true" className="text-white/20">/</li>
                <li className="text-cyan-300/70">Checklist</li>
              </ol>
            </nav>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.08] tracking-[-0.04em]">
              Ontario Law Firm Website Checklist
            </h1>
            <p className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed">
              What to check before an Ontario law firm website goes live: the Law Society’s marketing rules,
              confidentiality, privacy, accessibility, and the content and search basics clients and Google look for.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/40">
              Sources last checked <time dateTime={CHECKLIST_REVIEWED}>October 20, 2026</time>
            </p>
          </header>

          <div className="relative mt-10 sm:mt-14 aspect-[16/9] sm:aspect-[21/8] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <Image
              src={CHECKLIST_IMAGE}
              alt={CHECKLIST_IMAGE_ALT}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15rem] gap-12 xl:gap-20">
            <div className="blog-prose min-w-0 max-w-[42rem]">
              <div>
                <p>
                  This is the list we work from when we build a law firm website. It is written for small and mid-size firms
                  reviewing a new or existing website, and it is a practical summary rather than legal advice: the
                  Law Society’s current rules and commentary are the authority, and your firm makes the final call
                  on what its website says.
                </p>
                {SECTIONS.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2 id={section.id}>{section.title}</h2>
                    <p>{section.intro}</p>
                    <ul>
                      {section.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
                <div className="blog-callout">
                  <h3>Want a Second Pair of Eyes?</h3>
                  <p>
                    We build law firm websites with this checklist in from the first draft, at fixed, published prices.
                  </p>
                  <p>
                    See our <Link href="/lawyers">law firm website design</Link>, read{' '}
                    <Link href="/blog/ontario-law-firm-website-content">what an Ontario law firm website should say</Link>, or{' '}
                    <Link href="/contact">get in touch</Link>.
                  </p>
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">On this page</p>
                <ol className="space-y-2.5 text-sm">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="text-white/55 hover:text-cyan-300 transition-colors">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/blog/law-firm-seo-toronto"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm text-cyan-300/80 hover:text-cyan-300 transition-colors group"
                >
                  Law firm SEO guide
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </nav>
            </aside>
          </div>
        </article>
      </div>
    </section>
  </div>
);

export default LawFirmChecklist;
