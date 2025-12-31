import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OFFERS = [
    "Now live: Apple Pay on PayGlocal's International Payment Gateway",
    "Get 0% processing fees for your first $10,000",
    "New: Instant Settlements now available for all merchants",
    "Join 5,000+ businesses growing with Payfi"
];

const AnnouncementBar: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-secondary-base w-full py-3.5 cursor-pointer group relative overflow-hidden">
            <div className="max-container flex justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-white font-interface text-xs md:text-sm font-medium text-center"
                    >
                        <span className="mr-2">💰</span>
                        {OFFERS[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Subtle hover effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};

export default AnnouncementBar;
