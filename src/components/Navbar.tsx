import React, { useState, useEffect, useContext, useRef } from 'react';
import { CaretDown, ShoppingBag, Stack, Briefcase, Globe, Buildings } from '@phosphor-icons/react';
import { NavigationContext, Page } from '../context/NavigationContext';
import AnnouncementBar from './AnnouncementBar';
import { ArrowUpRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface NavbarProps {
    activeRoute: Page;
}

const Navbar: React.FC<NavbarProps> = ({ activeRoute }) => {
    const context = useContext(NavigationContext);
    const navRef = useRef<HTMLElement>(null);

    if (!context) return null;
    const { navigate } = context;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Scrolled state for glass effect
            setScrolled(currentScrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.fromTo(".nav-content",
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
        );
    }, { scope: navRef });

    const navLinkClass = (route: Page) =>
        `cursor-pointer transition-colors font-interface font-bold text-[15px] ${activeRoute === route ? 'text-brand-primary font-bold' : 'text-secondary-base hover:text-brand-primary'}`;

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'}`}
        >
            <AnimatePresence>
                {!scrolled && <AnnouncementBar />}
            </AnimatePresence>
            <div className={`nav-content transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
                <div className="max-container flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
                            <img src="/PayfiLogo.png" alt="Payfi Logo" className="h-12 w-auto group-hover:scale-105 transition-transform" />
                        </div>

                        <div className="hidden md:flex items-center gap-8 font-medium">
                            <div className="relative group h-full py-2">
                                <button className="flex items-center gap-1 transition-colors font-interface font-bold text-[15px] text-secondary-base hover:text-brand-primary">
                                    Solution <CaretDown className="w-4 h-4" weight="bold" />
                                </button>
                                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50 border border-neutral-100">
                                    <div onClick={() => navigate('ecommerce')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-text-primary cursor-pointer font-interface">
                                        <ShoppingBag className="w-4 h-4 text-brand-primary" weight="bold" /> E-Commerce
                                    </div>
                                    <div onClick={() => navigate('saas')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-text-primary cursor-pointer font-interface">
                                        <Stack className="w-4 h-4 text-brand-primary" weight="bold" /> SaaS
                                    </div>
                                    <div onClick={() => navigate('services')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-text-primary cursor-pointer font-interface">
                                        <Briefcase className="w-4 h-4 text-brand-primary" weight="bold" /> Services
                                    </div>
                                    <div onClick={() => navigate('marketplaces')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-text-primary cursor-pointer font-interface">
                                        <Globe className="w-4 h-4 text-brand-primary" weight="bold" /> Marketplaces
                                    </div>
                                    <div onClick={() => navigate('enterprises')} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg text-sm text-text-primary cursor-pointer font-interface">
                                        <Buildings className="w-4 h-4 text-brand-primary" weight="bold" /> Enterprises
                                    </div>
                                </div>
                            </div>
                            <span onClick={() => navigate('company')} className={navLinkClass('company')}>Company</span>
                            <span onClick={() => navigate('documentations')} className={navLinkClass('documentations')}>Documentations</span>
                            <span onClick={() => navigate('pricing')} className={navLinkClass('pricing')}>Pricing</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="font-interface font-bold text-[15px] transition-colors hidden sm:block text-secondary-base hover:text-brand-primary">Log In</a>
                        <button className="group bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-interface font-semibold text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            Get Started
                            <div className="p-1 rounded-full bg-white/20 group-hover:bg-page-light-alt group-hover:text-brand-primary transition-all duration-300">
                                <ArrowUpRight className="w-3 h-3" weight="bold" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
