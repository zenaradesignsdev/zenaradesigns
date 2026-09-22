// Sub-vertical industry pages — /industries/[slug].
//
// These sit under /industries rather than /lawyers/... on purpose: the catch-all
// redirects in next.config.mjs send every /{hub}/{anything} to its hub, which is
// what closed the doorway-page hole. A page at /lawyers/family-law would be
// 301'd away before it ever rendered.
//
// Each entry must carry content specific to the practice area. If a page here
// could be produced by swapping a noun in another one, it should not exist —
// that is the pattern this site just spent a cleanup removing.

export interface VerticalFaq {
  question: string;
  answer: string;
}

export interface VerticalPoint {
  title: string;
  body: string;
}

export interface IndustryVertical {
  slug: string;
  name: string;
  /** Parent hub this practice area rolls up to. */
  parentHref: string;
  parentLabel: string;
  /** Key into CONCEPT_DEMOS for the matching demo build. */
  demoKey: string;
  demoLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  heroAccent: string;
  heroTail: string;
  intro: string;
  /** What actually decides whether this kind of site works. */
  points: VerticalPoint[];
  /** Concrete build requirements for this practice area. */
  mustHaves: string[];
  faqs: VerticalFaq[];
}

export const industryVerticals: IndustryVertical[] = [
  {
    slug: 'family-law',
    name: 'Family Law',
    parentHref: '/lawyers',
    parentLabel: 'Law firms',
    demoKey: 'lawyers',
    demoLabel: 'law firm',
    metaTitle: 'Family Law Website Design | Markham & GTA | Zenara',
    metaDescription:
      'Websites for family law firms across the GTA. Built for clients researching quietly during a difficult time — discreet, reassuring, and easy to contact.',
    heroLead: 'Website Design for',
    heroAccent: 'Family Law',
    heroTail: 'Firms',
    intro:
      'Family law clients arrive at your website in the middle of the worst year of their life, usually researching alone and often on a phone they share. The site has to do something no other legal vertical asks for: reassure before it sells.',
    points: [
      {
        title: 'The visit is private, and often interrupted',
        body: 'A significant share of family law research happens quietly — late at night, on a shared device, in short sessions. That changes the design brief. Pages need to be scannable in ninety seconds, contact options need to include something less exposing than a phone call, and nothing should linger in a way the visitor cannot control.',
      },
      {
        title: 'Tone carries more weight than credentials',
        body: 'Corporate and litigation clients respond to track record. Family law clients respond to whether you sound like someone who will treat them decently. Copy written in plain language, without adversarial framing or aggressive imagery, converts better here than the same firm’s commercial-practice voice.',
      },
      {
        title: 'The questions are practical, not legal',
        body: 'People search for what happens to the house, how custody is decided, what a separation actually costs, and how long it takes. Firms that answer those questions directly on the site earn the consultation. Firms that publish only practice-area summaries send the visitor back to Google.',
      },
      {
        title: 'Cost transparency is a differentiator',
        body: 'Most family law sites say nothing about fees, so a firm that explains retainer structure, hourly ranges, or what an uncontested matter typically costs stands out immediately — and filters out enquiries that were never going to convert.',
      },
    ],
    mustHaves: [
      'Plain-language pages for separation, divorce, custody, support, and property division',
      'A discreet contact option that is not a phone call',
      'Clear fee and retainer explanation',
      'Lawyer bios that read as human rather than institutional',
      'Fast, quiet mobile experience with no aggressive pop-ups',
      'LegalService structured data and local signals for your city',
    ],
    faqs: [
      {
        question: 'Should a family law site look different from the rest of our firm’s website?',
        answer:
          'If you practise in several areas, the family law section should keep the firm’s identity but soften its voice. The same visual system with warmer imagery, plainer language, and gentler calls to action usually does it. Building an entirely separate brand is rarely worth the cost and splits your search authority.',
      },
      {
        question: 'Do we need to publish our fees?',
        answer:
          'You do not need a price list, and most firms cannot give one honestly. What helps is explaining how you charge — retainer structure, hourly ranges, what drives cost up — so a prospective client can judge whether they can afford to call. Silence on cost is the most common reason people do not.',
      },
      {
        question: 'Is a blog worth it for a family law practice?',
        answer:
          'Only if it answers the questions people actually search. Ten genuinely useful pages on custody arrangements, property division, and the separation process will outperform fifty short posts about legislative updates that nobody outside the profession searches for.',
      },
      {
        question: 'How do we handle client confidentiality in testimonials?',
        answer:
          'Carefully, and often not at all. Family law testimonials risk identifying parties and are restricted in several jurisdictions. Anonymised outcomes, Google reviews the client chose to leave publicly, and clear credentials generally do the trust work without the exposure.',
      },
    ],
  },
  {
    slug: 'real-estate-law',
    name: 'Real Estate Law',
    parentHref: '/lawyers',
    parentLabel: 'Law firms',
    demoKey: 'lawyers',
    demoLabel: 'law firm',
    metaTitle: 'Real Estate Law Website Design | Markham & GTA | Zenara',
    metaDescription:
      'Websites for real estate lawyers across the GTA. Built for a fast, price-sensitive, referral-heavy transaction — clear closing costs and a quick quote path.',
    heroLead: 'Website Design for',
    heroAccent: 'Real Estate',
    heroTail: 'Lawyers',
    intro:
      'Real estate law is the fastest-moving legal transaction most people ever engage in, and the most price-shopped. The website’s job is to answer “what will this cost and can you close on my date” before the visitor calls three other firms.',
    points: [
      {
        title: 'The visitor is comparing, and on a deadline',
        body: 'Someone with a firm closing date is contacting several firms the same afternoon. Whoever answers the cost question clearly and responds fastest usually wins. A site that requires an enquiry just to learn the fee structure loses to one that publishes it.',
      },
      {
        title: 'Closing costs are the entire search',
        body: 'The dominant queries are about what a real estate lawyer charges, what disbursements are, and what land transfer tax will be. A firm that lays out its fee, typical disbursements, and the taxes involved captures search traffic that competitors ignore, and pre-qualifies the caller at the same time.',
      },
      {
        title: 'Referral traffic behaves differently',
        body: 'Much of your volume arrives from agents, brokers, and mortgage professionals rather than search. Those visitors are verifying you are real and responsive before passing your name on. A credible, current site with easy contact details protects the referral relationships you already have.',
      },
      {
        title: 'Volume practice needs intake, not conversation',
        body: 'Purchases, sales, and refinances each need different information up front. A structured intake that captures transaction type, closing date, and property location turns a phone-tag enquiry into a file you can price immediately.',
      },
    ],
    mustHaves: [
      'Published fee structure with typical disbursements explained',
      'Separate paths for purchase, sale, and refinance',
      'Intake capturing transaction type, closing date, and location',
      'A land transfer tax explainer for your region',
      'Fast response commitment stated plainly',
      'Agent and broker referral information in an obvious place',
    ],
    faqs: [
      {
        question: 'Should we publish our closing fee online?',
        answer:
          'In our experience it helps more than it hurts. Real estate legal fees are broadly comparable and clients will price-shop regardless. Publishing the fee, and separating it clearly from disbursements and taxes, captures the search traffic and stops you fielding calls that were only ever about price.',
      },
      {
        question: 'How do we compete with high-volume closing firms?',
        answer:
          'Rarely on price. On responsiveness, on being reachable when something goes wrong close to the deadline, and on being local to the transaction. Those are the differentiators worth building the site around — and worth stating explicitly rather than implying.',
      },
      {
        question: 'Do we need separate pages for purchase, sale, and refinance?',
        answer:
          'Yes. They are genuinely different transactions with different costs, timelines, and questions, and people search for them separately. This is a case where three pages are three real pages, not one page repeated.',
      },
      {
        question: 'How much does search actually matter if most work is referred?',
        answer:
          'Search brings the direct clients, but the site also does quiet work on referrals — an agent checking you out before recommending you, or a client verifying the name they were given. A dated site can cost you referral business you never learn you lost.',
      },
    ],
  },
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    parentHref: '/clinics',
    parentLabel: 'Clinics & wellness',
    demoKey: 'clinics',
    demoLabel: 'clinic',
    metaTitle: 'Physiotherapy Website Design | Markham & GTA | Zenara',
    metaDescription:
      'Websites for physiotherapy clinics across the GTA. Online booking, condition pages, practitioner profiles, and the insurance answers patients look for first.',
    heroLead: 'Website Design for',
    heroAccent: 'Physiotherapy',
    heroTail: 'Clinics',
    intro:
      'Physiotherapy patients search by their injury, not by your clinic name. They want to know you treat their specific problem, whether their insurance covers it, and whether they can book without phoning during working hours.',
    points: [
      {
        title: 'People search the condition, not the service',
        body: 'The traffic is in “sciatica treatment”, “rotator cuff physio”, “post-surgery knee rehab” — not in “physiotherapy clinic”. A clinic with real pages for the conditions it actually treats reaches patients at the moment they are looking, and demonstrates expertise at the same time.',
      },
      {
        title: 'Insurance is the second question, always',
        body: 'Direct billing, which insurers you work with, and whether a doctor’s referral is needed decide whether someone books or keeps looking. This information is usually buried on a FAQ page or missing entirely, and it costs clinics bookings every week.',
      },
      {
        title: 'Booking has to work outside business hours',
        body: 'Most people look for a physiotherapist in the evening, in pain, after the clinic has closed. If booking means calling tomorrow, a meaningful share of those patients book with whoever offered an online slot instead.',
      },
      {
        title: 'Patients choose a practitioner, not a building',
        body: 'Physiotherapy is a relationship over multiple visits. Real profiles — credentials, special interests, a photograph that looks like a person rather than a stock image — convert better than a generic team page, and help returning patients rebook with the same therapist.',
      },
    ],
    mustHaves: [
      'Condition pages for what you genuinely treat',
      'Online booking that works on a phone at 10pm',
      'Direct billing and insurer information stated up front',
      'Individual practitioner profiles with credentials',
      'Clear first-visit expectations, including what to wear and bring',
      'MedicalBusiness structured data and local signals for your city',
    ],
    faqs: [
      {
        question: 'How many condition pages should we build?',
        answer:
          'Start with the five or six conditions that make up most of your caseload and write them properly — assessment approach, typical treatment plan, realistic timelines. Thirty thin condition pages built from a template is the pattern search engines have gotten good at ignoring.',
      },
      {
        question: 'Which booking system do you integrate with?',
        answer:
          'We work with what you already use — Jane, Cliniko, Practice Better and similar all embed cleanly. If you have not chosen one yet we will talk through the trade-offs, but we would not recommend switching practice management software just for the website.',
      },
      {
        question: 'Can we show patient testimonials?',
        answer:
          'With care. Health testimonials are regulated by your professional college, and rules vary by discipline and province. Google reviews the patient chose to leave publicly are generally safer than solicited written testimonials — we will build to whatever your college permits.',
      },
      {
        question: 'Do we need a separate page for each practitioner?',
        answer:
          'For a clinic with three or more therapists, yes. Practitioners have their own reputations and are often searched by name, particularly by patients following someone from a previous clinic. Individual pages capture that traffic; a combined team page does not.',
      },
    ],
  },
  {
    slug: 'dental',
    name: 'Dental',
    parentHref: '/clinics',
    parentLabel: 'Clinics & wellness',
    demoKey: 'clinics',
    demoLabel: 'clinic',
    metaTitle: 'Dental Website Design | Markham & GTA | Zenara',
    metaDescription:
      'Websites for dental practices across the GTA. New-patient booking, treatment pages, insurance and financing clarity, and an anxious-patient path that converts.',
    heroLead: 'Website Design for',
    heroAccent: 'Dental',
    heroTail: 'Practices',
    intro:
      'Dentistry is one of the most competitive local search categories there is, and the highest-value patients — new families, and anyone considering elective treatment — decide on your website before they ever call.',
    points: [
      {
        title: 'New patients are the entire economic case',
        body: 'An existing patient rebooks by phone. The website exists almost entirely to convert new patients, so the new-patient path deserves more design attention than everything else combined: what the first visit costs, what happens in it, and how to book without speaking to anyone.',
      },
      {
        title: 'Anxiety is the biggest single objection',
        body: 'A large share of adults delay dental care out of fear, and they are actively looking for signals that a practice will handle it well. Sedation options, gentle-care language, and a clear explanation of what happens in a first appointment convert a group your competitors are ignoring.',
      },
      {
        title: 'Elective treatment is researched like a purchase',
        body: 'Implants, orthodontics, and cosmetic work involve significant sums and weeks of comparison. Those pages need genuine depth — process, timeline, financing, and real before-and-after imagery where your college permits it — rather than a paragraph and a booking button.',
      },
      {
        title: 'Insurance and financing decide the booking',
        body: 'Whether you direct bill, which plans you accept, and whether payment plans exist are among the most-visited pieces of information on any dental site. Making them easy to find removes the most common reason someone closes the tab.',
      },
    ],
    mustHaves: [
      'A dedicated new-patient page with costs and first-visit detail',
      'Online booking with new-patient and emergency paths separated',
      'Treatment pages with real depth for elective procedures',
      'Insurance, direct billing, and financing stated clearly',
      'An anxious-patient page addressing fear directly',
      'Dentist structured data, local signals, and current review visibility',
    ],
    faqs: [
      {
        question: 'Can we show before-and-after photos?',
        answer:
          'Usually yes, with consent and within your regulator’s advertising rules — which differ by province on whether results can be described as typical. We will build the gallery so it can carry the disclaimers your college requires without looking like a legal notice.',
      },
      {
        question: 'How important are Google reviews for a dental practice?',
        answer:
          'Very. Dentistry is one of the most review-driven local categories, and the map pack is where most new-patient searches resolve. The website supports that — consistent business information, strong local signals, and visible reviews — but the profile itself needs active work you do outside the site.',
      },
      {
        question: 'Should we build pages for every treatment we offer?',
        answer:
          'No. Build depth on the treatments that drive revenue and get researched — implants, orthodontics, cosmetic work — and cover routine services in a single well-organised page. A thin page per procedure is the pattern that stops getting indexed.',
      },
      {
        question: 'Do we need emergency appointment content?',
        answer:
          'If you take emergencies, it is one of the highest-intent pages you can have. Someone searching for an emergency dentist books within the hour. That page needs to load instantly, state your availability, and put a phone number where a thumb already is.',
      },
    ],
  },
];

export const industryVerticalSlugs = industryVerticals.map((v) => v.slug);

export function getIndustryVertical(slug: string): IndustryVertical | undefined {
  return industryVerticals.find((v) => v.slug === slug);
}
