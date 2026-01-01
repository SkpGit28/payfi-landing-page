import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';
import GhostButton from './GhostButton';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-neutral-200 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group transition-all"
            >
                <span className={`font-technical text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-secondary-base group-hover:text-brand-primary'}`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-neutral-100 text-secondary-light group-hover:bg-brand-primary/10 group-hover:text-brand-primary'}`}>
                    {isOpen ? <Minus weight="bold" className="w-4 h-4" /> : <Plus weight="bold" className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 pr-12">
                            <p className="font-interface text-secondary-light/80 text-base md:text-lg leading-relaxed">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How long does it take to integrate Payfi?",
            answer: "Most businesses can go live with Payfi in under 2 hours. Our modern APIs and comprehensive documentation are designed for developers to get up and running quickly. We also provide pre-built checkout components that can be dropped into your application with just a few lines of code."
        },
        {
            question: "What are the transaction fees?",
            answer: "We offer competitive, transparent pricing with no hidden charges. Our standard rate is 2% per successful transaction. For high-volume businesses, we offer custom enterprise pricing tailored to your specific needs and volume. You only pay for successful transactions."
        },
        {
            question: "Is Payfi secure and compliant?",
            answer: "Absolutely. Payfi is PCI DSS Level 1 compliant, which is the highest level of security in the payments industry. We use advanced encryption and tokenization to ensure that sensitive payment data never touches your servers, reducing your compliance burden and keeping your customers safe."
        },
        {
            question: "Which payment methods do you support?",
            answer: "We support over 100+ payment methods including all major Credit and Debit cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Netbanking from 50+ banks, and popular digital wallets. We also support international payments in 90+ currencies."
        },
        {
            question: "How do settlements work?",
            answer: "By default, we offer T+2 settlements. However, for eligible businesses, we provide Instant Settlements and T+0 settlements to help you manage your cash flow more effectively. You can track all your settlements in real-time through our merchant dashboard."
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-container max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Left Side: Header */}
                    <div className="lg:col-span-1">
                        <div
                            className="gsap-fade-up"
                        >
                            <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                                Support
                            </span>
                            <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-6 leading-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="font-interface text-secondary-light text-lg mb-8">
                                Can't find what you're looking for? Reach out to our support team for personalized assistance.
                            </p>
                            <GhostButton className="text-brand-primary">
                                Contact Support
                            </GhostButton>
                        </div>
                    </div>

                    {/* Right Side: FAQ Accordion */}
                    <div className="lg:col-span-2">
                        <div
                            className="gsap-stagger-children bg-neutral-50/50 rounded-[32px] p-8 md:p-12 border border-neutral-200/60"
                        >
                            <div className="divide-y divide-neutral-200">
                                {faqs.map((faq, index) => (
                                    <FAQItem
                                        key={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openIndex === index}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
