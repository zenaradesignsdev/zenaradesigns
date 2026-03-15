# Zenara Designs Website

A modern, responsive website for Zenara Designs - a professional web design and development agency specializing in custom websites, business cards, and logo design for businesses in Toronto and the Greater Toronto Area (GTA).

## Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **SEO Optimized**: Comprehensive SEO with structured data, metadata API, and auto-generated sitemaps
- **Performance Focused**: Optimized for Core Web Vitals — image optimization via `next/image`, font optimization via `next/font`
- **Security Hardened**: Input validation, rate limiting, and security headers
- **Accessibility**: WCAG compliant with skip links and proper ARIA labels
- **Contact Form**: Secure email integration with Resend API
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zenaradesigns.git

# Navigate to the project directory
cd zenaradesigns

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Run the production build locally
npm run lint     # Run ESLint
```

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Next.js 14** - App Router, server components, file-system routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons

### Backend & Deployment
- **Vercel** - Serverless deployment platform
- **Resend** - Email API service
- **Next.js Route Handlers** - API endpoints under `src/app/api/`

### Development Tools
- **ESLint** - Code linting with Next.js and React Hooks rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page route
│   ├── [route]/         # Individual page routes
│   │   └── page.tsx
│   ├── api/             # Route Handlers (API endpoints)
│   │   ├── send-email/route.ts
│   │   └── reviews/route.ts
│   ├── sitemap.ts       # Auto-generated sitemap
│   └── robots.ts        # Robots directives
├── components/          # Reusable UI components
│   ├── Layout/          # Navbar, Footer
│   ├── pages/           # Page-level component implementations
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
└── utils/               # Helper utilities

public/
├── images/              # Static images (served at /images/*)
├── favicon.ico
└── site.webmanifest
```

## Email Integration

The contact form uses Resend for secure email delivery:

- **From**: `noreply@zenaradesigns.com`
- **To**: `info@zenaradesigns.com`
- **Security**: Input validation, rate limiting, XSS protection
- **API**: Next.js Route Handler (`src/app/api/send-email/route.ts`)

### Environment Variables

Create a `.env.local` file for local development:

```env
RESEND_API_KEY=re_your_resend_api_key
ALLOWED_ORIGIN=http://localhost:3000
GOOGLE_PLACE_ID=your_google_place_id
GOOGLE_PLACES_API_KEY=your_google_api_key
```

## Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables** in the Vercel dashboard:
   - `RESEND_API_KEY`: Your Resend API key
   - `ALLOWED_ORIGIN`: Your production domain (`https://zenaradesigns.com`)
   - `GOOGLE_PLACE_ID`: Google Place ID for reviews
   - `GOOGLE_PLACES_API_KEY`: Google Places API key
3. **Deploy**: Automatic deployment on every push to main

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## Configuration

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Update `ALLOWED_ORIGIN` environment variable to your production domain
3. Configure DNS records as instructed by Vercel

### SEO Configuration

- **Sitemap**: Auto-generated at `/sitemap.xml` via `src/app/sitemap.ts`
- **Robots**: Configured at `/robots.txt` via `src/app/robots.ts`
- **Metadata**: Per-page metadata via Next.js `metadata` exports and `generateMetadata`
- **Structured Data**: JSON-LD injected via `StructuredData` component

## Pages

- **Home** (`/`) - Landing page with services overview
- **About** (`/about`) - Company story and team
- **Services** (`/services`) - Detailed service offerings
- **Pricing** (`/pricing`) - Service packages and FAQ
- **Process** (`/process`) - Design and development workflow
- **Locations** (`/locations`) - Service areas in GTA
- **FAQ** (`/faq`) - Frequently asked questions
- **Security** (`/security`) - Security practices and policies
- **Mobile** (`/mobile`) - Mobile-first design information
- **Contact** (`/contact`) - Contact form and information

## License

This project is proprietary to Zenara Designs. All rights reserved.

## Support

For technical support or questions about this website:
- **Email**: info@zenaradesigns.com
- **Website**: https://zenaradesigns.com
