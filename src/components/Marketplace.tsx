import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Marketplace = () => {
    const [commission, setCommission] = useState(30);
    const total = 1000;
    const platformFee = Math.round(total * (commission / 100));
    const sellerAmount = total - platformFee;

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm p-5">
            <h4 className="font-technical font-bold text-lg text-secondary-base mb-4">Settlement Split Simulator</h4>

            {/* Slider Control */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="font-interface text-xs font-bold text-secondary-light">Your Commission</label>
                    <span className="font-technical font-bold text-violet-500">{commission}%</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
            </div>

            {/* Split Visual */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-3">
                <div className="flex justify-between text-[10px] font-bold text-secondary-light uppercase tracking-wider mb-2">
                    <span>You</span>
                    <span>Seller</span>
                </div>
                <div className="flex gap-2 h-16">
                    <motion.div
                        initial={false}
                        animate={{ flex: commission }}
                        className="bg-violet-500 rounded-lg flex items-center justify-center text-white font-technical font-bold shadow-sm"
                    >
                        ₹{platformFee}
                    </motion.div>
                    <motion.div
                        initial={false}
                        animate={{ flex: 100 - commission }}
                        className="bg-neutral-200 rounded-lg flex items-center justify-center text-secondary-base font-technical font-bold"
                    >
                        ₹{sellerAmount}
                    </motion.div>
                </div>
            </div>

            <div className="text-center">
                <p className="font-interface text-[10px] font-medium text-secondary-light">
                    Total Transaction Value: <span className="font-bold text-secondary-base">₹{total.toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
};

export default Marketplace;
