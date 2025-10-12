import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSEO } from "@/hooks";

const NotFound = () => {
  const location = useLocation();

  // SEO meta tags
  useSEO({
    title: "Page Not Found | Zenara Designs Toronto",
    description: "The page you're looking for doesn't exist. Return to our homepage to explore our web design and development services in Toronto & GTA.",
    canonical: "https://zenaradesigns.com",
    noindex: true
  });

  useEffect(() => {
    // Track 404 errors for analytics if needed
    // console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Web Design Toronto - Page Not Found</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700" rel="noopener noreferrer">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
