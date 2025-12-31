import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import HeroVisual from './HeroVisual';
import { ArrowUpRight } from '@phosphor-icons/react';

import { Page } from '../context/NavigationContext';

interface HeroProps {
    onNavigate: (page: Page) => void;
}

const CountUp: React.FC<{ value: string }> = ({ value }) => {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true });

    // Extract number and suffix/prefix
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const suffix = value.match(/[0-9.]([^0-9.]*)$/)?.[1] || '';
    const decimals = value.includes('.') ? value.split('.')[1].length : 0;

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        const formatted = latest.toFixed(decimals);
        // Add commas for thousands
        if (decimals === 0) {
            return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return formatted;
    });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericValue, {
                duration: 2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, numericValue, count]);

    return (
        <span ref={nodeRef}>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
};

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-page-light-alt">
            <div className="max-container relative z-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl z-20 pt-12 lg:pt-20"
                >
                    <h1 className="font-technical font-bold text-5xl md:text-7xl text-secondary-base leading-none mb-8">
                        Your business grows because payments are <span className="text-brand-primary mt-2.5 relative inline-block blur-[3px] select-none">invisible</span><span className="text-secondary-base">.</span>
                    </h1>
                    <p className="font-interface font-normal text-lg md:text-xl leading-[28px] text-secondary-light mb-12 max-w-lg">
                        Accept every payment method. Reduce friction. Grow faster. Trusted by 5,000+ businesses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <button
                            onClick={() => onNavigate('signup')}
                            className="group bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3.5 rounded-full font-interface font-semibold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            Get Started for Free
                            <div className="ml-1 p-1 rounded-full bg-white/20 group-hover:bg-page-light-alt group-hover:text-brand-primary transition-all duration-300">
                                <ArrowUpRight className="w-3 h-3" weight="bold" />
                            </div>
                        </button>
                        <button
                            onClick={() => onNavigate('documentations')}
                            className="group relative bg-transparent text-secondary-base px-2 py-1 rounded-full font-interface font-medium text-base transition-all flex items-center justify-center gap-2"
                        >
                            <span className="relative">
                                Read Documentation
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-base group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </button>
                    </div>
                </motion.div>

                <div className="relative w-full flex items-center justify-center lg:justify-end">
                    <HeroVisual className="w-full max-w-[500px] lg:max-w-[600px]" />
                </div>

                {/* Metrics Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="lg:col-span-2 mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-neutral-200/60 pt-12 text-center"
                >
                    {[
                        { label: 'Active Merchants', value: '5,000+' },
                        { label: 'Processed Annually', value: '₹50k Cr+' },
                        { label: 'Uptime SLA', value: '99.99%' },
                        { label: 'Daily Transactions', value: '1M+' }
                    ].map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                            className="group cursor-default flex flex-col items-center relative"
                        >
                            {/* Vertical Divider */}
                            {index !== 3 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-neutral-200/60" />
                            )}
                            {/* Mobile Divider (for 2x2 grid) */}
                            {index % 2 === 0 && (
                                <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-neutral-200/60" />
                            )}
                            
                            <div className="font-technical font-bold text-2xl md:text-3xl text-secondary-base mb-1 group-hover:text-brand-primary transition-colors duration-300">
                                <CountUp value={metric.value} />
                            </div>
                            <div className="font-interface text-sm text-secondary-light/70 font-medium">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
