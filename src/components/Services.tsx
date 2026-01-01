import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    const [amount, setAmount] = useState('15,000');
    const [clientName, setClientName] = useState('Acme Corp');

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm p-5">
            <h4 className="font-technical font-bold text-lg text-secondary-base mb-4">Instant Invoice Generator</h4>
            
            {/* Amount Input */}
            <div className="mb-3">
                <label className="block font-interface text-xs font-bold text-secondary-light mb-1.5">Amount (₹)</label>
                <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 font-technical font-bold text-secondary-base focus:outline-none focus:border-brand-primary transition-colors"
                />
            </div>

            {/* Client Name Input */}
            <div className="mb-5">
                <label className="block font-interface text-xs font-bold text-secondary-light mb-1.5">Client Name</label>
                <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 font-interface font-medium text-secondary-base focus:outline-none focus:border-brand-primary transition-colors"
                />
            </div>

            {/* Generate Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-brand-primary text-white rounded-lg font-interface font-bold text-sm mb-5 shadow-md hover:shadow-lg transition-all"
            >
                Generate Payment Link
            </motion.button>

            {/* Preview Card */}
            <div className="border border-neutral-100 rounded-xl p-3 flex items-center justify-between bg-white shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a2332] flex items-center justify-center text-white font-bold">
                        P
                    </div>
                    <div>
                        <p className="font-interface text-[10px] font-bold text-secondary-light uppercase tracking-wider">Payment Request For</p>
                        <p className="font-interface font-bold text-secondary-base text-sm">{clientName}</p>
                        <p className="font-technical font-bold text-brand-primary">₹{amount}</p>
                    </div>
                </div>
                <div className="w-12 h-12 bg-[#1a2332] rounded flex items-center justify-center">
                    <span className="text-[8px] text-white font-mono">QR CODE</span>
                </div>
            </div>
        </div>
    );
};

export default Services;
