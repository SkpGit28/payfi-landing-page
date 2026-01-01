import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface GhostButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    arrowColor?: string;
    showArrowBg?: boolean;
}

const GhostButton: React.FC<GhostButtonProps> = ({
    children,
    onClick,
    className = "",
    arrowColor = "currentColor",
    showArrowBg = false
}) => {
    return (
        <motion.button
            whileHover={{ x: 5 }}
            onClick={onClick}
            className={`group relative font-interface font-bold text-base flex items-center gap-2 ${className}`}
        >
            <span className="underline underline-offset-4 decoration-current">
                {children}
            </span>
            <div className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${showArrowBg ? `p-1 rounded-full ${arrowColor} text-white` : `${arrowColor}`}`}>
                <ArrowUpRight className={showArrowBg ? "w-3 h-3" : "w-4 h-4"} weight="bold" />
            </div>
        </motion.button>
    );
};

export default GhostButton;
