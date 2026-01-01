import React from 'react';
import GhostButton from './GhostButton';

const Footer: React.FC = () => {
    const footerSections = [
        {
            title: "Company",
            links: ["About Us", "Careers", "Blog", "Contact"]
        },
        {
            title: "Documentation",
            links: ["Quickstart", "API Reference", "SDKs", "Status"]
        },
        {
            title: "Legal",
            links: ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Security"]
        },
        {
            title: "Social",
            links: ["Twitter", "LinkedIn", "GitHub", "Discord"]
        }
    ];

    return (
        <footer className="bg-secondary-base pt-16 pb-12">
            <div className="max-container">
                {/* Top Section: Logo and Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
                    {/* Logo Column */}
                    <div className="col-span-2 lg:col-span-1">
                        <img src="/PayfiLogo.png" alt="Payfi Logo" className="h-12 mb-6 brightness-0 invert" />
                        <p className="font-interface text-white/40 text-sm leading-relaxed max-w-[200px]">
                            Building the invisible infrastructure for modern commerce.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-technical font-bold text-white text-sm uppercase tracking-widest mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <GhostButton className="text-white/60 hover:text-white text-sm font-medium">
                                            {link}
                                        </GhostButton>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section: Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-interface text-white/20 text-xs tracking-wider uppercase">
                        © 2026 Payfi Platform Inc. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <span className="font-interface text-white/20 text-xs tracking-wider uppercase">
                            Built with precision
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
