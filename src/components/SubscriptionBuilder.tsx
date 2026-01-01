import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SubscriptionBuilder: React.FC = () => {
    const [activeMode, setActiveMode] = useState<'flat' | 'seat' | 'usage'>('flat');

    const modes = {
        flat: {
            label: 'Flat Rate',
            price: '₹2,999',
            subtext: 'Simple recurring billing for standard SaaS.',
            code: '{ "interval": "month", "amount": 2999 }',
            progress: 'w-3/4'
        },
        seat: {
            label: 'Per Seat',
            price: '₹499/user',
            subtext: 'Prorated billing as teams grow or shrink.',
            code: '{ "interval": "month", "unit_amount": 499, "usage_type": "licensed" }',
            progress: 'w-1/2'
        },
        usage: {
            label: 'Usage Based',
            price: '₹1/API Call',
            subtext: 'Metered billing based on consumption.',
            code: '{ "usage_type": "metered", "billing_scheme": "per_unit" }',
            progress: 'w-full'
        }
    };

    const current = modes[activeMode];

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm p-5">
            <h4 className="font-technical font-bold text-lg text-secondary-base mb-4">Subscription Logic Builder</h4>

            {/* Toggle Buttons */}
            <div className="flex bg-blue-50 p-1 rounded-lg mb-5">
                {(Object.keys(modes) as Array<keyof typeof modes>).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setActiveMode(mode)}
                        className={`flex-1 py-1.5 text-xs font-bold font-interface rounded-md transition-all duration-300 ${activeMode === mode
                                ? 'bg-brand-primary text-white shadow-sm'
                                : 'text-secondary-light hover:text-brand-primary'
                            }`}
                    >
                        {modes[mode].label}
                    </button>
                ))}
            </div>

            {/* Checkout Preview Card */}
            <div className="bg-white border border-neutral-100 rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <span className="font-interface text-[10px] font-bold text-secondary-light uppercase tracking-wider">Checkout Preview</span>
                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded">Live</span>
                </div>
                <div className="mb-1">
                    <span className="font-technical font-bold text-3xl text-secondary-base">{current.price}</span>
                </div>
                <p className="font-interface text-secondary-light/80 text-xs mb-3">{current.subtext}</p>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                        layoutId="progress"
                        className={`h-full bg-brand-primary rounded-full ${current.progress}`}
                    />
                </div>
            </div>

            {/* Code Snippet */}
            <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-[10px] text-slate-300 overflow-x-auto">
                <div className="text-brand-primary mb-1">// API Payload Configuration</div>
                <div className="whitespace-nowrap">{current.code}</div>
            </div>
        </div>
    );
};

export default SubscriptionBuilder;
