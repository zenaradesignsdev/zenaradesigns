import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals, initPerformanceObserver, analyzeResourceTiming } from "./lib/web-vitals";

// Initialize performance monitoring
initWebVitals();
initPerformanceObserver();

// Analyze resource timing after page load
window.addEventListener('load', () => {
  setTimeout(analyzeResourceTiming, 1000);
});

createRoot(document.getElementById("root")!).render(<App />);
