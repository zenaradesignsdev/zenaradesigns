import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SkipLinks from '../SkipLinks';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLinks />
      <Navbar />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;