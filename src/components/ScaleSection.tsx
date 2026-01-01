import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import SubscriptionBuilder from './SubscriptionBuilder';
import GhostButton from './GhostButton';
import EcommerceROI from './EcommerceROI';
import Services from './Services';
import Marketplace from './Marketplace';

type TabKey = 'saas' | 'services' | 'ecommerce' | 'marketplace';

interface TabContent {
    id: TabKey;
    label: string;
    heading: string;
    description: string;
    features: string[];
    visualColor: string;
    containerColor: string;
    ctaText: string;
}

const ScaleSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('saas');

    const tabs: TabContent[] = [
        {
            id: 'saas',
            label: 'SaaS',
            heading: 'Subscriptions Made Simple',
            description: 'Automate recurring billing, manage churn, and scale your subscription business globally.',
            features: ['Recurring billing', 'Churn management', 'Usage-based pricing', 'Revenue recognition'],
            visualColor: 'bg-blue-500',
            containerColor: 'bg-blue-50/50',
            ctaText: 'Start Building Now'
        },
        {
            id: 'services',
            label: 'Services',
            heading: 'Get Paid 3x Faster',
            description: 'Freelancers and agencies lose hours creating invoices. With Payfi, generate a professional payment link in seconds and get paid instantly via UPI or Card.',
            features: ['Automated invoicing', 'Client management', 'Multi-currency support', 'Expense tracking'],
            visualColor: 'bg-purple-500',
            containerColor: 'bg-purple-50/50',
            ctaText: 'Contact Sales'
        },
        {
            id: 'ecommerce',
            label: 'E-commerce',
            heading: 'Stop Losing Customers at Checkout',
            description: "Cart abandonment kills 70% of e-commerce sales. Payfi's seamless checkout flow is designed to capture every sale.",
            features: ['Global payments', 'Fraud protection', 'One-click checkout', 'Real-time analytics'],
            visualColor: 'bg-emerald-500',
            containerColor: 'bg-emerald-50/50',
            ctaText: 'View Documentation'
        },
        {
            id: 'marketplace',
            label: 'Marketplace',
            heading: 'Power Your Multi-Vendor Platform',
            description: 'Automatically split payments between your platform and your sellers. Handle refunds, chargebacks, and tax compliance effortlessly.',
            features: ['Split payments', 'Automated onboarding', 'KYC/KYB compliance', 'Instant payouts'],
            visualColor: 'bg-violet-500',
            containerColor: 'bg-violet-50/50',
            ctaText: 'Explore Platform'
        }
    ];

    const activeContent = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Navigation & Content */}
                    <div className="flex flex-col justify-center">
                        <span className="gsap-fade-up font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-6 block">
                            Scale with Payfi
                        </span>

                        {/* Pill Navigation */}
                        <div className="gsap-fade-up flex flex-wrap gap-3 mb-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold font-interface transition-all duration-300 border ${activeTab === tab.id
                                        ? 'bg-brand-primary text-white border-brand-primary'
                                        : 'bg-white text-secondary-light border-neutral-200 hover:border-secondary-base/50 hover:text-secondary-base'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-neutral-200/60 my-6" />

                        {/* Dynamic Content */}
                        <div className="relative min-h-[280px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <h3 className="gsap-fade-up font-technical font-bold text-3xl md:text-4xl text-secondary-base mb-6">
                                        {activeContent.heading}
                                    </h3>
                                    <p className="gsap-fade-up font-interface text-secondary-light/80 text-lg leading-relaxed mb-8 max-w-xl">
                                        {activeContent.description}
                                    </p>
                                    <div className="gsap-stagger-children space-y-4 mb-8">
                                        {activeContent.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <span className="font-interface font-medium text-secondary-base">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contextual CTA */}
                                    <GhostButton
                                        className="text-secondary-base"
                                        arrowColor={activeContent.visualColor}
                                        showArrowBg={true}
                                    >
                                        {activeContent.ctaText}
                                    </GhostButton>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Visual */}
                    <div
                        className={`relative w-full h-[520px] rounded-[32px] p-8 md:p-12 ${activeContent.containerColor} border border-neutral-200/60 shadow-sm overflow-hidden flex flex-col items-center justify-center transition-colors duration-500`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full flex justify-center z-10"
                            >
                                {/* Inner Graphic Container (White BG) */}
                                <div className={`relative w-full max-w-md ${activeTab === 'saas' ? '' : 'bg-white rounded-2xl shadow-sm p-8'}`}>
                                    {activeTab === 'ecommerce' ? (
                                        <EcommerceROI />
                                    ) : activeTab === 'saas' ? (
                                        <SubscriptionBuilder />
                                    ) : activeTab === 'services' ? (
                                        <Services />
                                    ) : activeTab === 'marketplace' ? (
                                        <Marketplace />
                                    ) : (
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`w-24 h-24 mb-6 rounded-2xl ${activeContent.visualColor} flex items-center justify-center text-white shadow-lg`}>
                                                <span className="font-technical font-bold text-4xl">
                                                    {activeContent.label[0]}
                                                </span>
                                            </div>
                                            <div className="w-full space-y-3">
                                                <div className="h-3 w-3/4 bg-neutral-100 rounded-full mx-auto" />
                                                <div className="h-3 w-1/2 bg-neutral-100 rounded-full mx-auto" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background Decoration */}
                        <div className={`absolute inset-0 ${activeContent.visualColor} opacity-[0.05] pointer-events-none transition-colors duration-500`} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScaleSection;
