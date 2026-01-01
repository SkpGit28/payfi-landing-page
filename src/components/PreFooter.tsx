import React from 'react';
import { motion } from 'framer-motion';

const PreFooter: React.FC = () => {
    return (
        <section className="relative py-32 bg-secondary-base overflow-hidden">
            {/* Vanishing Grid Lines Effect */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                    }}
                />
            </div>

            <div className="max-container relative z-10 text-center">
                <div
                    className="gsap-fade-up"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2 animate-pulse" />
                        <span className="font-interface text-xs font-medium text-white/80 tracking-wider uppercase">
                            API v2.0 Live
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="font-technical font-bold text-4xl md:text-6xl text-white mb-6 tracking-tight">
                        Ready to experience real growth?
                    </h2>

                    {/* Description */}
                    <p className="font-interface text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Join the thousands of businesses scaling with Payfi. Still have doubts or questions? We're here to help you every step of the way.
                    </p>

                    {/* CTA Form */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-interface focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-white/20"
                            />
                        </div>
                        <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-secondary-base font-interface font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg shadow-white/5 whitespace-nowrap">
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreFooter;
