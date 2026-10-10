'use client';

import Script from 'next/script';
import { useFirstInteraction } from '@/hooks';

const GA_ID = 'G-XEHPLPLX0S';

// The inline snippet runs straight away and queues the page view in
// dataLayer. gtag.js (~190 KB, ~600 ms of main-thread work on a mid-range
// phone) is only fetched on the visitor's first interaction, then flushes the
// queue. Trade-off: visits with zero interaction (mostly bots) aren't recorded.
export default function GoogleAnalytics() {
  const hasInteracted = useFirstInteraction();

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure',
            'send_page_view': true
          });
        `}
      </Script>
      {hasInteracted && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
