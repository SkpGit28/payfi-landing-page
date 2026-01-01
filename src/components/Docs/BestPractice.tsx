import React from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { BestPracticeProps } from './types';

const BestPractice: React.FC<BestPracticeProps> = ({ type, title, children }) => {
    const isDo = type === 'do';
    return (
        <div className={`p-5 rounded-lg border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isDo ? 'bg-status-success-bg border-status-success-text/50' : 'bg-status-error-bg border-status-error-text/50'}`}>
            <div className="flex items-start space-x-3 mb-2">
                {isDo ? <CheckCircle className="text-status-success-text shrink-0 mt-0.5" size={20} weight="fill" /> : <XCircle className="text-status-error-text shrink-0 mt-0.5" size={20} weight="fill" />}
                <h4 className={`font-bold ${isDo ? 'text-status-success-text' : 'text-status-error-text'}`}>{title}</h4>
            </div>
            <div className={`text-sm leading-relaxed pl-8 ${isDo ? 'text-status-success-text' : 'text-status-error-text'}`}>{children}</div>
        </div>
    );
};
export default BestPractice;
