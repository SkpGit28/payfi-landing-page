import React, { useState } from 'react';

const EcommerceROI = () => {
    const [revenue, setRevenue] = useState(750000);
    const recovered = Math.round(revenue * 0.03); // Assuming 3% savings

    return (
        <div className="w-full bg-white rounded-2xl p-5">
            <h4 className="font-technical font-bold text-lg text-secondary-base mb-4">ROI Calculator</h4>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="font-interface text-sm font-medium text-secondary-light">Monthly Revenue (₹)</label>
                    <span className="font-technical font-bold text-secondary-base">₹{revenue.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="font-interface text-sm text-secondary-light mb-1">Recovered Revenue with Payfi</p>
                <p className="font-technical font-bold text-3xl text-green-600">+₹{recovered.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default EcommerceROI;
