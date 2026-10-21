import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, PenLine } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import { CONCEPT_DEMOS } from '@/components/industries/ConceptDemoCallout';
import { LSO_RULES_URL } from '@/lib/constants';

// Server Component. A write-up of the legal concept demo (projecttwo), not a
// client case study: the firm, lawyers and reviews on the demo are invented,
// and the page says so above the fold. The "what we'd change" list is the
// honest part — it is what we'd fix before a real firm could publish it under
// the Law Society's marketing rules.

const demo = CONCEPT_DEMOS.lawyers;

const FACTS = [
  { label: 'Type', value: 'Concept build (fictional firm)' },
  { label: 'Practice', value: 'General practice, 6 areas' },
  { label: 'Firm size', value: 'Two partners' },
  { label: 'Pages', value: 'Home, About, Services, Team, Contact' },
];

const BRIEF = [
  'A small general practice serves people with very different problems on the same day: a tenant facing eviction, someone dismissed from their job, a couple separating, a driver with a ticket. Each needs to see, within seconds, that this firm handles their kind of matter.',
  'Most will have been referred or will be comparing two or three firms. Before they call, they want to know who the lawyers are, what the first conversation costs, and what happens next.',
];

const HANDLED = [
  {
    title: 'Practice areas in plain language',
    body: 'Six areas, each described by the problems people actually have ("wrongful dismissal, severance packages, employment contracts") rather than by legal category alone, with the specific matters listed underneath.',
  },
  {
    title: 'Fees on the page',
    body: 'Consultation and hourly ranges are published for each practice area, with HST stated. Most small-firm sites say nothing about cost, which is the most common reason a prospective client never calls.',
  },
  {
    title: 'The lawyers up front',
    body: 'The homepage introduces the two partners and the firm’s history, and each lawyer has a full profile with their year of call and the matters they handle.',
  },
  {
    title: 'One clear next step',
    body: 'Phone number and "Book Consultation" in the header of every page, a consultation request form with the type of matter as a required field, and office hours including Saturday appointments.',
  },
  {
    title: 'Licensing stated',
    body: 'The footer says that legal services are provided by licensed lawyers under the Law Society of Ontario, as rule 4.2-1.1 requires, with a short note that the site is general information and creates no lawyer-client relationship.',
  },
];

const WOULD_CHANGE = [
  {
    title: '"Real Results" in the hero',
    body: 'A tagline promising results risks "raising expectations", one of the examples in the commentary to rule 4.2-1. For a real firm we would replace it with a specific description of who the firm helps and with what.',
  },
  {
    title: '"Specializes in" on the lawyer profiles',
    body: 'Rule 4.3-1 reserves "specialist" for lawyers certified by the Law Society, and wording that suggests certification is risky. We would describe practice focus instead: "her practice focuses on…".',
  },
  {
    title: 'A free consultation in one place, a paid one in another',
    body: 'The homepage offers a free 30-minute consultation while the services page lists an initial consultation fee. A real site needs one consistent offer, both for the client’s sake and because the rules treat offers that differ from what clients actually get as "bait and switch" marketing.',
  },
  {
    title: 'Fees that do not mention disbursements',
    body: 'Rule 4.2-2 requires advertised fees to state whether disbursements and third-party charges are extra, not only HST.',
  },
  {
    title: 'A testimonial',
    body: 'The demo’s About page quotes a placeholder client. A real firm would use only genuine, unedited reviews, without emotional appeals, or leave testimonials out entirely.',
  },
  {
    title: 'An open message box on the intake form',
    body: 'A free-text box invites people to send confidential details before any retainer or conflict check. We would ask for the other parties’ names for the conflict check and a brief description, with a note not to send confidential information yet.',
  },
];

const LawFirmConcept = () => (
  <div className="min-h-screen bg-black relative overflow-hidden">
    <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/projects" className="hover:text-cyan-300 transition-colors">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/70">Law firm concept</li>
          </ol>
        </nav>

        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-cyan-300/80 border border-cyan-500/30 rounded-full px-3 py-1 mb-6 font-medium">
          Concept project · not client work
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6 max-w-4xl">
          <span className="block font-light opacity-90">A Law Firm Website,</span>{' '}
          <span className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">
            Built as a Concept
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed font-light mb-10">
          {demo.name} is a fictional two-partner general practice we designed and built to show how we approach a
          website for a small Ontario law firm. The firm, its lawyers, its phone number and its reviews are invented. The
          structure and the decisions are the ones we would make for a real firm, and below we list what we would change
          before a real firm could publish it.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <a
            href={demo.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="lg:col-span-3 group block rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-colors"
          >
            <div className="aspect-[16/10] relative bg-slate-900">
              <SafeImage
                src="/images/project2.png"
                alt={`The ${demo.name} concept website homepage`}
                className="w-full h-full object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <span className="flex items-center justify-between px-5 py-3 bg-slate-900/90 text-sm text-white/70 group-hover:text-cyan-300 transition-colors">
              View the live concept (opens in a new tab)
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
          <dl className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/10">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-4 p-4 sm:p-5">
                <dt className="text-white/40 text-sm">{fact.label}</dt>
                <dd className="text-white/80 text-sm text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    <section aria-labelledby="the-brief" className="py-16 sm:py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">The Brief</p>
        <h2 id="the-brief" className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
          What a small Ontario general practice needs from its website
        </h2>
        <div className="space-y-5">
          {BRIEF.map((paragraph) => (
            <p key={paragraph} className="text-white/60 text-base sm:text-lg leading-[1.75] font-light">{paragraph}</p>
          ))}
        </div>
      </div>
    </section>

    <section aria-labelledby="how-it-handles-it" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-cyan-900/30 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">The Build</p>
        <h2 id="how-it-handles-it" className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-10">
          How the concept handles it
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HANDLED.map((item) => (
            <li key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="flex items-center gap-2.5 text-base sm:text-lg text-white font-medium mb-2">
                <Check className="h-4 w-4 text-cyan-300 shrink-0" aria-hidden="true" />
                {item.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed font-light">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="what-we-would-change" className="py-16 sm:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">Before a Real Firm Launched It</p>
        <h2 id="what-we-would-change" className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
          What we would change
        </h2>
        <p className="text-white/55 font-light max-w-3xl mb-10">
          A concept can say things a real firm can’t. Before a firm could put its name on this site, we would revise the
          points below against the{' '}
          <a href={LSO_RULES_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300/80 underline decoration-cyan-300/30 underline-offset-4 hover:text-cyan-300">
            Law Society’s marketing rules
          </a>
          .
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
          {WOULD_CHANGE.map((item) => (
            <li key={item.title} className="flex gap-4">
              <PenLine className="h-4 w-4 text-purple-300/80 mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-base sm:text-lg text-white font-medium mb-1.5">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-light">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-5">
          Planning a site for your firm?
        </h2>
        <p className="text-white/60 font-light leading-relaxed mb-8">
          We build websites for small and mid-size Ontario law firms at fixed, published prices, written to the Law
          Society’s rules from the first draft.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/lawyers"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold px-6 py-3 text-sm sm:text-base hover:bg-cyan-100 transition-colors"
          >
            Law firm website design <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/resources/ontario-law-firm-website-checklist"
            className="inline-flex items-center justify-center rounded-full border border-white/20 hover:border-cyan-300 text-white font-semibold px-6 py-3 text-sm sm:text-base transition-colors"
          >
            The Ontario law firm checklist
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default LawFirmConcept;
