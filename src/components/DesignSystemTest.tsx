import React from 'react';

const DesignSystemTest: React.FC = () => {
    return (
        <div className="p-12 space-y-8 bg-page-light min-h-screen">
            <header>
                <h1 className="text-4xl text-text-primary">Design System Integration Test</h1>
                <p className="text-text-secondary mt-2">Verifying typography, colors, and base styles.</p>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl text-brand-primary">Typography Check</h2>
                <div className="space-y-2">
                    <p className="font-technical text-lg">
                        This is JetBrains Mono (Technical Font).
                    </p>
                    <p className="font-interface text-lg">
                        This is Geist (Interface Font) with -0.02em letter-spacing.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl text-brand-primary">Color Palette Check</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-brand-primary text-white rounded shadow">Brand Primary</div>
                    <div className="p-4 bg-secondary-base text-white rounded shadow">Secondary Base</div>
                    <div className="p-4 bg-status-success-bg text-status-success-text rounded shadow border border-status-success-text/20">Success State</div>
                    <div className="p-4 bg-status-error-bg text-status-error-text rounded shadow border border-status-error-text/20">Error State</div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl text-brand-primary">CTA Component Check</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-cta-bg hover:bg-cta-bg-hover active:bg-cta-bg-active text-cta-text px-6 py-3 rounded font-technical font-medium uppercase transition-colors shadow-md">
                        Primary Action
                    </button>
                    <button disabled className="bg-cta-bg-disabled text-cta-text-disabled px-6 py-3 rounded font-technical font-medium uppercase cursor-not-allowed">
                        Disabled Action
                    </button>
                </div>
            </section>

            <footer className="pt-8 border-t border-border-divider">
                <p className="text-text-muted text-sm italic">
                    Constraint Verification: Geist font should automatically have -0.02em letter-spacing via Tailwind plugin.
                </p>
            </footer>
        </div>
    );
};

export default DesignSystemTest;
