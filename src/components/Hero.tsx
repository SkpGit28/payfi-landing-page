import React from 'react';
import { motion } from 'framer-motion';
import HeroVisual from './HeroVisual';

import { Page } from '../context/NavigationContext';

interface HeroProps {
    onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-page-light-alt">
            <div className="max-container relative z-20 grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl z-20"
                >
                    <h1 className="font-technical font-bold text-5xl md:text-7xl text-secondary-base leading-none md:tracking-normal mb-8">
                        Your Business Grows Because Payments Are <span className="text-brand-primary relative inline-block">Invisible.</span>
                    </h1>
                    <p className="font-interface font-normal text-lg md:text-xl leading-[28px] text-secondary-light mb-12 max-w-lg">
                        Accept every payment method. Reduce friction. Grow faster. Trusted by 5,000+ businesses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button
                            onClick={() => onNavigate('signup')}
                            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-10 py-5 rounded-xl font-interface font-semibold text-lg shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-1.5 flex items-center justify-center gap-2"
                        >
                            Create Account Free
                        </button>
                        <button
                            onClick={() => onNavigate('developers')}
                            className="bg-white hover:bg-neutral-50 text-secondary-base border border-neutral-200 px-10 py-5 rounded-xl font-interface font-semibold text-lg shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Read Documentation
                        </button>
                    </div>
                </motion.div>

                <div className="relative h-[700px] w-full flex items-center justify-center">
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
};

export default Hero;
