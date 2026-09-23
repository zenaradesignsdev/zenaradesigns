import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

const AODA_WEBSITES = 'https://www.ontario.ca/page/how-make-websites-accessible';

const ChoosingWebDesignerGtaContent = () => {
  return (
    <div>
      <p>
        There is no shortage of web designers in the GTA, from freelancers to large agencies. The hard part
        isn’t finding one; it’s telling them apart before you have paid anyone. Portfolios all look good, and
        every proposal promises a fast, modern, mobile-friendly site.
      </p>
      <p>
        This guide covers what to look at, what to ask, and what to get in writing, so you can compare
        designers on the things that decide how the project actually goes.
      </p>

      <h2 id="look-past-the-portfolio">Look Past the Portfolio</h2>
      <p>
        A portfolio shows taste. It doesn’t show whether the sites work. Pick two or three examples and check
        them yourself:
      </p>
      <ul>
        <li>
          <strong>Open the live sites on your phone.</strong> Do they load quickly? Is the phone number
          tappable? Does the menu work?
        </li>
        <li>
          <strong>Look for range.</strong> If every site looks the same regardless of industry, expect yours to
          look like them too.
        </li>
        <li>
          <strong>Ask what their role was.</strong> Design only, build only, or both? Who wrote the content?
          Portfolios sometimes include work where the designer played a small part.
        </li>
        <li>
          <strong>Ask whether you can speak to a past client.</strong> A designer with happy clients rarely
          minds.
        </li>
      </ul>

      <h2 id="understand-the-process">Understand the Process Before You Sign</h2>
      <p>
        A good designer can explain how a project moves from first call to launch in a few sentences. If the
        answer is vague, the project probably will be too. Ask about:
      </p>
      <ul>
        <li>
          <strong>Timeline.</strong> Template shops can turn sites around in days; traditional agencies often
          take two to three months. A focused custom build for a small business can land in one to two weeks.
          Ask what drives their number, and what happens to it if your content is late.
        </li>
        <li>
          <strong>Sign-off points.</strong> Will you approve a sitemap and a design direction before any code
          is written? Changes are cheap on paper and expensive after the build.
        </li>
        <li>
          <strong>Revisions.</strong> How many rounds are included? “Unlimited revisions” usually means the
          scope was never defined.
        </li>
        <li>
          <strong>Content.</strong> Who writes the text and sources the photos? If it is you, when do they
          need it?
        </li>
        <li>
          <strong>Technology.</strong> A website builder, WordPress or custom code all have trade-offs. The
          question that matters is whether you can make simple changes yourself afterwards, and what it costs
          when you can’t.
        </li>
      </ul>
      <p>
        For comparison, here is <Link href="/process">how our own process works</Link>, from discovery to
        launch.
      </p>

      <h2 id="make-sure-you-own-everything">Make Sure You Own Everything</h2>
      <p>
        This is the point most often skipped, and the one that causes the most trouble later. Before the
        project starts, agree in writing that these are registered in your business’s name, with the designer
        added as a user rather than the owner:
      </p>
      <ul>
        <li>The domain name</li>
        <li>The hosting account, or a clear hosting agreement if they host it</li>
        <li>Google Analytics and Google Search Console</li>
        <li>Your Google Business Profile</li>
        <li>Any paid plugins, fonts or software licences the site depends on</li>
      </ul>
      <p>
        If you ever change providers, you keep your address, your history and your data. A designer who
        resists this is telling you something about how the relationship ends.
      </p>

      <h2 id="accessibility-in-ontario">Ask About Accessibility</h2>
      <p>
        In Ontario, the AODA requires{' '}
        <ExternalLink href={AODA_WEBSITES}>businesses and non-profits with 50 or more employees</ExternalLink>{' '}
        to make their public websites meet WCAG 2.0 Level AA, with limited exceptions. The Government of
        Ontario’s guidance also notes that the organization that controls the website is responsible,
        including when the site is managed through a contractor.
      </p>
      <p>
        Smaller businesses aren’t covered by that requirement, but accessible sites are easier for everyone to
        use, and retrofitting is far more expensive than building it in. Ask any designer how they handle
        colour contrast, keyboard navigation, image descriptions and form labels. A confident, specific answer
        is a good sign.
      </p>
      <p className="blog-note">
        This is general information, not legal advice. If your organization may be covered, check the current
        requirements on the Government of Ontario’s website.
      </p>

      <h2 id="communication">Pay Attention to Communication Early</h2>
      <p>
        How a designer communicates before you hire them is the best preview you will get. Notice:
      </p>
      <ul>
        <li>How long they take to reply when they are trying to win your business</li>
        <li>Whether they explain things in plain language or hide behind jargon</li>
        <li>Whether they ask about your customers and goals, or only about colours and style</li>
        <li>Whether they tell you when something isn’t worth the money</li>
      </ul>

      <h2 id="support-after-launch">Know What Happens After Launch</h2>
      <p>
        A website needs care after it goes live: software updates, security fixes, backups and small content
        changes. Ask:
      </p>
      <ul>
        <li>How long are fixes and small edits included after launch?</li>
        <li>What does ongoing maintenance cost, and what does it include?</li>
        <li>If the site goes down, who do you contact, and how quickly do they respond?</li>
        <li>Can you make basic text changes yourself?</li>
      </ul>
      <p>
        Our <Link href="/services/website-maintenance">maintenance plans</Link> are one example of how this
        can be packaged; whatever you choose, get the terms in writing.
      </p>

      <h2 id="pricing-red-flags">Pricing Red Flags</h2>
      <p>
        Price alone tells you little. These patterns tell you more:
      </p>
      <ul>
        <li>
          <strong>A “custom” site at a template price.</strong> Ask directly whether the design is built for
          you or adapted from a purchased theme. Both can be fine; you should know which you are buying.
        </li>
        <li>
          <strong>No written scope.</strong> Every quote should list the pages, features, revision rounds and
          what is excluded.
        </li>
        <li>
          <strong>Full payment upfront.</strong> A deposit with the balance at milestones or launch is a common,
          fair arrangement.
        </li>
        <li>
          <strong>Long lock-in contracts.</strong> Especially where the designer, not you, owns the site or
          the domain.
        </li>
        <li>
          <strong>Line items nobody can explain.</strong> If they can’t tell you what a charge is for, don’t
          pay it.
        </li>
      </ul>
      <p>
        For what drives price in the first place, see{' '}
        <Link href="/blog/how-much-does-a-website-cost-toronto">how much a website costs in Toronto</Link>.
      </p>

      <h2 id="questions-to-ask-on-the-first-call">Questions to Ask on the First Call</h2>
      <p>Copy these into your notes and ask every designer the same ones:</p>
      <ul className="blog-checklist">
        <li>Who will I be working with day to day, and who actually builds the site?</li>
        <li>What will I approve before development starts?</li>
        <li>How many revision rounds are included, and what does an extra round cost?</li>
        <li>What do you need from me, and by when?</li>
        <li>Will the domain, hosting and analytics accounts be in my name?</li>
        <li>How do you handle accessibility?</li>
        <li>What is included after launch, and what does ongoing support cost?</li>
        <li>Can I make simple changes myself?</li>
        <li>What is the payment schedule?</li>
        <li>Could I speak to a recent client?</li>
      </ul>

      <div className="blog-callout">
        <h3>Put Us Through the Same Questions</h3>
        <p>
          We are a small Markham studio building websites for businesses across the GTA. Our process and pricing
          are published, and we are happy to answer every question above, ownership included, on a first call.
        </p>
        <p>
          See <Link href="/process">how we work</Link>, or <Link href="/contact">book a call</Link>.
        </p>
      </div>
    </div>
  );
};

export const choosingWebDesignerGtaPost: BlogPost = {
  slug: 'choosing-web-designer-gta',
  title: 'How to Choose a Web Designer in the GTA: Questions to Ask First',
  seoTitle: 'How to Choose a Web Designer in the GTA | Zenara Designs',
  description:
    'Hiring a web designer in the GTA? What to check in a portfolio, what to get in writing, who should own your domain and accounts, and ten questions to ask first.',
  excerpt:
    'Portfolios all look good and every proposal promises a fast, modern site. Here is how to tell GTA web designers apart before you have paid anyone, including ten questions to ask on the first call.',
  author: 'Kavin Mural',
  publishedAt: new Date('2025-02-10'),
  updatedAt: new Date('2026-09-23'),
  tags: ['pricing & planning', 'web design', 'hiring'],
  content: ChoosingWebDesignerGtaContent,
};
