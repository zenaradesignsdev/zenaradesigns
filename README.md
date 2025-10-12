# Zenara Designs Website

A modern, responsive website for Zenara Designs - a professional web design and development agency specializing in custom websites, business cards, and logo design for businesses in Toronto and the Greater Toronto Area (GTA).

## 🌟 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **SEO Optimized**: Comprehensive SEO with structured data, meta tags, and sitemaps
- **Performance Focused**: Optimized for Core Web Vitals and fast loading times
- **Security Hardened**: Input validation, rate limiting, and security headers
- **Accessibility**: WCAG compliant with skip links and proper ARIA labels
- **Contact Form**: Secure email integration with Resend API
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

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

The development server will start at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons

### Backend & Deployment
- **Vercel** - Serverless deployment platform
- **Resend** - Email API service
- **Vercel Functions** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Navbar, Footer)
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── utils/              # Helper utilities
└── assets/             # Static assets (images, icons)

api/
└── send-email.ts       # Vercel serverless function for contact form

public/                 # Static files
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
└── favicon.ico         # Site favicon
```

## 📧 Email Integration

The contact form uses Resend for secure email delivery:

- **From**: `noreply@mail.zenaradesigns.com`
- **To**: `zenaradesigns.co@gmail.com`
- **Security**: Input validation, rate limiting, XSS protection
- **API**: Vercel serverless function (`/api/send-email.ts`)

### Environment Variables

Create a `.env.local` file for local development:

```env
RESEND_API_KEY=re_your_resend_api_key
ALLOWED_ORIGIN=http://localhost:8080
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables**:
   - `RESEND_API_KEY`: Your Resend API key
   - `ALLOWED_ORIGIN`: Your production domain
3. **Deploy**: Automatic deployment on every push to main

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔧 Configuration

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Update `ALLOWED_ORIGIN` environment variable
3. Configure DNS records as instructed by Vercel

### SEO Configuration

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots**: Configured at `/robots.txt`
- **Meta Tags**: Dynamic per page
- **Structured Data**: JSON-LD for better search visibility

## 📱 Pages

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Zenara Designs. All rights reserved.

## 📞 Support

For technical support or questions about this website:
- **Email**: zenaradesigns.co@gmail.com
- **Website**: https://zenaradesigns.com
