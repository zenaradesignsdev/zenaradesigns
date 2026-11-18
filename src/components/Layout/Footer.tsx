// Server Component. Only the collapsible link groups (FooterNav) and the
// newsletter form (FooterNewsletter) ship JavaScript.
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_E164, INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL, LINKTREE_URL } from '@/lib/constants';
import { TikTokIcon, LinktreeIcon } from '@/components/Layout/BrandIcons';
import FooterNav from './FooterNav';
import FooterNewsletter from './FooterNewsletter';

const logo = '/images/zenara-logo-v5.svg';

const SOCIAL_LINKS = [
  { href: INSTAGRAM_URL, ariaLabel: 'Follow us on Instagram @zenaradesignsinc', Icon: Instagram },
  { href: TIKTOK_URL, ariaLabel: 'Follow us on TikTok @zenaradesigns', Icon: TikTokIcon },
  { href: YOUTUBE_URL, ariaLabel: 'Subscribe to us on YouTube @ZenaraDesigns', Icon: Youtube },
  { href: LINKTREE_URL, ariaLabel: 'All our links on Linktree', Icon: LinktreeIcon },
] as const;

// [top%, left%] — sparse starfield matching the hero.
const STARS: [number, number][] = [
  [10, 5], [15, 15], [8, 25], [20, 35], [12, 45], [18, 55], [6, 65], [22, 75], [14, 85], [16, 95],
  [30, 8], [35, 18], [28, 28], [32, 38], [26, 48], [34, 58], [29, 68], [31, 78], [27, 88], [33, 92],
  [45, 12], [48, 22], [42, 32], [46, 42], [44, 52], [49, 62], [41, 72], [47, 82], [43, 92],
  [60, 6], [65, 16], [62, 26], [68, 36], [64, 46], [66, 56], [61, 66], [67, 76], [63, 86], [69, 96],
  [75, 10], [78, 20], [72, 30], [76, 40], [74, 50], [79, 60], [71, 70], [77, 80], [73, 90],
  [85, 4], [88, 14], [82, 24], [86, 34], [84, 44], [89, 54], [81, 64], [87, 74], [83, 84], [90, 94],
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Gradient background — matches the hero section */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        {STARS.map(([top, left]) => (
          <div key={`${top}-${left}`} className="bg-star" style={{ top: `${top}%`, left: `${left}%` }}></div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Decorative brand wordmark — not a heading (avoids a second <h1>). */}
        <div className="pt-8 pb-6 text-center sm:pt-10 md:pt-12 md:pb-8">
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-white/40 to-white/5 bg-clip-text whitespace-nowrap text-2xl font-extrabold uppercase leading-none text-transparent min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.15em' }}
          >
            Zenara Designs
          </div>
          <div className="mx-auto mt-5 h-px w-48 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent md:mt-6"></div>
        </div>

        <div className="grid gap-8 md:pb-8 lg:grid-cols-12 lg:gap-10 lg:pb-10">
          {/* Brand + contact + newsletter */}
          <div className="min-w-0 space-y-5 lg:col-span-4">
            <div>
              <div className="flex items-center gap-3">
                {/* Decorative: the name is right beside it. */}
                <Image src={logo} alt="" className="h-8 w-auto" width={32} height={32} />
                <span className="text-lg font-light text-white">Zenara Designs</span>
              </div>
              <p className="mt-3 max-w-sm text-sm font-light text-slate-300">
                Creating high-performing websites for small businesses and professionals using modern development workflows.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-slate-300">
              {/* One location line, matching the Google Business Profile and schema. */}
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-cyan-400/80" aria-hidden="true" />
                Markham, ON · Websites for GTA businesses
              </li>
              <li className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href={`mailto:${BUSINESS_EMAIL}`} className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0 text-cyan-400/80" aria-hidden="true" />
                  {BUSINESS_EMAIL}
                </a>
                <a href={`tel:${BUSINESS_PHONE_E164}`} className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0 text-cyan-400/80" aria-hidden="true" />
                  {BUSINESS_PHONE}
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-1.5">
              {SOCIAL_LINKS.map(({ href, ariaLabel, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
              <Link
                href="/contact"
                className="ml-auto inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:ml-2"
              >
                <span className="sm:hidden">Let&apos;s talk</span><span className="hidden sm:inline">Start a project</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <FooterNewsletter />
          </div>

          <FooterNav />
        </div>

        {/* Left-aligned from sm up, with extra bottom room, so the floating chat
            launcher (bottom-right) never covers it at the end of the page. */}
        <div className="flex flex-col items-center gap-2 py-5 text-xs text-slate-400 sm:flex-row sm:gap-6 sm:pb-10 md:border-t md:border-white/10">
          <p className="text-xs text-slate-400">© {currentYear} Zenara Designs. All rights reserved.</p>
          <div className="flex items-center gap-4 [&>a]:inline-flex [&>a]:items-center">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
