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
    Cube
} from '@phosphor-icons/react';
import HeroVisual from './components/HeroVisual';

// --- TYPES ---
type Page = 'home' | 'developers' | 'pricing' | 'ecommerce' | 'saas' | 'services' | 'marketplaces' | 'enterprises' | 'signup';

interface NavigationContextType {
    navigate: (page: Page) => void;
    currentPage: Page;
}

// --- GLOBAL NAVIGATION CONTEXT ---
const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

// --- SHARED COMPONENTS ---
interface NavbarProps {
    activeRoute: Page;
}

const Navbar: React.FC<NavbarProps> = ({ activeRoute }) => {
    const context = useContext(NavigationContext);
    if (!context) return null;
    const { navigate } = context;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClass = (route: Page) =>
        `cursor-pointer transition-colors ${activeRoute === route ? 'text-orange font-bold' : 'text-navy-light hover:text-orange'}`;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4 shadow-sm' : 'bg-white/80 backdrop-blur-md py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-105 transition-transform">P</div>
                    <span className="font-display font-bold text-2xl text-navy">Payfi</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium">
                    <div className="relative group h-full py-2">
                        <button className="flex items-center gap-1 text-navy-light hover:text-orange transition-colors">
                            Solutions <CaretDown className="w-4 h-4" weight="bold" />
                        </button>
                        <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50 border border-neutral-100">
                            <div onClick={() => navigate('ecommerce')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-navy cursor-pointer">
                                <ShoppingBag className="w-4 h-4 text-orange" weight="bold" /> E-Commerce
                            </div>
                            <div onClick={() => navigate('saas')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-navy cursor-pointer">
                                <Stack className="w-4 h-4 text-teal" weight="bold" /> SaaS
                            </div>
                            <div onClick={() => navigate('services')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-navy cursor-pointer">
                                <Briefcase className="w-4 h-4 text-blue-500" weight="bold" /> Services
                            </div>
                            <div onClick={() => navigate('marketplaces')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-navy cursor-pointer">
                                <Globe className="w-4 h-4 text-purple-500" weight="bold" /> Marketplaces
                            </div>
                            <div onClick={() => navigate('enterprises')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-navy cursor-pointer">
                                <Buildings className="w-4 h-4 text-gray-700" weight="bold" /> Enterprises
                            </div>
                        </div>
                    </div>
                    <span onClick={() => navigate('developers')} className={navLinkClass('developers')}>Developers</span>
                    <span onClick={() => navigate('pricing')} className={navLinkClass('pricing')}>Pricing</span>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="font-medium text-navy hover:text-orange transition-colors hidden sm:block">Log In</a>
                    <button className="bg-navy hover:bg-navy-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Create Account</button>
                </div>
            </div>
        </nav>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 border-b border-white/10 pb-12 mb-8">
            <div>
                <div className="font-display font-bold text-2xl mb-4">Payfi</div>
                <p className="text-neutral-400 text-sm max-w-xs">The financial backbone for the internet economy.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-neutral-400">
                <div className="flex flex-col gap-3"><span className="text-white font-bold">Product</span><a href="#" className="hover:text-orange">Payment Gateway</a><a href="#" className="hover:text-orange">Payment Links</a></div>
                <div className="flex flex-col gap-3"><span className="text-white font-bold">Company</span><a href="#" className="hover:text-orange">About Us</a><a href="#" className="hover:text-orange">Careers</a></div>
                <div className="flex flex-col gap-3"><span className="text-white font-bold">Legal</span><a href="#" className="hover:text-orange">Privacy</a><a href="#" className="hover:text-orange">Terms</a></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-sm text-neutral-500 flex justify-between"><p>© 2025 Payfi Fintech Pvt Ltd.</p><div className="flex gap-4"><span>PCI DSS Level 1</span><span>ISO 27001</span></div></div>
    </footer>
);

// --- PAGES (Components) ---

const HomePage: React.FC = () => {
    const context = useContext(NavigationContext);
    if (!context) return null;
    const { navigate } = context;
    return (
        <div className="font-interface text-navy antialiased pt-16">
            <section className="relative min-h-[90vh] flex items-center pt-10 overflow-visible bg-neutral-50">
                <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl z-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-light text-orange-dark font-medium text-sm mb-6 shadow-sm border border-orange/20">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
                            New: Instant Settlements v2.0
                        </div>
                        <h1 className="font-display font-bold text-5xl md:text-7xl text-navy leading-[1.1] mb-6 tracking-tight">
                            Your Business Grows Because Payments Are <span className="text-orange relative">Invisible.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-lg">
                            Accept every payment method. Reduce friction. Grow faster. Trusted by 5,000+ businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('signup')} className="bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-orange/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                Create Account Free
                            </button>
                            <button onClick={() => navigate('developers')} className="bg-white hover:bg-neutral-50 text-navy border border-neutral-100 px-8 py-4 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                                Read Documentation
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative h-[600px] w-full flex items-center justify-center lg:-ml-20">
                        <HeroVisual />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-navy">Built for every scale</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div onClick={() => navigate('ecommerce')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-orange-light text-orange rounded-lg flex items-center justify-center mb-4"><ShoppingBag className="w-6 h-6" weight="bold" /></div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange transition-colors">For E-Commerce</h3>
                            <p className="text-neutral-400 text-sm">Reduce cart abandonment and handle high volume sales effortlessly.</p>
                        </div>
                        <div onClick={() => navigate('saas')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-teal-light text-teal rounded-lg flex items-center justify-center mb-4"><Stack className="w-6 h-6" weight="bold" /></div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors">For SaaS</h3>
                            <p className="text-neutral-400 text-sm">Recurring billing, subscription management, and global payouts.</p>
                        </div>
                        <div onClick={() => navigate('marketplaces')} className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4"><Globe className="w-6 h-6" weight="bold" /></div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">For Marketplaces</h3>
                            <p className="text-neutral-400 text-sm">Split payments, seller management, and multi-party settlements.</p>
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
                {currentPage !== 'developers' && <Navbar activeRoute={currentPage} />}

                {currentPage === 'developers' && (
                    <nav className="fixed top-0 left-0 right-0 z-50 bg-dev-bg border-b border-dev-border py-4 px-6 flex justify-between items-center text-dev-text">
                        <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                            <div className="w-8 h-8 bg-dev-surface border border-dev-border rounded flex items-center justify-center font-bold">P</div>
                            <span className="font-display font-bold text-xl">Payfi <span className="text-dev-muted font-mono text-sm font-normal ml-2">/ Developers</span></span>
                        </div>
                        <div className="flex gap-4 text-sm font-medium">
                            <span onClick={() => navigate('home')} className="cursor-pointer hover:text-white">Exit</span>
                        </div>
                    </nav>
                )}

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

                {currentPage !== 'developers' && <Footer />}
            </div>
        </NavigationContext.Provider>
    );
};

export default App;
