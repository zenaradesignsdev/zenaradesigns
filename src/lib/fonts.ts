import { Poppins } from 'next/font/google';

export const fontSans = Poppins({
  subsets: ['latin'],
  // 200 is required: `font-extralight` is used on most hero headings (125 uses).
  // 800 was loaded but `font-extrabold` has zero uses anywhere in src/.
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
