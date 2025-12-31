import React, { useState, useEffect, useContext } from 'react';
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
import HeroVisual from './components/HeroVisual';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import DevNavbar from './components/DevNavbar';
import WhyChooseUs from './components/WhyChooseUs';
import ScaleSection from './components/ScaleSection';
import { NavigationContext, Page } from './context/NavigationContext';


const Footer: React.FC = () => (
    <footer className="bg-navy text-white py-16">
        <div className="max-container flex flex-col md:flex-row justify-between gap-12 border-b border-white/10 pb-12 mb-8">
            <div>
                <div className="font-technical font-bold text-2xl mb-4">Payfi</div>
                <p className="font-interface font-normal text-sm leading-[20px] text-neutral-400 max-w-xs">The financial backbone for the internet economy.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-neutral-400">
                <div className="flex flex-col gap-3 font-interface"><span className="text-white font-bold">Product</span><a href="#" className="hover:text-orange">Payment Gateway</a><a href="#" className="hover:text-orange">Payment Links</a></div>
                <div className="flex flex-col gap-3 font-interface"><span className="text-white font-bold">Company</span><a href="#" className="hover:text-orange">About Us</a><a href="#" className="hover:text-orange">Careers</a></div>
                <div className="flex flex-col gap-3 font-interface"><span className="text-white font-bold">Legal</span><a href="#" className="hover:text-orange">Privacy</a><a href="#" className="hover:text-orange">Terms</a></div>
            </div>
        </div>
        <div className="max-container text-sm text-neutral-500 flex justify-between font-interface"><p>© 2025 Payfi Fintech Pvt Ltd.</p><div className="flex gap-4"><span>PCI DSS Level 1</span><span>ISO 27001</span></div></div>
    </footer>
);

// --- PAGES (Components) ---

const HomePage: React.FC = () => {
    const context = useContext(NavigationContext);
    if (!context) return null;
    const { navigate } = context;
    return (
        <div className="font-interface text-secondary-base antialiased">
            <Hero onNavigate={navigate} />
            <WhyChooseUs />
            <ScaleSection />

            <section className="py-24 bg-white relative z-20">
                <div className="max-container">
                    <div className="text-center mb-16">
                        <h2 className="font-technical font-bold text-3xl leading-[36px] text-navy">Built for every scale</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div onClick={() => navigate('ecommerce')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-orange-light text-orange rounded-lg flex items-center justify-center mb-4"><ShoppingBag className="w-6 h-6" weight="bold" /></div>
                            <h3 className="font-interface font-bold text-xl leading-[28px] mb-2 group-hover:text-orange transition-colors">For E-Commerce</h3>
                            <p className="font-interface font-normal text-sm leading-[20px] text-neutral-400">Reduce cart abandonment and handle high volume sales effortlessly.</p>
                        </div>
                        <div onClick={() => navigate('saas')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-teal-light text-teal rounded-lg flex items-center justify-center mb-4"><Stack className="w-6 h-6" weight="bold" /></div>
                            <h3 className="font-interface font-bold text-xl leading-[28px] mb-2 group-hover:text-teal transition-colors">For SaaS</h3>
                            <p className="font-interface font-normal text-sm leading-[20px] text-neutral-400">Manage subscriptions and recurring billing with ease.</p>
                        </div>
                        <div onClick={() => navigate('marketplaces')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-purple-light text-purple rounded-lg flex items-center justify-center mb-4"><Users className="w-6 h-6" weight="bold" /></div>
                            <h3 className="font-interface font-bold text-xl leading-[28px] mb-2 group-hover:text-purple transition-colors">For Marketplaces</h3>
                            <p className="font-interface font-normal text-sm leading-[20px] text-neutral-400">Onboard sellers and automate split payments globally.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage />;
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
                {currentPage === 'documentations' ? <DevNavbar /> : <Navbar activeRoute={currentPage} />}

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

                {currentPage !== 'documentations' && <Footer />}
            </div>
        </NavigationContext.Provider>
    );
};

export default App;
