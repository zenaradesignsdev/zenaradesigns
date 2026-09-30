import { Archivo_Narrow, DM_Sans, Inter, Montserrat, Playfair_Display } from 'next/font/google';

// Client typefaces for the "Aa" samples on case study typography tiles. Self-hosted
// by next/font (the site CSP only allows fonts from 'self' and Google) and not
// preloaded, so they only download on case study pages that render a tile.
// next/font needs each call's options written out as a literal.
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const dmSans = DM_Sans({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', preload: false });
const montserrat = Montserrat({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const archivoNarrow = Archivo_Narrow({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });

export const caseStudyFonts = {
  playfair: playfair.style.fontFamily,
  dmSans: dmSans.style.fontFamily,
  inter: inter.style.fontFamily,
  montserrat: montserrat.style.fontFamily,
  archivoNarrow: archivoNarrow.style.fontFamily,
};

export type CaseStudyFont = keyof typeof caseStudyFonts;
