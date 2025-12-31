import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { XCircle, CheckCircle } from '@phosphor-icons/react';

interface CardProps {
    painPoint: string;
    solution: string;
    autoFlip?: boolean;
}

const FlipCard: React.FC<CardProps> = ({ painPoint, solution, autoFlip }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (autoFlip && isInView) {
            const timer = setTimeout(() => {
                setIsFlipped(true);
                setTimeout(() => setIsFlipped(false), 1500);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [autoFlip, isInView]);

    return (
        <div
            ref={ref}
            className="relative h-[200px] w-full perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Front Side (Pain Point) */}
                <div className="absolute inset-0 backface-hidden bg-red-50/40 border border-red-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <XCircle className="w-8 h-8 text-red-500" weight="fill" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-400/60 font-interface">Pain Point</span>
                    </div>
                    <p className="font-technical font-bold text-lg leading-tight text-secondary-base">
                        {painPoint}
                    </p>
                </div>

                {/* Back Side (Solution) */}
                <div
                    className="absolute inset-0 backface-hidden bg-secondary-base rounded-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] shadow-lg"
                >
                    <div className="flex items-start justify-between">
                        <CheckCircle className="w-8 h-8 text-emerald-400" weight="fill" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-interface">The Payfi Way</span>
                    </div>
                    <p className="font-technical font-bold text-lg leading-tight text-white">
                        {solution}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const WhyChooseUs: React.FC = () => {
    const cards = [
        {
            painPoint: "Stuck supporting only 2-3 payment methods",
            solution: "One integration. All methods (UPI, Cards, BNPL)"
        },
        {
            painPoint: "Integration takes weeks of dev time",
            solution: "Go live in 2 hours. Seriously."
        },
        {
            painPoint: "Failed payments lose 3-5% of revenue",
            solution: "Smart retries save every transaction possible"
        },
        {
            painPoint: "Managing multiple dashboards is a nightmare",
            solution: "One dashboard. One API. Total control."
        },
        {
            painPoint: "High transaction failure rates",
            solution: "99.99% success rate with dynamic routing"
        },
        {
            painPoint: "Complex settlement cycles & delayed payouts",
            solution: "T+0 settlements for better cash flow"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                        The Payfi Advantage
                    </span>
                    <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-4">
                        Why to choose PayFI?
                    </h2>
                    <p className="font-interface text-secondary-light/70 text-lg max-w-2xl">
                        Payments shouldn't be this hard. We've rebuilt the stack from the ground up to help you scale faster.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <FlipCard
                            key={index}
                            {...card}
                            autoFlip={index === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
