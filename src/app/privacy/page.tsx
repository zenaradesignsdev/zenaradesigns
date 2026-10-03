import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_PHONE_E164 } from '@/lib/constants';

const EFFECTIVE_DATE = 'October 3, 2026';

const title = 'Privacy Policy | Zenara Designs';
const description =
  'How Zenara Designs collects, uses, and protects personal information submitted through zenaradesigns.com, in line with Canadian privacy law (PIPEDA).';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://zenaradesigns.com/privacy#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zenaradesigns.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://zenaradesigns.com/privacy' },
  ],
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://zenaradesigns.com/privacy' },
  openGraph: {
    images: ['/opengraph-image'],
    title,
    description,
    url: 'https://zenaradesigns.com/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

interface PolicySectionProps {
  heading: string;
  children: ReactNode;
}

function PolicySection({ heading, children }: PolicySectionProps) {
  return (
    <section className="border-t border-white/10 py-10 sm:py-12 md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
      <h2 className="text-lg sm:text-xl font-light text-white tracking-[-0.01em] mb-4 md:mb-0">{heading}</h2>
      <div className="space-y-4 text-sm sm:text-base font-light leading-relaxed text-slate-300 [&_strong]:font-normal [&_strong]:text-white [&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-cyan-200">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28">
          <header className="pb-12 sm:pb-16">
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">Legal</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
              Privacy Policy
            </h1>
            <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-slate-300">
              {BUSINESS_NAME} is a web design studio based in Markham, Ontario. This policy explains what personal
              information we collect through zenaradesigns.com, why we collect it, and the choices you have. We follow
              Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
            </p>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
              Effective {EFFECTIVE_DATE}
            </p>
          </header>

          <PolicySection heading="What we collect">
            <p>We only collect information you choose to give us, plus basic technical data needed to run the site:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Contact and quote forms</strong> — your name, email, phone number, company, project type,
                budget, timeline, and message.
              </li>
              <li>
                <strong>Newsletter sign-up</strong> — your email address.
              </li>
              <li>
                <strong>Booking a call</strong> — the name, email, and details you enter in our scheduling tool.
              </li>
              <li>
                <strong>Payments</strong> — handled entirely by Stripe on its own secure checkout. We receive
                confirmation of payment and your billing contact details, but never your full card number.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, approximate location, device and browser type, collected
                through Google Analytics cookies, and IP addresses recorded briefly by our servers for security and
                spam prevention.
              </li>
            </ul>
          </PolicySection>

          <PolicySection heading="How we use it">
            <ul className="list-disc pl-5 space-y-2">
              <li>To reply to enquiries, prepare quotes, and schedule calls.</li>
              <li>To deliver, bill for, and support the services you hire us for.</li>
              <li>To send our newsletter, if you subscribed. Every email has an unsubscribe link.</li>
              <li>To understand how visitors use the site so we can improve it.</li>
              <li>To protect the site from spam, abuse, and fraud.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information, and we do not use it for any other purpose
              without your consent.</p>
          </PolicySection>

          <PolicySection heading="Service providers">
            <p>We rely on a small number of trusted providers to run the site. Each receives only what it needs to do
              its job:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Vercel</strong> — website hosting.</li>
              <li><strong>Resend</strong> — delivers contact form submissions to our inbox.</li>
              <li><strong>Brevo</strong> — newsletter delivery.</li>
              <li><strong>Calendly</strong> — call scheduling.</li>
              <li><strong>Stripe</strong> — payment processing.</li>
              <li><strong>Google</strong> — website analytics (Google Analytics) and displaying our public Google
                reviews.</li>
            </ul>
            <p>Some of these providers store data outside Canada, including in the United States, where it may be
              accessible to authorities under local law. We choose providers that protect personal information to a
              standard comparable to PIPEDA.</p>
          </PolicySection>

          <PolicySection heading="Cookies and analytics">
            <p>We use Google Analytics cookies to measure site traffic. They don&apos;t identify you by name. You can
              block or delete cookies in your browser settings, or opt out of Google Analytics entirely with
              Google&apos;s{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                opt-out browser add-on
              </a>
              . The site works normally without them.</p>
          </PolicySection>

          <PolicySection heading="Google API services">
            <p>We use internal tools that connect to our own Google accounts (such as Google Search Console and
              Google Ads Keyword Planner) to analyse search performance and plan content for our own business. Data
              obtained through Google APIs is used only for that internal analysis, is not shared with or sold to
              third parties, and is not used for advertising profiles.</p>
            <p>Our use of information received from Google APIs adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.</p>
          </PolicySection>

          <PolicySection heading="How long we keep it">
            <p>We keep enquiry and client records for as long as needed to provide our services and to meet our
              legal and tax obligations (generally up to seven years for business and financial records). Newsletter
              addresses are kept until you unsubscribe. Analytics data is retained according to Google
              Analytics&apos; retention settings.</p>
          </PolicySection>

          <PolicySection heading="Keeping it secure">
            <p>The site is served over HTTPS, forms are validated and rate-limited on our servers, and access to
              client information is limited to the people who need it. No method of transmission or storage is
              completely secure, but we take reasonable steps to protect your information.</p>
          </PolicySection>

          <PolicySection heading="Your rights">
            <p>You can ask to see the personal information we hold about you, correct it, or withdraw your consent
              and have it deleted (unless we&apos;re legally required to keep it). Contact us using the details below
              and we&apos;ll respond within 30 days.</p>
            <p>If you&apos;re not satisfied with our response, you can contact the{' '}
              <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">
                Office of the Privacy Commissioner of Canada
              </a>
              .</p>
          </PolicySection>

          <PolicySection heading="Children">
            <p>Our site and services are intended for businesses and are not directed at children under 16. We do not
              knowingly collect their personal information.</p>
          </PolicySection>

          <PolicySection heading="Changes">
            <p>We may update this policy as our services or the law change. The effective date at the top shows when
              it was last revised.</p>
          </PolicySection>

          <PolicySection heading="Contact us">
            <p>Questions or requests about your privacy can go to our privacy contact:</p>
            <p>
              <strong>{BUSINESS_NAME}</strong>
              <br />
              Markham, Ontario, Canada
              <br />
              <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
              <br />
              <a href={`tel:${BUSINESS_PHONE_E164}`}>{BUSINESS_PHONE}</a>
            </p>
            <p>
              Prefer to talk it through? <Link href="/contact">Get in touch</Link>.
            </p>
          </PolicySection>
        </div>
      </div>
    </>
  );
}
