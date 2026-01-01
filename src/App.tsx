// Main App Component
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CaretDown,
    ShoppingBag,
    Stack,
    Briefcase,
    Globe,
    Buildings,
    Key,
    PlayCircle,
    ShieldCheck,
    Lock,
    Cube,
    Users
} from '@phosphor-icons/react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import WhyChooseUs from './components/WhyChooseUs';
import ScaleSection from './components/ScaleSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import { NavigationContext, Page } from './context/NavigationContext';
import DeveloperSection from './components/DeveloperSection';
import DocsPage from './pages/DocsPage';
import {
  INTEGRATION_GUIDES,
  API_ENDPOINTS,
  NO_CODE_GUIDES,
  CODE_SNIPPETS,
} from './components/Docs/PAYFI_DOCS_DATA';

import Lenis from 'lenis';
import { useScrollAnimations } from './hooks/useScrollAnimations';

// --- PAGES (Components) ---

const HomePage: React.FC = () => {
    const context = useContext(NavigationContext);
    const { containerRef } = useScrollAnimations();

    if (!context) return null;
    const { navigate } = context;

    return (
        <div ref={containerRef} className="font-interface text-secondary-base antialiased">
            <HeroSection onNavigate={navigate} />
            <WhyChooseUs />
            <ScaleSection />
            <DeveloperSection />
            <TestimonialsSection />
            <FAQSection />
            <PreFooter />
        </div>
    );
};

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    useLayoutEffect(() => {
        // 1. Disable native restoration immediately
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 2. Aggressive reset function
        const forceScrollTop = () => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        // 3. Fire immediately and repeatedly to fight browser restoration
        forceScrollTop();

        const timers: NodeJS.Timeout[] = [];
        [10, 50, 100, 200, 500].forEach(delay => {
            timers.push(setTimeout(forceScrollTop, delay));
        });

        // 4. Initialize Lenis ONLY if not on documentations page
        let lenis: Lenis | null = null;

        if (currentPage !== 'documentations') {
            lenis = new Lenis({
                duration: 2.0,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 0.8,
                touchMultiplier: 1.5,
            });

            // 5. Force Lenis to top
            lenis.scrollTo(0, { immediate: true });

            function raf(time: number) {
                lenis?.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        }

        // 6. Pre-unload reset (Belt and Suspenders)
        const handleBeforeUnload = () => {
            forceScrollTop();
            window.history.scrollRestoration = 'manual';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            lenis?.destroy();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            timers.forEach(clearTimeout);
        };
    }, [currentPage]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage />;
            case 'documentations': return <DocsPage />;
            // Add other pages here
            default: return <HomePage />;
        }
    };

    const navigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <NavigationContext.Provider value={{ navigate, currentPage }}>
            <div className="min-h-screen flex flex-col">
                {currentPage !== 'documentations' && <Navbar activeRoute={currentPage} />}

                <main className="flex-grow">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {currentPage !== 'documentations' && (
                    <>
                        <div className="w-full border-t border-dashed border-white/10 bg-secondary-base" />
                        <Footer />
                    </>
                )}
            </div>
        </NavigationContext.Provider>
    );
};

export default App;
