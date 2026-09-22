// Industry hub page FAQ content — single source of truth.
//
// Plain module (no 'use client') so it can be imported by both the client hub
// components (FAQ rendering) and the server route files (server-rendered
// FAQPage + Breadcrumb JSON-LD). Schema builders live in service-content.ts and
// are reused by the hub route files. See SEO-RANKING-PLAN.md §8.1.

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryEntry {
  path: string;
  breadcrumbLabel: string;
  faqs: IndustryFaq[];
}

export const lawyersFaqs: IndustryFaq[] = [
  {
    question: "How does a bad website cost my law firm business?",
    answer: "An outdated, template, or poorly designed website quietly costs law firms real business — visitors who arrive, don't find what they need, and leave for a competitor with a more professional online presence. That means missed consultation requests, clients who choose someone else, and weaker referral conversion. A professional, well-designed website is built to keep visitors engaged and turn more of them into consultation requests."
  },
  {
    question: "Why is website design so important for trust and credibility?",
    answer: "Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a business's credibility based on website design. With 78% of people researching lawyers online (and 92% among younger demographics), your website is often the first interaction potential clients have with your firm. Professional design signals competence, attention to detail, and technological capability—all critical factors when clients are choosing between multiple law firms."
  },
  {
    question: "How much does a professional law firm website cost in Ontario?",
    answer: "A custom, professional website for an Ontario law firm typically ranges from $4,000 to $10,000, depending on features like consultation booking systems, practice area pages, case study sections, blog functionality, and attorney profile pages. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
  },
  {
    question: "How long does it take to build a lawyer's website?",
    answer: "A complete custom law firm website usually takes 2 to 3 weeks from kickoff to launch. Larger builds with custom functionality run 3 to 4 weeks. That timeline includes competitive analysis, custom design focused on trust and credibility, development of essential features, and SEO optimization to ensure your firm ranks for local searches."
  },
  {
    question: "What features are essential for a law firm website in 2026?",
    answer: "Essential features include consultation booking systems, SEO-optimized practice area showcase pages, case studies and success stories, legal blog and content marketing capabilities, attorney profiles and team pages, and client testimonials and reviews. These features build trust, demonstrate expertise, and convert visitors into consultations."
  },
  {
    question: "Do law firms in GTA suburbs need local SEO?",
    answer: "Absolutely. With 68% of users performing local searches before contacting a law firm, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham family lawyer' or 'Vaughan real estate attorney' is essential for capturing ready-to-consult prospects."
  },
  {
    question: "Can a new website help my law firm get more clients?",
    answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 client acquisition engine. Law firms with authoritative content, clear practice area pages, case studies, and optimized call-to-action triggers see a significant increase in consultation requests compared to firms with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting visitors into clients."
  },
  {
    question: "Why is Next.js better than WordPress for a law firm?",
    answer: "For legal services, Next.js offers faster load times for better user experience, superior Core Web Vitals that Google rewards with higher rankings, and a more modern, professional foundation. Next.js provides better performance, which is critical for building trust and credibility with potential clients who expect fast, responsive websites."
  },
  {
    question: "Can I update my law firm website content myself?",
    answer: "Yes. Zenara Designs integrates an intuitive, no-code backend that allows your staff to easily update practice area descriptions, publish blog articles, manage attorney bios, add case studies, update testimonials, and modify consultation availability without technical expertise."
  }
];

export const accountantsFaqs: IndustryFaq[] = [
  {
    question: "How does a bad website cost my accounting firm business?",
    answer: "An outdated or poorly designed website quietly costs accounting firms real business — visitors, including high-net-worth prospects, who arrive, don't feel confident in your firm, and leave for a more polished competitor. That means missed advisory discovery calls, weaker referral conversion, and lost opportunity. A professional, well-designed website is built to build that confidence and turn more visitors into consultation requests."
  },
  {
    question: "Why is website design so important for accounting firm trust and credibility?",
    answer: "When dealing with people's money and business finances, trust is everything. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a business's credibility based on website design. With 74% of business owners researching accounting firms online (and 89% among millennial and Gen Z entrepreneurs), your website is often the first interaction potential clients have with your firm. Professional design signals competence, attention to detail, and modern data-security capabilities."
  },
  {
    question: "How much does a professional accounting firm website cost in Ontario?",
    answer: "A custom, professional website for an Ontario accounting firm typically ranges from $4,000 to $10,000, depending on features like client portals, tax document management systems, service area pages, blog functionality, and CPA profile pages. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
  },
  {
    question: "How long does it take to build an accounting firm's website?",
    answer: "A complete custom accounting firm website usually takes 2 to 3 weeks from kickoff to launch. Larger builds with client portals or custom integrations run 3 to 4 weeks. That timeline includes competitive analysis, custom design focused on trust and security, development of essential features, and SEO optimization to ensure your firm ranks for local searches."
  },
  {
    question: "What features are essential for an accounting firm website in 2026?",
    answer: "Essential features include discovery and consultation booking systems, SEO-optimized service area showcase pages, ROI case studies and success stories, financial blog and tax updates, CPA profiles and team pages, and client testimonials with trust signals. These features build trust, demonstrate expertise, and convert visitors into advisory consultations."
  },
  {
    question: "Do accounting firms in GTA suburbs need local SEO?",
    answer: "Absolutely. With the majority of business owners performing local searches before contacting an accounting firm, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham CPA' or 'Vaughan tax preparation' is essential for capturing ready-to-consult prospects."
  },
  {
    question: "Can a new website help my accounting firm get more clients?",
    answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 client acquisition engine. Accounting firms with authoritative content, clear service area pages, case studies, and optimized call-to-action triggers see a significant increase in consultation requests compared to firms with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting visitors into long-term clients."
  }
];

