import Script from 'next/script';

const GA_ID = 'G-XEHPLPLX0S';

// The inline snippet runs straight away and queues the page view in
// dataLayer. gtag.js (~190 KB) loads with lazyOnload: after the page's load
// event, when the browser is idle, so it stays off the critical path for LCP.
// It used to wait for the visitor's first interaction, which kept zero-click
// visits (bounces, quick phone-number lookups) out of GA4 and undercounted
// sessions from search and the Google Business Profile.
export default function GoogleAnalytics() {
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
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
    </>
  );
}
