import { BlogPost } from '@/types';
import Link from 'next/link';
import { ExternalLink } from '@/components/Blog/ExternalLink';

const GOOGLE_IMAGE_GUIDE = 'https://developers.google.com/search/docs/appearance/google-images';

const RenovationProjectPagesContent = () => {
  return (
    <div>
      <p>
        Most renovation companies already have one of their best marketing assets sitting on a phone or a
        hard drive: photos of finished projects.
      </p>
      <p>
        The trouble is where those photos end up. On a lot of contractor websites they go onto a single page
        called Gallery, Our Work, Portfolio or Projects. Dozens of kitchens, bathrooms, basements and additions
        sit in one grid with little or no explanation.
      </p>
      <p>
        That is better than having no portfolio at all, but it leaves most of the value on the table. A
        homeowner planning a basement can’t easily tell which of forty photos is a basement like theirs, or
        what the job involved. Google has even less to go on: a page full of images and almost no words about
        them.
      </p>
      <p>
        The fix isn’t more photos. It’s turning your strongest projects into their own pages.
      </p>

      <h2 id="more-than-a-photo-gallery">A Project Page Is More Than a Photo Gallery</h2>
      <p>
        Take a hypothetical example. A contractor finishes a main-floor renovation in Markham: a new kitchen,
        a partial wall removed to open the kitchen to the dining room, new flooring throughout, new lighting,
        new cabinetry and finish carpentry.
      </p>
      <p>
        The usual approach is to add eight of the best photos to the gallery and move on. The better approach
        is to give the project its own page, with a plain title like{' '}
        <strong>Main Floor and Kitchen Renovation in Markham</strong>, and use it to answer the questions a
        homeowner would ask if they were standing in the finished room:
      </p>
      <ul>
        <li>What did the homeowners want to change?</li>
        <li>What was wrong with the original layout?</li>
        <li>What work was actually done?</li>
        <li>What made the job tricky?</li>
        <li>Which materials or design decisions mattered?</li>
        <li>What does the space do better now?</li>
      </ul>
      <p>
        That page is written for the homeowner first. It also happens to give search engines far more to
        work with than eight unlabelled images in a grid, which is why project pages are one of the most
        useful parts of a contractor’s broader <Link href="/services/seo">SEO strategy</Link>.
      </p>

      <h2 id="show-the-before">Show the Before, Not Just the After</h2>
      <p>
        It is natural to want to show only the finished result. It’s the part you’re proud of, and it’s
        usually the only part that was photographed properly.
      </p>
      <p>
        But the transformation is often what sells the job. Homeowners recognize their own house in the
        before photos: the cramped kitchen, the unfinished basement, the dated bathroom, the closed-off main
        floor, the tired flooring, the storage that never quite worked. Seeing a space like theirs turn into
        something better is more persuasive than a finished room with nothing to compare it to.
      </p>
      <p>
        The photos don’t need to be magazine quality. They need to be clear, reasonably well lit and taken
        from similar angles before and after, so the comparison is easy to read. Honest photos taken on site
        with a decent phone are often more convincing than heavily staged ones, because they look like real
        work in a real house.
      </p>
      <p>
        The practical habit is simple: take the before photos before demolition starts, from the spots
        where you’ll take the after photos later. And take a few during the job too. Open walls, new framing
        and rough-ins show the work that disappears behind drywall.
      </p>

      <h2 id="describe-the-problem">Describe the Problem You Solved</h2>
      <p>
        A project page gets much stronger when it explains what the homeowners were trying to fix. Compare
        these two openings, both written for a hypothetical kitchen in Vaughan:
      </p>
      <blockquote>
        <p>We completed this beautiful kitchen renovation in Vaughan.</p>
      </blockquote>
      <blockquote>
        <p>
          The homeowners liked where their kitchen was, but the work area was narrow and there wasn’t much
          usable counter space. The renovation kept the main plumbing locations, changed the cabinet layout
          and opened the kitchen toward the dining area.
        </p>
      </blockquote>
      <p>
        The first describes a finished room. The second shows a contractor solving a problem, which is what a
        homeowner is actually hiring you to do. Someone with a narrow kitchen of their own reads the second
        version and thinks: that’s my kitchen.
      </p>
      <p>
        Only describe work that actually happened. If a project involved structural changes, engineering or
        permits, say so accurately. If it didn’t, don’t imply that it did.
      </p>

      <h2 id="explain-the-scope">Explain the Scope Clearly</h2>
      <p>
        Homeowners are trying to work out whether your project resembles the one they’re planning. A short,
        honest scope list answers that quickly. For the hypothetical Markham project, it might look like this:
      </p>
      <ul>
        <li>Demolition</li>
        <li>New kitchen layout</li>
        <li>Cabinetry and countertops</li>
        <li>Electrical updates and new lighting</li>
        <li>Flooring</li>
        <li>Drywall and painting</li>
        <li>Finish carpentry</li>
      </ul>
      <p>
        The list should match the real job. If the countertops were supplied by someone else or the client
        handled the painting, leave those out or say so.
      </p>
      <p>
        Scope also helps homeowners understand the difference between a cosmetic renovation (new surfaces,
        fixtures and finishes in the same layout) and a larger, full-scope job that moves walls, plumbing or
        electrical. From photos alone the two can look similar, and a homeowner comparing your work to their
        plans needs to know which one they are looking at.
      </p>

      <h2 id="mention-the-location-naturally">Mention the Location Naturally</h2>
      <p>
        A real project in Markham does something no amount of copy can: it shows you have actually worked
        there. That makes location genuinely useful on a project page. Sensible places to include it:
      </p>
      <ul>
        <li>In the project title</li>
        <li>In the first paragraph</li>
        <li>In the property context, where it helps (a 1970s side-split, a newer townhouse)</li>
        <li>In a link to your service page for that type of work, or your page for that area if you have one</li>
      </ul>
      <p>What it should never look like is this:</p>
      <blockquote>
        <p>
          Our Markham renovation contractors provide Markham renovations to Markham homeowners looking for
          renovation contractors in Markham.
        </p>
      </blockquote>
      <p>
        Use the city because it’s a fact about the project, not because it’s a keyword. And never label a
        project with a town it wasn’t in. A homeowner who recognizes the street will notice, and the page
        stops being evidence of anything.
      </p>

      <h2 id="details-that-prove-it-is-real">Include Details That Prove the Project Is Real</h2>
      <p>
        Generic project copy is easy to produce. Anyone can write “a stunning transformation with
        high-quality finishes.” What makes a project page credible is detail that only comes from having done
        the work, such as:
      </p>
      <ul>
        <li>An awkward original layout and what you did about it</li>
        <li>Limited natural light</li>
        <li>Storage that had to fit into a tight space</li>
        <li>Keeping existing plumbing locations to control cost</li>
        <li>Why a particular material was chosen</li>
        <li>Working around finishes the homeowners wanted to keep</li>
        <li>Unusual room dimensions</li>
        <li>Phasing the work so the family could stay in the house</li>
        <li>What the homeowners cared about most</li>
      </ul>
      <p>
        <strong>The best project pages contain details that would be difficult to write if the project never
        happened.</strong> That is what separates a real case study from filler, for homeowners and for
        search engines alike.
      </p>
      <p>
        None of this requires private information. Document the work, not the clients: no names, no
        addresses, nothing about the household that they wouldn’t want published. If you’d like to show a
        testimonial or a recognizable exterior, ask first.
      </p>

      <h2 id="images-file-names-alt-text">Use Better Images, File Names and Alt Text</h2>
      <p>
        This part is technical, but it doesn’t need to be complicated. Your project images should:
      </p>
      <ul>
        <li>Load reasonably quickly, especially on a phone</li>
        <li>Look clear on a small screen</li>
        <li>Have descriptive file names</li>
        <li>Have accurate alt text</li>
        <li>Not be uploaded at full camera resolution, unless your site resizes them automatically</li>
      </ul>
      <p>
        A camera file name like <code>IMG_8472-final-final.jpg</code> tells nobody anything. Something like{' '}
        <code>markham-kitchen-renovation-white-oak-island.jpg</code> describes the photo. Google’s{' '}
        <ExternalLink href={GOOGLE_IMAGE_GUIDE}>image guidance</ExternalLink> says file names give it “very
        light clues” about an image, so treat good names as tidy housekeeping rather than a ranking trick.
      </p>
      <p>
        Alt text matters more. It describes the image for people using screen readers and for search engines.
        A good example:
      </p>
      <blockquote>
        <p>White oak kitchen island after main-floor renovation in Markham</p>
      </blockquote>
      <p>
        It describes what’s in the photo. What it shouldn’t be is a keyword list. Google specifically advises
        against filling alt attributes with keywords, so there’s no need to put “Markham kitchen renovation
        contractor” on every image.
      </p>

      <h2 id="project-facts-near-the-top">Put the Project Facts Near the Top</h2>
      <p>
        For larger projects, a short summary at the top of the page gives visitors the context before they
        start scrolling through photos. Using the same hypothetical project:
      </p>
      <dl className="blog-facts">
        <dt>Location</dt>
        <dd>Markham, Ontario</dd>
        <dt>Project type</dt>
        <dd>Main-floor renovation</dd>
        <dt>Work completed</dt>
        <dd>Kitchen, flooring, lighting, finish carpentry</dd>
        <dt>Property type</dt>
        <dd>Detached home</dd>
        <dt>Project focus</dt>
        <dd>Improving the layout and usable kitchen space</dd>
      </dl>
      <p>
        Only show facts you actually have. If you don’t want to publish budgets or timelines, leave them out
        rather than guessing. A guessed or invented figure does more harm than a missing one.
      </p>

      <h2 id="end-with-the-next-step">End With the Next Logical Step</h2>
      <p>
        Someone who has just read about a project like theirs is at the most useful moment you will get. A
        page that ends with nothing, or with a generic “Contact Us”, wastes it.
      </p>
      <p>End each project page with a prompt that follows on from the project, such as:</p>
      <blockquote>
        <p>
          Planning a similar main-floor renovation? Tell us about the property, the approximate scope and where
          you are in the planning process.
        </p>
      </blockquote>
      <p>
        Link it to a quote form that asks for exactly those things. No pop-ups, no countdown timers. The page
        has already done the persuading; the prompt only needs to make the next step easy.
      </p>

      <h2 id="which-projects-deserve-pages">Which Projects Deserve Their Own Pages?</h2>
      <p>
        Not every job needs a case study. Choose the ones that do the most commercial work for you:
      </p>
      <ul>
        <li>Projects in the services you want more of</li>
        <li>Higher-value work</li>
        <li>Especially strong transformations</li>
        <li>Jobs with good photo documentation from start to finish</li>
        <li>Work in the areas you most want to be known in</li>
        <li>Projects that show a capability customers often ask about</li>
      </ul>
      <p>
        If you want more full kitchen renovations, document your best kitchens properly. If you want larger
        additions, build detailed pages around additions. If basements are profitable and repeatable for you,
        give them the attention they deserve.
      </p>
      <p>
        <strong>Your portfolio should reflect the work you want more of, not every job you have ever
        completed.</strong>
      </p>

      <h2 id="galleries-vs-case-studies">Galleries vs. Case Studies</h2>
      <p>
        None of this means deleting your gallery. The two do different jobs, and a good site uses both:
      </p>
      <ul>
        <li>
          <strong>The gallery</strong> is for quick visual browsing. Someone wants a sense of your finish
          quality in thirty seconds.
        </li>
        <li>
          <strong>Project pages</strong> are for depth: the story, the scope, the location, and enough
          detail for a homeowner to judge whether the work is comparable to what they’re planning.
        </li>
      </ul>
      <p>
        Link the gallery’s strongest photos to their full project pages, and link each project page to the
        service it belongs to. That structure works better than either on its own.
      </p>

      <h2 id="ten-strong-projects">Ten Strong Projects Beat 100 Unexplained Photos</h2>
      <p>
        You don’t need hundreds of project pages. A handful of detailed ones will tell homeowners and search
        engines more about your company than a gallery of every job you’ve done. Each one follows the same
        pattern: where the project started, the problem, the scope, the work, the details that make it real,
        the finished result, the service and location it belongs to, and a clear next step.
      </p>

      <h2 id="project-page-checklist">Renovation Project Page Checklist</h2>
      <ul className="blog-checklist">
        <li>A clear project title</li>
        <li>The real project location, where appropriate</li>
        <li>The project type</li>
        <li>Before photos</li>
        <li>Finished photos</li>
        <li>A short explanation of the homeowners’ goal or problem</li>
        <li>A clear, accurate scope of work</li>
        <li>Specific project details</li>
        <li>Descriptive image file names</li>
        <li>Accurate alt text</li>
        <li>A link to the relevant service page</li>
        <li>A link to the relevant service area page, where useful</li>
        <li>A clear quote or contact prompt</li>
        <li>An image layout that works on a phone</li>
        <li>No stock or borrowed photos presented as your own work</li>
      </ul>

      <div className="blog-callout">
        <h3>Want More From Your Renovation Portfolio?</h3>
        <p>
          Zenara Designs builds websites for renovation companies, contractors and home-service businesses
          across the GTA.
        </p>
        <p>
          If you already have strong project photos but your website isn’t doing much with them, we can help
          organize those projects into a site that is easier for homeowners and search engines to understand.
          Explore our <Link href="/renovations">renovation company web design</Link> services or{' '}
          <Link href="/contact">talk to our team</Link> about your current website.
        </p>
      </div>
    </div>
  );
};

export const renovationProjectPagesPost: BlogPost = {
  slug: 'renovation-company-project-pages-seo',
  title: 'How Renovation Companies Should Build Project Pages That Rank and Win Leads',
  seoTitle: 'How to Build Better Renovation Project Pages | Zenara Designs',
  description:
    'Turn renovation photos into useful project pages. Learn how GTA contractors can structure case studies for SEO, homeowner trust and better quote requests.',
  excerpt:
    'Most contractors already have great project photos sitting in one unexplained gallery. Here is how to turn your strongest jobs into project pages that help homeowners and search engines understand your work.',
  featuredImageAlt:
    'Wireframe of a fictional renovation project page with before and after photos, a project scope list, location details and a quote request button.',
  author: 'Kavin Mural',
  publishedAt: new Date('2026-08-12'),
  tags: ['industry guides', 'renovation companies', 'SEO'],
  content: RenovationProjectPagesContent,
};
