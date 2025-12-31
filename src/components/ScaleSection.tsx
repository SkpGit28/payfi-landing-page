import React from 'react';
import { motion } from 'framer-motion';

const ScaleSection: React.FC = () => {
    return (
        <section className="py-24 bg-page-light-alt overflow-hidden">
            <div className="max-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                            Scale with Payfi
                        </span>
                        <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-6 leading-tight">
                            Build for every scale
                        </h2>
                        <p className="font-interface text-secondary-light/80 text-lg leading-relaxed mb-8 max-w-xl">
                            Whether you're a startup processing your first transaction or an enterprise handling millions, Payfi provides the infrastructure to grow without limits. Our platform is engineered for high availability and peak performance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
                                <div className="text-secondary-base font-technical font-bold text-xl mb-2">Startups</div>
                                <p className="text-secondary-light/70 text-sm font-interface">Quick integration and zero maintenance to get you moving fast.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
                                <div className="text-secondary-base font-technical font-bold text-xl mb-2">Enterprises</div>
                                <p className="text-secondary-light/70 text-sm font-interface">Custom workflows, advanced security, and dedicated support.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-br from-brand-primary/10 to-transparent rounded-full absolute -inset-10 blur-3xl" />
                        <div className="relative bg-white border border-neutral-200/60 rounded-[32px] p-8 shadow-xl">
                            {/* Visual representation of scale/growth */}
                            <div className="space-y-6">
                                {[80, 60, 95, 70].map((width, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-interface font-bold text-secondary-light/40 uppercase tracking-wider">
                                            <span>Phase {i + 1}</span>
                                            <span>{width}%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${width}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                                className="h-full bg-brand-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ScaleSection;
