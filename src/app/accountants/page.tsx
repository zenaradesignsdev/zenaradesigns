import type { Metadata } from 'next';
import Accountants from '@/components/pages/Accountants';
import { JsonLd } from '@/components/JsonLd';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['accountants'];

export const metadata: Metadata = {
  title: 'Accounting Firm Web Design GTA | CPA Websites | Zenara',
  description:
    'Professional web design for accounting firms in Markham, Vaughan, Pickering & across GTA. Secure, compliant platforms with client portals. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/accountants' },
  openGraph: {
    title: 'Accounting Firm Web Design GTA | CPA Websites | Zenara',
    description:
      'Professional web design for accounting firms in Markham, Vaughan, Pickering & across GTA. Secure, compliant platforms with client portals. Free consultation.',
    url: 'https://zenaradesigns.com/accountants',
    images: [{ url: 'https://zenaradesigns.com/images/accountant-computer-office.png' }],
  },
};

export default function AccountantsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(entry.path, [
        { name: 'Home', url: '/' },
        { name: entry.breadcrumbLabel, url: entry.path },
      ])} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <Accountants />
    </>
  );
}
