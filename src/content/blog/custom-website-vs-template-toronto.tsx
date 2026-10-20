import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';
import { packagePriceWithRegular } from '@/lib/pricing-data';

const WIX_PLANS = 'https://www.wix.com/plans';
const SQUARESPACE_PRICING = 'https://www.squarespace.com/pricing';

const CustomVsTemplateContent = () => {
  return (
    <div>
      <p>
        Almost every web designer in Toronto calls their work “custom”. Some mean a site designed from a blank
        page for your business. Others mean a purchased theme with your logo, colours and photos dropped in.
        Both are legitimate products. The problem is that they are sold under the same word, at very different
        prices, and it is hard to tell which one a quote describes.
      </p>
      <p>
        This guide explains the three options a small business actually chooses between, what each one gets
        you for the money, and how to tell them apart before you sign.
      </p>

      <h2 id="the-three-options">The Three Options</h2>
      <h3>1. A website builder template (Wix, Squarespace)</h3>
      <p>
        You pick a template, replace the content, and pay a monthly subscription. In October 2026,{' '}
        <ExternalLink href={WIX_PLANS}>Wix</ExternalLink> and{' '}
        <ExternalLink href={SQUARESPACE_PRICING}>Squarespace</ExternalLink> listed their common business plans
        at roughly CA$21 to CA$46 a month. You can do it yourself or pay a freelancer to set it up.
      </p>
      <h3>2. A theme on WordPress</h3>
      <p>
        A designer or freelancer buys a WordPress theme, configures it, adds plugins for forms, SEO and
        anything else you need, and fills it with your content. You own the site and choose your own hosting.
      </p>
      <h3>3. A custom site</h3>
      <p>
        The layout is designed for your business first, usually as mockups you approve, and then built in
        code. There is no theme or page builder underneath. Ours are built with Next.js, but the stack matters
        less than the process: design first, then build exactly what was designed.
      </p>

      <h2 id="what-you-get-for-the-money">What You Actually Get for the Money</h2>
      <h3>Design</h3>
      <p>
        A template looks like a template because many other businesses use it. That is fine for a hobby or a
        side business. It is a real cost when you sell on trust, such as a law firm, a clinic or an accountant,
        and a prospect is comparing three sites that share the same layout. A custom design is built around what
        your customers need to see first, which is usually not what a general-purpose template puts first.
      </p>
      <h3>Speed</h3>
      <p>
        Builders and themes have to support every possible use, so they ship more code than any one site needs,
        and each plugin or app adds more. They can be fast, but you are tuning someone else’s product. A custom
        site only includes what its pages use, which makes good speed the default rather than a project.
      </p>
      <h3>Ownership</h3>
      <p>
        This is the one people regret most. A builder site can’t be moved to another host: if you stop paying
        or outgrow the platform, you rebuild. WordPress and custom sites are yours, as long as the domain,
        hosting and accounts are registered in your name. Check that in writing whoever you hire.
      </p>
      <h3>Maintenance</h3>
      <p>
        Builders handle updates for you. WordPress needs regular core, theme and plugin updates, and most
        reported WordPress security vulnerabilities are in plugins rather than WordPress itself. A custom site
        has little to patch, but you need someone who can make changes in code, either the original developer
        or anyone else you hire.
      </p>

      <h2 id="what-each-costs">What Each Option Costs in Toronto</h2>
      <ul>
        <li>
          <strong>Builder:</strong> the subscription, around $750 to $1,650 over three years at the plan prices
          above, plus apps, email and your time.
        </li>
        <li>
          <strong>WordPress theme:</strong> varies widely by who sets it up, from a few hundred dollars with a
          freelancer to several thousand, plus hosting, premium plugin licences and maintenance.
        </li>
        <li>
          <strong>Custom:</strong> typically low to mid four figures from a small studio for a small-business
          site, and five figures from an agency. Ours starts at {packagePriceWithRegular('starter')} for up to
          three pages and {packagePriceWithRegular('smallBusiness')} for up to six.
        </li>
      </ul>
      <p>
        Our guide to <Link href="/blog/how-much-does-a-website-cost-toronto">what a website costs in Toronto</Link>{' '}
        goes deeper on what drives the price and the running costs after launch.
      </p>

      <h2 id="how-to-tell-them-apart">How to Tell Which One a Quote Describes</h2>
      <ol>
        <li>
          <strong>Ask to see the design before the build.</strong> A custom project has mockups you approve
          before development starts. A template project usually goes straight to a working site.
        </li>
        <li>
          <strong>Ask what the site is built on.</strong> “WordPress with the Astra theme” or “Squarespace” is
          a clear answer. So is “designed in Figma, built in Next.js”. Vagueness is a warning sign.
        </li>
        <li>
          <strong>Ask whether you could move it.</strong> If the answer is no, it is a builder site.
        </li>
        <li>
          <strong>Look at their other work.</strong> If three portfolio sites share the same layout, that is the
          layout you will get.
        </li>
      </ol>

      <h2 id="which-should-you-choose">Which Should You Choose?</h2>
      <p>
        Choose a builder if the budget is very small, you enjoy doing it yourself, and the website is not how
        most customers find you. Choose WordPress if you already have someone comfortable maintaining it, or
        need a plugin that does exactly what you want. Choose custom when the website has to win business on
        its own: a crowded Toronto search, a service where trust decides the sale, or a brand that needs to look
        like nobody else.
      </p>

      <div className="blog-callout">
        <h3>See What Custom Means at Zenara</h3>
        <p>
          Our <Link href="/services/web-design">custom web design in Toronto</Link> page sets out exactly what we
          build, with a side-by-side comparison of custom, builder and WordPress sites.
        </p>
        <p>
          Compare our <Link href="/pricing">fixed prices</Link>, or <Link href="/contact">get a quote</Link>.
        </p>
      </div>
    </div>
  );
};

export const customVsTemplatePost: BlogPost = {
  slug: 'custom-website-vs-template-toronto',
  title: 'Custom Website vs. Template: What a Toronto Small Business Actually Gets for the Money',
  seoTitle: 'Custom Website vs. Template: Toronto Small Business Guide | Zenara',
  description:
    'Custom website, Wix or Squarespace template, or WordPress theme? What each gets a Toronto small business for the money, what they cost, and how to tell quotes apart.',
  excerpt:
    'Almost every Toronto web designer calls their work custom. Here is what custom, template and WordPress sites actually get you for the money, and how to tell which one a quote describes.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-10-20'),
  tags: ['pricing & planning', 'web design', 'small business'],
  content: CustomVsTemplateContent,
};
