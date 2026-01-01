import React, { useState } from 'react';
import { Copy, TerminalWindow, Check } from '@phosphor-icons/react';
import { CodeWindowProps } from './types';

const CodeWindow: React.FC<CodeWindowProps> = ({ fileName, nodeCode, pythonCode, jsonOutput }) => {
    const [lang, setLang] = useState<'node' | 'python'>('node');
    const [copied, setCopied] = useState(false);
    const activeCode = (lang === 'node' ? nodeCode : pythonCode) || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(activeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderCode = (code: string) => {
        return code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
                <span className="table-cell select-none text-text-muted text-right pr-4 w-8">{i + 1}</span>
                <span className="table-cell whitespace-pre">{line}</span>
            </div>
        ));
    };

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-border-default shadow-lg bg-secondary-dark text-text-on-dark font-mono text-sm group">
            <div className="flex items-center justify-between px-4 py-2 bg-secondary-base border-b border-border-default/20">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5 mr-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-status-error-text/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-status-warning-text/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-status-success-text/80" />
                    </div>
                    <span className="text-xs text-text-muted font-sans font-medium">{fileName}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex bg-secondary-light rounded p-0.5">
                        <button onClick={() => setLang('node')} className={`px-2 py-0.5 text-xs rounded transition-all ${lang === 'node' ? 'bg-brand-primary text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>Node</button>
                        <button onClick={() => setLang('python')} className={`px-2 py-0.5 text-xs rounded transition-all ${lang === 'python' ? 'bg-brand-primary text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>Python</button>
                    </div>
                    <button onClick={handleCopy} className="text-text-muted hover:text-white transition-colors">
                        {copied ? <Check size={14} className="text-status-success-text" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-x-auto bg-secondary-dark">
                <code className="block w-full text-xs md:text-sm leading-6">{renderCode(activeCode)}</code>
            </div>
            {jsonOutput && (
                <div className="border-t border-border-default/20 bg-ink-base p-3">
                    <div className="flex items-center space-x-2 text-xs text-text-muted mb-2 font-sans font-bold uppercase tracking-wider">
                        <TerminalWindow size={12} />
                        <span>Response Output</span>
                    </div>
                    <pre className="text-status-success-text text-xs overflow-x-auto">{jsonOutput}</pre>
                </div>
            )}
        </div>
    );
};
export default CodeWindow;
