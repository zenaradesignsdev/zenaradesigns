import { BlogPost } from '@/types';
import Link from 'next/link';

const GOOGLE_LOCAL_RANKING = 'https://support.google.com/business/answer/7091';

const WebsiteVsSocialMediaContent = () => {
  return (
    <div>
      <p>
        Plenty of small businesses in the GTA run on referrals, an Instagram account and a Google Business
        Profile. Some of them are fully booked and doing fine. So the question “do we actually need a
        website?” is a fair one, and the honest answer is: not always, and not right away.
      </p>
      <p>
        What matters is knowing what each of those three things is good at, where each one runs out, and
        at what point a website starts doing work that the other two can’t.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <p>
        If nearly all your work comes from people who already know you, and you have more work than you
        can take on, a website is not urgent. Your reputation is doing the selling.
      </p>
      <p>A website becomes necessary when any of these are true:</p>
      <ul>
        <li>You want work from people who have never heard of you.</li>
        <li>What you sell needs explaining before someone is ready to call.</li>
        <li>Customers compare two or three businesses before choosing one.</li>
        <li>You want enquiries to arrive with the details you need, not as a one-line message.</li>
      </ul>
      <p>
        Most service businesses reach at least one of those points sooner or later. When they do, the
        profile and the social accounts stay useful, but they stop being enough on their own.
      </p>

      <h2 id="what-a-google-business-profile-does-well">What a Google Business Profile Does Well</h2>
      <p>
        For local searches, your Business Profile is often the first thing people see: your name on the
        map, your hours, your phone number, directions and your reviews. For a restaurant, a clinic or a
        trade, that alone can produce calls.
      </p>
      <p>
        Google says{' '}
        <a href={GOOGLE_LOCAL_RANKING} target="_blank" rel="noopener noreferrer">
          local results are based mainly on relevance, distance and prominence
        </a>
        . Prominence, in Google’s own description, draws on things like how many reviews you have and how
        many websites link to your business. That is worth knowing, because it means your profile does not
        rank in isolation. What exists about you elsewhere on the web feeds into it.
      </p>
      <p>
        The limits are the format. A profile is a fixed template. You can list services and write a short
        description, but you can’t explain how a job works, what affects the price, what happens after
        someone gets in touch, or why they should pick you over the business two listings down. The profile
        has a “website” field for a reason: it expects to send people somewhere with more detail.
      </p>

      <h2 id="what-social-media-does-well">What Social Media Does Well</h2>
      <p>
        Social media is good at showing that you are active and that your work is real. For businesses where
        the result is visual (renovations, landscaping, food, hair and beauty), a steady run of recent work
        is persuasive in a way a services list never is.
      </p>
      <p>It is less good at four things that matter once people are deciding:</p>
      <ul>
        <li>
          <strong>Explaining.</strong> A feed is sorted by date, not by topic. Your best explanation of how you
          price a kitchen renovation scrolls out of view in a week.
        </li>
        <li>
          <strong>Being found by search.</strong> Try it yourself: search for the service you offer plus your
          town. You will mostly see the map results and websites, not social profiles.
        </li>
        <li>
          <strong>Taking enquiries.</strong> Direct messages have no structure. You get “how much for a
          bathroom?” with no address, size or timeline, and the conversation lives in one person’s phone.
        </li>
        <li>
          <strong>Staying yours.</strong> The platform decides who sees your posts, and it can restrict or
          disable accounts under its own terms. Most businesses never have a problem, but you are building on
          someone else’s property.
        </li>
      </ul>

      <h2 id="what-only-a-website-gives-you">What Only Your Own Website Gives You</h2>
      <p>
        A website is the one place online where you decide what is said, in what order, and what happens
        next. In practical terms, that gives you:
      </p>
      <ul>
        <li>
          <strong>A page for each service.</strong> Each one can answer the questions people ask before they
          call, and each one can show up in search for that specific service.
        </li>
        <li>
          <strong>An enquiry form that asks what you need to know.</strong> Job type, location, timeline,
          budget range. It lands in your inbox with everything in one place.
        </li>
        <li>
          <strong>Your own domain and email address.</strong> A quote sent from an address at your own domain
          reads differently from one sent from a free email account.
        </li>
        <li>
          <strong>Measurement.</strong> Analytics and Google Search Console show which pages people read and
          which searches bring them to you. Social platforms show you their numbers, on their terms.
        </li>
        <li>
          <strong>A single place to send people.</strong> Your profile, your Instagram bio, your business card
          and the decal on your van can all point to the same address.
        </li>
      </ul>

      <h2 id="how-the-three-work-together">How the Three Work Together</h2>
      <p>
        These aren’t competing choices. Each one does a different job, and they work best when they point at
        each other. Take a renovation contractor in Stouffville as an example setup:
      </p>
      <ul>
        <li>
          <strong>Business Profile:</strong> the right primary category, an accurate service area, photos of
          finished jobs, a steady trickle of reviews, and the website field pointing to the site.
        </li>
        <li>
          <strong>Instagram:</strong> before-and-after posts and short videos of work in progress, with the bio
          link going to the quote page rather than the homepage.
        </li>
        <li>
          <strong>Website:</strong> separate pages for kitchens, basements and bathrooms, a gallery of
          finished projects, an honest explanation of how quotes work, and a quote form that asks for the
          details the contractor actually needs.
        </li>
      </ul>
      <p>
        Someone sees a basement post on Instagram, searches the company name, finds the profile and its
        reviews, clicks through to the basements page, and sends a quote request with the square footage
        already filled in. Each piece did one job well.
      </p>

      <h2 id="what-a-first-website-needs">What a First Website Needs (and What It Doesn’t)</h2>
      <p>
        If you’re going from no website to a first one, it can be small. It needs:
      </p>
      <ol>
        <li>A homepage that says plainly what you do and where you work.</li>
        <li>A page for each main service, or one well-organized services page if you only offer a few.</li>
        <li>An about section with real names and real photos.</li>
        <li>A contact page with your phone number, an enquiry form and your service area.</li>
        <li>Proof: reviews, project photos or both.</li>
      </ol>
      <p>
        It doesn’t need a blog on day one, twenty pages or elaborate animation. A focused three-page site
        that answers the right questions is more useful than a large one that doesn’t. That is what our
        Starter plan on the <Link href="/pricing">pricing page</Link> is for. When you do launch, our{' '}
        <Link href="/blog/website-launch-checklist">website launch checklist</Link> covers what to check
        before the site goes live.
      </p>

      <div className="blog-callout">
        <h3>Ready for a Website of Your Own?</h3>
        <p>
          We build websites for small businesses in Markham and across the GTA, designed to work alongside
          your Business Profile and social accounts rather than replace them.
        </p>
        <p>
          See how we approach <Link href="/services/web-design">web design</Link>, or{' '}
          <Link href="/contact">get in touch</Link> and tell us where your enquiries come from today.
        </p>
      </div>
    </div>
  );
};

export const websiteVsSocialMediaPost: BlogPost = {
  slug: 'website-vs-social-media-business',
  title: 'Do You Need a Website If You Already Have Instagram and a Google Business Profile?',
  seoTitle: 'Website vs Social Media for Small Business | Zenara Designs',
  description:
    'Already on Instagram and Google Maps? What a Business Profile and social media do well, where they fall short, and when a small business needs its own website.',
  excerpt:
    'Plenty of GTA businesses run on referrals, Instagram and a Google Business Profile. Here is what each one does well, where each runs out, and when a website starts doing work the others can’t.',
  author: 'Kavin Mural',
  publishedAt: new Date('2025-03-05'),
  updatedAt: new Date('2026-09-23'),
  tags: ['web design', 'social media', 'small business'],
  content: WebsiteVsSocialMediaContent,
};
