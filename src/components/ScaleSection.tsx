import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryKey = 'startups' | 'enterprises' | 'ecommerce' | 'marketplace';

interface CategoryContent {
    headline: string;
    body: string;
    features: string[];
}

const ScaleSection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('startups');

    const categories: Record<CategoryKey, CategoryContent> = {
        startups: {
            headline: "Build for every scale",
            body: "Whether you're processing your first transaction or handling thousands daily, Payfi provides the infrastructure to grow without limits. Quick integration and zero maintenance to get you moving fast.",
            features: [
                "Go live in 2 hours",
                "Zero setup fees",
                "Auto-scaling infrastructure",
                "24/7 support"
            ]
        },
        enterprises: {
            headline: "Enterprise-grade infrastructure",
            body: "Our platform is engineered for high availability and peak performance. Custom workflows, advanced security, and dedicated support for your mission-critical operations.",
            features: [
                "99.99% uptime SLA",
                "Custom integrations",
                "Dedicated account manager",
                "Advanced fraud protection"
            ]
        },
        ecommerce: {
            headline: "Optimized for online stores",
            body: "Reduce cart abandonment and increase conversions with our seamless checkout experience. One-click checkouts, cart recovery, and instant refunds keep your customers happy.",
            features: [
                "One-click checkout",
                "Cart abandonment recovery",
                "Instant refunds",
                "Multiple payment methods"
            ]
        },
        marketplace: {
            headline: "Built for multi-vendor platforms",
            body: "Manage complex payment flows with ease. Split payments automatically, provide vendor dashboards, and handle automated settlements between multiple parties.",
            features: [
                "Automatic payment splits",
                "Vendor dashboards",
                "Automated settlements",
                "Commission management"
            ]
        }
    };

    const pills: { key: CategoryKey; label: string }[] = [
        { key: 'startups', label: 'Startups' },
        { key: 'enterprises', label: 'Enterprises' },
        { key: 'ecommerce', label: 'E-commerce' },
        { key: 'marketplace', label: 'Marketplace' }
    ];

    const activeContent = categories[activeCategory];

    return (
        <section className="py-24 bg-page-light-alt overflow-hidden">
            <div className="max-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                        Scale with Payfi
                    </span>
                </motion.div>

                {/* Pill Navigation */}
                <div className="flex flex-wrap gap-3 mb-16">
                    {pills.map((pill) => (
                        <button
                            key={pill.key}
                            onClick={() => setActiveCategory(pill.key)}
                            className={`px-6 py-3 rounded-full font-interface font-semibold text-sm transition-all duration-300 ${activeCategory === pill.key
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                                    : 'border-2 border-neutral-200 text-secondary-base hover:border-brand-primary/50 hover:bg-brand-primary/5'
                                }`}
                        >
                            {pill.label}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Dynamic Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-6 leading-tight">
                                {activeContent.headline}
                            </h2>
                            <p className="font-interface text-secondary-light/80 text-lg leading-relaxed mb-8 max-w-xl">
                                {activeContent.body}
                            </p>
                            <div className="space-y-3">
                                {activeContent.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                        <span className="font-interface text-secondary-light/90 font-medium">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Right: Visual Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="aspect-square bg-gradient-to-br from-brand-primary/10 to-transparent rounded-full absolute -inset-10 blur-3xl" />
                            <div className="relative bg-white border border-neutral-200/60 rounded-[32px] p-8 shadow-xl">
                                {/* Visual representation */}
                                <div className="space-y-6">
                                    {activeContent.features.map((feature, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-interface font-bold text-secondary-light/40 uppercase tracking-wider">
                                                <span>{feature}</span>
                                                <span>{85 + i * 3}%</span>
                                            </div>
                                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${85 + i * 3}%` }}
                                                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                                                    className="h-full bg-brand-primary rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ScaleSection;
