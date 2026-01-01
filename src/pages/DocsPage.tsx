import React, { useState, useEffect } from 'react';
import { MagnifyingGlass, List, X, CaretRight, CaretDown, Globe, ArrowRight, BookOpen, Code, Lightning, ArrowUpRight } from '@phosphor-icons/react';
import { TabID, NavItem } from '../components/Docs/types';
import { IntegrationContent, ApiReferenceContent, NoCodeContent } from '../components/Docs/Content';
import {
    INTEGRATION_GUIDES,
    API_ENDPOINTS,
    NO_CODE_GUIDES,
    CODE_SNIPPETS,
} from '../components/Docs/PAYFI_DOCS_DATA';

// Helper to group API endpoints by category
const getApiCategories = () => {
    const categories: Record<string, NavItem[]> = {};
    Object.entries(API_ENDPOINTS).forEach(([name, endpoint]) => {
        if (!categories[endpoint.category]) {
            categories[endpoint.category] = [];
        }
        categories[endpoint.category].push({ id: name.toLowerCase().replace(/\s+/g, '-'), label: name });
    });
    return Object.entries(categories).map(([cat, items]) => ({
        id: cat.toLowerCase().replace(/\s+/g, '-'),
        label: cat,
        children: items
    }));
};

const NAV_DATA: Record<TabID, NavItem[]> = {
    integration: [
        {
            id: 'getting-started',
            label: 'Getting Started',
            children: INTEGRATION_GUIDES.map(guide => ({
                id: `guide-${guide.id}`,
                label: guide.title
            }))
        }
    ],
    api: getApiCategories(),
    nocode: [
        {
            id: 'guides',
            label: 'Guides',
            children: NO_CODE_GUIDES.map(guide => ({
                id: `guide-${guide.id}`,
                label: guide.title
            }))
        }
    ]
};

const TABS: { id: TabID; label: string; icon: React.ElementType }[] = [
    { id: 'integration', label: 'Docs', icon: BookOpen },
    { id: 'api', label: 'API', icon: Code },
    { id: 'nocode', label: 'Guides', icon: Lightning },
];

