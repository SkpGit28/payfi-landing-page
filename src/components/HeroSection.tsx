import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import HeroVisual from './HeroVisual';
import { ArrowUpRight } from '@phosphor-icons/react';
import GhostButton from './GhostButton';

import { Page } from '../context/NavigationContext';

interface HeroProps {
    onNavigate: (page: Page) => void;
}

const CountUp: React.FC<{ value: string }> = ({ value }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const suffix = value.match(/[0-9.]([^0-9.]*)$/)?.[1] || '';
    const decimals = value.includes('.') ? value.split('.')[1].length : 0;

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        const formatted = latest.toFixed(decimals);
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

const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Classic reveal with overflow-hidden
        tl.from(".hero-line", {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out"
        })
            .from(".hero-description", {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, "-=0.3")
            .from(".hero-cta-container", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05
            }, "-=0.3")
            .from(".hero-visual", {
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
            }, "-=0.5")
            .from(".hero-metric", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05
            }, "-=0.4");

        // Much faster "invisible" word animation with permanent visible blur
        gsap.fromTo(".word-invisible", 
            { filter: "blur(10px)", opacity: 0 },
            {
                filter: "blur(2.5px)",
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            }
        );

        // Subtle floating for globe
        gsap.to(".hero-visual", {
            y: 8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-page-light-alt">
            <div className="max-container relative z-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="w-full z-20 pt-12 lg:pt-20">
                    <h1 className="font-technical font-bold text-[42px] md:text-[68px] text-secondary-base leading-[1.1] mb-8 tracking-[-0.04em]">
                        <div className="overflow-hidden w-fit pr-4">
                            <div className="hero-line whitespace-nowrap will-change-transform">Your business grows</div>
                        </div>
                        <div className="overflow-hidden w-fit pr-4">
                            <div className="hero-line mt-1 whitespace-nowrap will-change-transform">because payments</div>
                        </div>
                        <div className="overflow-hidden w-fit pr-4 py-4 -my-4">
                            <div className="hero-line mt-1 whitespace-nowrap will-change-transform">
                                are <span className="word-invisible text-brand-primary relative inline-block blur-[8px] opacity-0 select-none">invisible</span><span className="text-secondary-base">.</span>
                            </div>
                        </div>
                    </h1>
                    <p className="hero-description font-interface font-normal text-lg md:text-xl leading-[28px] text-secondary-light mb-12 max-w-lg">
                        Accept every payment method. Reduce friction. Grow faster. Trusted by 5,000+ businesses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="hero-cta-container">
                            <button
                                onClick={() => onNavigate('signup')}
                                className="group bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3.5 rounded-full font-interface font-semibold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                Get Started for Free
                                <div className="ml-1 p-1 rounded-full bg-white/20 group-hover:bg-page-light-alt group-hover:text-brand-primary transition-all duration-300">
                                    <ArrowUpRight className="w-3 h-3" weight="bold" />
                                </div>
                            </button>
                        </div>
                        <div className="hero-cta-container">
                            <GhostButton onClick={() => onNavigate('documentations')}>
                                Read Documentation
                            </GhostButton>
                        </div>
                    </div>
                </div>

                <div className="hero-visual relative w-full flex items-center justify-center lg:justify-end">
                    <HeroVisual className="w-full max-w-[500px] lg:max-w-[600px]" />
                </div>

                <div className="lg:col-span-2 mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-neutral-200/60 pt-12 text-center">
                    {[
                        { label: 'Active Merchants', value: '5,000+' },
                        { label: 'Processed Annually', value: '₹50k Cr+' },
                        { label: 'Uptime SLA', value: '99.99%' },
                        { label: 'Daily Transactions', value: '1M+' }
                    ].map((metric, index) => (
                        <div
                            key={index}
                            className="hero-metric group cursor-default flex flex-col items-center relative"
                        >
                            {index !== 3 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-neutral-200/60" />
                            )}
                            {index % 2 === 0 && (
                                <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-neutral-200/60" />
                            )}

                            <div className="font-technical font-bold text-2xl md:text-3xl text-secondary-base mb-1 group-hover:text-brand-primary transition-colors duration-300">
                                <CountUp value={metric.value} />
                            </div>
                            <div className="font-interface text-sm text-secondary-light/70 font-medium">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
