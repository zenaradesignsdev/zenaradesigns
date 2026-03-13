import type { Metadata } from 'next';
import Accountants from '@/components/pages/Accountants';

export const metadata: Metadata = {
  title: 'Accounting Firm Web Design GTA | CPA Websites | Zenara',
  description:
    'Professional web design for accounting firms in Markham, Vaughan, Pickering & across GTA. Secure, compliant platforms with client portals. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/accountants' },
  openGraph: {
    images: [{ url: 'https://zenaradesigns.com/images/accountant-computer-office.png' }],
  },
};

export default function AccountantsPage() {
  return <Accountants />;
}
