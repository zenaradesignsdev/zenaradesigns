import type { Metadata } from 'next';
import Payment from '@/components/pages/Payment';

export const metadata: Metadata = {
  title: 'Subscription Plans | Hosting & Maintenance | Zenara Designs',
  description:
    'Choose your hosting and maintenance plan. Zenara Core ($45/mo), Grow ($70/mo), or Prime ($150/mo). Secure, reliable, and fully managed.',
  alternates: { canonical: 'https://zenaradesigns.com/payments' },
  robots: { index: false, follow: false },
};

export default function PaymentsPage() {
  return <Payment />;
}
