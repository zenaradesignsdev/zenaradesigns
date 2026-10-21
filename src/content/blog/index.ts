import { BlogPost } from '@/types';
import { websiteCostTorontoPost } from './how-much-does-a-website-cost-toronto';
import { seoGuideTorontoPost } from './seo-guide-small-business-toronto';
import { websiteVsSocialMediaPost } from './website-vs-social-media-business';
import { choosingWebDesignerGtaPost } from './choosing-web-designer-gta';
import { badWebsiteCostingMoneyPost } from './bad-website-costing-business-money';
import { websiteLaunchChecklistPost } from './website-launch-checklist';
import { ontarioLawFirmWebsiteContentPost } from './ontario-law-firm-website-content';
import { accountingFirmWebsitePagesPost } from './accounting-firm-website-pages';
import { renovationProjectPagesPost } from './renovation-company-project-pages-seo';
import { websiteCostMarkhamPost } from './how-much-does-a-website-cost-markham';
import { customVsTemplatePost } from './custom-website-vs-template-toronto';
import { lawFirmSeoTorontoPost } from './law-firm-seo-toronto';
import { lawFirmWebsiteCostPost } from './law-firm-website-cost-ontario';

// Featured images live in /public/images/blog/<slug>.jpg (1600x900).
// Photos are from Unsplash under the Unsplash License (free for commercial
// use, attribution not required); credits kept here for reference:
//   website-vs-social-media-business     Tim Mossholder    unsplash.com/photos/5kCKpKHvWt4
//   seo-guide-small-business-toronto     Tom Rumble        unsplash.com/photos/7lvzopTxjOU
//   how-much-does-a-website-cost-toronto Sasun Bughdaryan  unsplash.com/photos/mQ4dmENW2sM
//   bad-website-costing-business-money   MJ Duford         unsplash.com/photos/P_5mirRrg0k
//   choosing-web-designer-gta            Amélie Mourichon  unsplash.com/photos/sv8oOQaUb-o
//   website-launch-checklist             Jakub Żerdzicki   unsplash.com/photos/yKnIbJV0RbY
//   stiver-mill-unionville-markham       Hermes Rivera     unsplash.com/photos/o4fUO1A-O3Q
//   made-to-measure-suit-fabric-swatches Yasamine June     unsplash.com/photos/9pFE-9CWEBI
//   bay-street-sign-toronto              Jonathan Gong     unsplash.com/photos/hValjGcbDmk
//   osgoode-hall-old-city-hall-toronto   Hazwan Kosni      unsplash.com/photos/6HUS2Ghxdac
// The law firm, accounting firm and renovation posts use original illustrations,
// not stock photos. Posts from 2026-10-20 on name the file after what the photo
// shows (e.g. stiver-mill-unionville-markham.jpg) rather than the post slug.
const image = (slug: string) => `/images/blog/${slug}.jpg`;

// Posts are ordered by published date (newest first)
export const blogPosts: BlogPost[] = [
  {
    ...websiteCostMarkhamPost,
    featuredImage: image('stiver-mill-unionville-markham'),
    featuredImageAlt: 'The red Stiver Mill beside the railway tracks in Unionville, Markham',
  },
  {
    ...customVsTemplatePost,
    featuredImage: image('made-to-measure-suit-fabric-swatches'),
    featuredImageAlt: 'Grey and navy made-to-measure suit fabric swatches, one held with a pin',
  },
  {
    ...lawFirmSeoTorontoPost,
    featuredImage: image('bay-street-sign-toronto'),
    featuredImageAlt: 'A Bay St street sign in Bloor-Yorkville in front of Toronto office towers',
  },
  {
    ...lawFirmWebsiteCostPost,
    featuredImage: image('osgoode-hall-old-city-hall-toronto'),
    featuredImageAlt: 'Osgoode Hall’s columns with the Old City Hall clock tower behind, in autumn in downtown Toronto',
  },
  {
    ...accountingFirmWebsitePagesPost,
    featuredImage: image(accountingFirmWebsitePagesPost.slug),
  },
  {
    ...renovationProjectPagesPost,
    featuredImage: image(renovationProjectPagesPost.slug),
  },
  {
    ...ontarioLawFirmWebsiteContentPost,
    featuredImage: image(ontarioLawFirmWebsiteContentPost.slug),
  },
  {
    ...websiteLaunchChecklistPost,
    featuredImage: image(websiteLaunchChecklistPost.slug),
    featuredImageAlt: 'A hand ticking off items on a checklist on a tablet with a stylus',
  },
  {
    ...websiteVsSocialMediaPost,
    featuredImage: image(websiteVsSocialMediaPost.slug),
    featuredImageAlt: 'An “Open” sign hanging inside the glass door of a small shop',
  },
  {
    ...seoGuideTorontoPost,
    featuredImage: image(seoGuideTorontoPost.slug),
    featuredImageAlt: 'Aerial view of a suburban neighbourhood with parallel streets of detached houses',
  },
  {
    ...websiteCostTorontoPost,
    featuredImage: image(websiteCostTorontoPost.slug),
    featuredImageAlt: 'A teal calculator and a white pen on a white desk',
  },
  {
    ...choosingWebDesignerGtaPost,
    featuredImage: image(choosingWebDesignerGtaPost.slug),
    featuredImageAlt: 'A hand sketching mobile app wireframes on paper',
  },
  {
    ...badWebsiteCostingMoneyPost,
    featuredImage: image(badWebsiteCostingMoneyPost.slug),
    featuredImageAlt: 'A magnifying glass beside the corner of a laptop on a marble surface',
  },
].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

// Helper function to get a post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all post slugs (useful for static generation)
export const getAllPostSlugs = (): string[] => {
  return blogPosts.map(post => post.slug);
};
