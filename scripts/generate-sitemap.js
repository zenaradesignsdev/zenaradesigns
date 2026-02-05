#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes configuration
const routes = [
  { url: "/", priority: 1.0, changefreq: "weekly" },
  { url: "/about", priority: 0.8, changefreq: "monthly" },
  { url: "/services", priority: 0.9, changefreq: "monthly" },
  { url: "/projects", priority: 0.8, changefreq: "weekly" },
  { url: "/pricing", priority: 0.8, changefreq: "monthly" },
  { url: "/contact", priority: 0.9, changefreq: "monthly" },
  { url: "/faq", priority: 0.7, changefreq: "monthly" },
  { url: "/pricing-guide", priority: 0.8, changefreq: "monthly" },
  { url: "/locations", priority: 0.7, changefreq: "monthly" },
  { url: "/process", priority: 0.8, changefreq: "monthly" },
  { url: "/security", priority: 0.7, changefreq: "monthly" },
  { url: "/mobile", priority: 0.7, changefreq: "monthly" },
  { url: "/blog", priority: 0.8, changefreq: "weekly" }
];

const baseUrl = 'https://zenaradesigns.com';
const currentDate = new Date().toISOString();

// Function to get blog posts (reads from the built/compiled output)
function getBlogPosts() {
  try {
    // Try to read the blog posts from the source
    // Since this runs at build time, we'll parse the TypeScript source
    const blogIndexPath = path.join(__dirname, '../src/content/blog/index.ts');
    if (fs.existsSync(blogIndexPath)) {
      const blogIndexContent = fs.readFileSync(blogIndexPath, 'utf-8');
      
      // Extract blog post slugs from the source
      // This is a simple regex approach - in production you might want a more robust solution
      const slugMatches = blogIndexContent.match(/slug:\s*['"]([^'"]+)['"]/g);
      if (slugMatches) {
        return slugMatches.map(match => {
          const slug = match.match(/['"]([^'"]+)['"]/)[1];
          return {
            url: `/blog/${slug}`,
            priority: 0.7,
            changefreq: 'monthly'
          };
        });
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not read blog posts for sitemap:', error.message);
  }
  return [];
}

function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add regular routes
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  // Add blog post routes
  const blogPosts = getBlogPosts();
  blogPosts.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
}

function generateImageSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  // Homepage images
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/</loc>\n`;
  sitemap += '    <image:image>\n';
  sitemap += `      <image:loc>${baseUrl}/logo-seo.png</image:loc>\n`;
  sitemap += '      <image:title>Zenara Designs Logo - Web Design Toronto</image:title>\n';
  sitemap += '      <image:caption>Professional web design and development agency logo serving Toronto and GTA</image:caption>\n';
  sitemap += '    </image:image>\n';
  sitemap += '    <image:image>\n';
  sitemap += `      <image:loc>${baseUrl}/website-example-realestate.png</image:loc>\n`;
  sitemap += '      <image:title>Real Estate Website Design Toronto - Property Showcase Platform</image:title>\n';
  sitemap += '      <image:caption>Professional real estate website design example for Toronto businesses</image:caption>\n';
  sitemap += '    </image:image>\n';
  sitemap += '    <image:image>\n';
  sitemap += `      <image:loc>${baseUrl}/website-example-rocket.png</image:loc>\n`;
  sitemap += '      <image:title>Rocket Launch Website Design Toronto - Modern Tech Startup Platform</image:title>\n';
  sitemap += '      <image:caption>Modern tech startup website design example for Toronto companies</image:caption>\n';
  sitemap += '    </image:image>\n';
  sitemap += '    <image:image>\n';
  sitemap += `      <image:loc>${baseUrl}/website-example-garden.png</image:loc>\n`;
  sitemap += '      <image:title>Garden &amp; Landscaping Website Design GTA - Professional Horticulture Business Platform</image:title>\n';
  sitemap += '      <image:caption>Professional garden and landscaping website design for GTA businesses</image:caption>\n';
  sitemap += '    </image:image>\n';
  sitemap += '    <image:image>\n';
  sitemap += `      <image:loc>${baseUrl}/website-example-travel.png</image:loc>\n`;
  sitemap += '      <image:title>Travel &amp; Tourism Website Design Toronto - Adventure Booking Platform</image:title>\n';
  sitemap += '      <image:caption>Travel and tourism website design example for Toronto businesses</image:caption>\n';
  sitemap += '    </image:image>\n';
  sitemap += '  </url>\n';
  
  sitemap += '</urlset>';
  return sitemap;
}

// Generate sitemaps
const sitemap = generateSitemap();
const imageSitemap = generateImageSitemap();

// Write to dist directory
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(distDir, 'image-sitemap.xml'), imageSitemap);

console.log('✅ Sitemap generated successfully');
console.log('📁 Files created:');
console.log('  - dist/sitemap.xml');
console.log('  - dist/image-sitemap.xml');