export default function DocsPage() {
    const [activeTab, setActiveTab] = useState<TabID>('integration');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'start': true, 'payments': true, 'core': true });
    const toggleSection = (id: string) => { setOpenSections(prev => ({ ...prev, [id]: !prev[id] })); };

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }, [activeTab]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-text-primary font-sans">
            <header className="sticky top-0 z-50 w-full bg-nav-bg border-b border-white/10  shadow-nav-bg/20">
                <div className="relative w-full px-4 md:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-white cursor-pointer hover:opacity-90 transition-opacity">
                            <img src="/Payfi-darkmode.svg" alt="Payfi Logo" className="h-12 w-auto" />
                            <div className="h-8 w-px bg-white/20 mx-1"></div>
                            <span className="text-[16px] font-bold text-white tracking-wide uppercase font-sans">DOCS</span>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group w-64 lg:w-96 transition-all duration-300 focus-within:w-96 lg:focus-within:w-[32rem]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlass className="h-5 w-5 text-white/70 group-focus-within:text-brand-primary transition-colors" />
                        </div>
                        <input type="text" className="block w-full pl-10 pr-12 py-2.5 rounded-lg border border-white/10 bg-secondary-light text-white placeholder-white/60 focus:outline-none focus:bg-secondary-base focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all text-sm" placeholder="Search documentation..." />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] font-bold text-nav-bg bg-white border border-white/20 rounded"><span className="text-xs">⌘</span>K</kbd>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hidden md:block text-sm font-medium text-nav-text hover:text-white transition-colors">Support</a>
                        <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                        <a href="#" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">Sign in</a>
                        <a href="#" className="hidden sm:flex bg-white text-nav-bg px-6 py-2.5 rounded-full text-sm font-bold hover:bg-page-light transition-all shadow-md shadow-black/20 items-center gap-2 group">
                            Get Started
                            <div className="p-1 rounded-full bg-nav-bg/10 group-hover:bg-nav-bg/20 transition-all duration-300">
                                <ArrowUpRight size={12} weight="bold" />
                            </div>
                        </a>
                        <button className="lg:hidden p-2 text-nav-text hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 w-full max-w-[1600px] mx-auto flex items-start">
                <aside className={`fixed inset-y-0 left-0 z-40 w-[320px] bg-page-light-alt/80 backdrop-blur-sm border-r border-border-default/60 transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] lg:translate-x-0 lg:static lg:block lg:h-[calc(100vh-5rem)] lg:sticky lg:top-20 lg:overflow-y-auto lg:bg-page-light-alt ${mobileMenuOpen ? 'translate-x-0 pt-24' : '-translate-x-full'}`}>
                    <div className="p-6 space-y-8">
                        <div className="bg-white border border-border-default/50 p-1 rounded-xl flex gap-1 shadow-sm">
                            {TABS.map((tab) => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-border-default/50'}`}>
                                    <tab.icon size={14} className={activeTab === tab.id ? 'text-white' : ''} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {NAV_DATA[activeTab].map((section) => (
                                <div key={section.id} className="pb-4">
                                    <button onClick={() => toggleSection(section.id)} className="flex items-center justify-between w-full text-left text-xs font-bold text-text-muted uppercase tracking-wider mb-3 hover:text-secondary-base transition-colors px-2">
                                        {section.label}
                                        {section.children && section.children.length > 0 && (
                                            <div className={`transition-transform duration-200 ${openSections[section.id] ? 'rotate-180' : ''}`}>
                                                <CaretDown size={12} />
                                            </div>
                                        )}
                                    </button>
                                    {openSections[section.id] && section.children && (
                                        <ul className="relative ml-2 mt-2 space-y-2">
                                            {/* THE BRANCHING TREE NAVIGATION */}
                                            <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border-default" />
                                            {section.children.map((item) => (
                                                <li key={item.id} className="relative pl-8">
                                                    <a href="#" className="group flex items-start text-[13px] font-medium text-text-secondary hover:text-secondary-base transition-colors">
                                                        <div className="absolute left-[8px] top-[0.6rem] w-[7px] h-[7px] rounded-full bg-border-default ring-4 ring-page-light-alt group-hover:bg-brand-primary transition-all z-10" />
                                                        <span className="py-0.5">{item.label}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-border-default">
                            <div className="rounded-xl bg-gradient-to-br from-secondary-base to-secondary-dark p-4 text-white">
                                <h4 className="text-sm font-bold mb-1">Need help?</h4>
                                <p className="text-xs text-nav-text mb-3 leading-relaxed">Join our developer community on Slack.</p>
                                <button className="w-full py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition-colors border border-white/10">Join PayFi Slack</button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- CONTENT AREA & TOC --- */}
                <main className="flex-1 min-w-0 py-12 px-6 md:px-12 lg:px-20">
                    <div className="max-w-4xl mx-auto">
                        {activeTab === 'integration' && <IntegrationContent />}
                        {activeTab === 'api' && <ApiReferenceContent />}
                        {activeTab === 'nocode' && <NoCodeContent />}
                        <div className="mt-32 pt-8 border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
                            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-success-text"></span>Systems operational</p>
                        </div>
                    </div>
                </main>

                {/* --- RIGHT SIDEBAR (Table of Contents) --- */}
                <aside className="hidden xl:block w-64 shrink-0 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto py-12 pr-8">
                    <h5 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">On this page</h5>
                    <ul className="space-y-3 text-[13px]">
                        {NAV_DATA[activeTab].flatMap(section => section.children || []).map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer block py-1">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
            {mobileMenuOpen && <div className="fixed inset-0 z-30 bg-secondary-dark/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />}
        </div>
    );
}
