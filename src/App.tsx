import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { CustomCursor } from './components/CustomCursor';
import { ContentProtection } from './components/ContentProtection';
import { BrandedLoader } from './components/BrandedLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { PageTurnSweep } from './components/PageTurnSweep';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { TestimoniesPage } from './pages/TestimoniesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Route outlet wrapped in AnimatePresence so each page's `exit` variant
 * actually plays before the next page mounts (mode="wait").
 */
const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:id" element={<ProjectDetailPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/testimonies" element={<TestimoniesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      {/* Short Branded Preloader */}
      {!loadingComplete && (
        <BrandedLoader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Desktop Dynamic Cursor */}
      <CustomCursor />

      {/* Anti-copy & Content Protection */}
      <ContentProtection />

      {/* Global reading progress + page-turn sweep */}
      <ScrollProgress />
      <PageTurnSweep />

      {/* Global Wrapper */}
      <div className="flex flex-col min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black">
        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* Route Outlets — mounted after the preloader so the first
            page reveal plays in front of the visitor. */}
        <div className="flex-grow flex flex-col">
          {loadingComplete && <AppRoutes />}
        </div>

        {/* Floating WhatsApp Quick Action */}
        <WhatsAppFloating />

        {/* Minimal Editorial Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

