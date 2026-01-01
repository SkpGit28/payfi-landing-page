import React from 'react';
import { StepProps } from './types';

const Step: React.FC<StepProps> = ({ stepNumber, title, children, isLast }) => {
    return (
        <div className="relative pl-8 md:pl-12 pb-12 group">
            {!isLast && (
                <div className="absolute left-[15px] md:left-[19px] top-8 bottom-0 w-0.5 bg-border-default group-hover:bg-brand-primary/30 transition-colors" />
            )}
            <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shadow-md ring-4 ring-card-light z-10">
                {stepNumber}
            </div>
            <div className="pt-1 md:pt-1.5">
                <h3 className="text-xl font-bold text-secondary-base mb-4">{title}</h3>
                <div className="prose prose-slate max-w-none text-text-secondary">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Step;