export const clinicsFaqs: IndustryFaq[] = [
  {
    question: "How does a bad website cost my wellness clinic business?",
    answer: "An outdated or hard-to-use website quietly costs clinics new patients — visitors who arrive, struggle to find information or book an appointment, and leave for a clinic that makes it easier. That means missed initial assessments, weaker patient retention, and lost referral revenue. A professional, well-designed website with integrated booking is built to convert more visitors into appointment requests."
  },
  {
    question: "Why is website design so important for wellness clinic trust and credibility?",
    answer: "In healthcare, the stakes are higher. Patients aren't just looking for a service; they are looking for a provider they can trust with their physical well-being. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a clinic's credibility based on website design. If your website looks neglected, patients subconsciously assume your clinic's hygiene or technology might be as well. A clean, modern, and accessible website signals that you are organized, professional, and up-to-date with modern health practices."
  },
  {
    question: "How much does a professional wellness clinic website cost in Ontario?",
    answer: "A custom, professional website for an Ontario wellness clinic typically ranges from $4,000 to $10,000, depending on features like booking integration (Jane App, Gorendezvous, Cliniko), practitioner bio pages, condition-specific SEO pages, HIPAA/PHIPA compliant forms, and patient education content. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
  },
  {
    question: "How long does it take to build a wellness clinic's website?",
    answer: "A complete custom wellness clinic website usually takes 2 to 3 weeks from kickoff to launch. Larger builds with booking integrations run 3 to 4 weeks. That timeline includes competitive analysis, custom design focused on clinical authority and patient trust, development of essential features, and SEO optimization to ensure your clinic ranks for local searches."
  },
  {
    question: "What features are essential for a wellness clinic website in 2026?",
    answer: "Essential features include seamless booking integration with platforms like Jane App or Gorendezvous, practitioner portfolios and bios, condition-specific SEO pages, HIPAA/PHIPA compliant lead forms, 'Near Me' local SEO engine, and patient education and video content. These features build trust, establish clinical authority, and convert visitors into confirmed appointments."
  },
  {
    question: "Do wellness clinics in GTA suburbs need local SEO?",
    answer: "Absolutely. With 77% of patients using search engines to find a healthcare provider before booking, local SEO is critical for acquiring patients. Appearing in Google Map Pack for city-specific terms like 'Markham physiotherapy' or 'Vaughan massage therapy' is essential for capturing ready-to-book patients searching for wellness services."
  },
  {
    question: "Can a new website help my wellness clinic get more patients?",
    answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 patient intake system. Wellness clinics with seamless booking integration, condition-specific SEO pages, practitioner bios, and optimized call-to-action triggers see a significant increase in appointment requests compared to clinics with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting health-conscious browsers into confirmed appointments."
  }
];

export const renovationsFaqs: IndustryFaq[] = [
  {
    question: "How does a bad website cost my renovation company business?",
    answer: "An outdated or 'under construction' website quietly costs renovation companies high-value projects — homeowners who arrive, aren't inspired by what they see, and request quotes from a competitor with a more polished portfolio instead. A professional, well-designed website with strong project photography is built to build that confidence and turn more visitors into quote requests."
  },
  {
    question: "Why is website design so important for renovation company trust and credibility?",
    answer: "In the renovation business, people aren't just buying a service; they're buying a vision for their home. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a contractor's reliability based on their website design. If your website looks outdated or 'cheap,' homeowners will assume your finishing work is, too. A sleek, modern site signals that you are organized, professional, and use the latest building technologies."
  },
  {
    question: "How much does a professional renovation company website cost in Ontario?",
    answer: "A custom, professional website for an Ontario renovation company typically ranges from $4,000 to $10,000, depending on features like project portfolio galleries, quote request systems, service area pages, video testimonials, and local SEO optimization. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your business."
  },
  {
    question: "How long does it take to build a renovation company's website?",
    answer: "A complete custom renovation or contractor website usually takes 2 to 3 weeks from kickoff to launch. Larger builds with extensive project galleries run 3 to 4 weeks. That timeline includes competitive analysis, custom design focused on showcasing craftsmanship, development of essential features, and SEO optimization to ensure your company ranks for local searches."
  },
  {
    question: "What features are essential for a renovation company website in 2026?",
    answer: "Essential features include high-conversion quote request systems, dynamic project portfolios with before/after galleries, client trust and credibility hub (WSIB, insurance, certifications), process roadmap section, local SEO and neighborhood targeting, and video testimonials with social proof. These features build trust, showcase craftsmanship, and convert visitors into high-value project leads."
  },
  {
    question: "Do renovation companies in GTA suburbs need local SEO?",
    answer: "Absolutely. With 84% of homeowners researching contractors online first, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham kitchen renovation' or 'Vaughan basement finishing' is essential for capturing ready-to-buy homeowners searching for renovation services."
  },
  {
    question: "Can a new website help my renovation company get more projects?",
    answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 lead generation engine. Renovation companies with high-quality project portfolios, clear service area pages, video testimonials, and optimized call-to-action triggers see a significant increase in quote requests compared to companies with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting browsers into high-value project clients."
  }
];

export const industryContent: Record<string, IndustryEntry> = {
  lawyers: { path: '/lawyers', breadcrumbLabel: 'Law Firm Web Design', faqs: lawyersFaqs },
  accountants: { path: '/accountants', breadcrumbLabel: 'Accounting Firm Web Design', faqs: accountantsFaqs },
  clinics: { path: '/clinics', breadcrumbLabel: 'Wellness Clinic Web Design', faqs: clinicsFaqs },
  renovations: { path: '/renovations', breadcrumbLabel: 'Renovation Company Web Design', faqs: renovationsFaqs },
};
