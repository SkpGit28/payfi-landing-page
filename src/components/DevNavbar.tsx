import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

const DevNavbar: React.FC = () => {
    const context = useContext(NavigationContext);
    if (!context) return null;
    const { navigate } = context;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dev-bg border-b border-dev-border py-4 px-6 text-dev-text">
            <div className="max-container flex justify-between items-center">
                <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                    <div className="w-8 h-8 bg-dev-surface border border-dev-border rounded flex items-center justify-center font-bold">P</div>
                    <span className="font-technical font-bold text-xl">Payfi <span className="text-dev-muted font-mono text-sm font-normal ml-2">/ Developers</span></span>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                    <span onClick={() => navigate('home')} className="cursor-pointer hover:text-white">Exit</span>
                </div>
            </div>
        </nav>
    );
};

export default DevNavbar;
