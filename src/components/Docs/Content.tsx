import React from 'react';
import { Timer, WarningOctagon } from '@phosphor-icons/react';
import Step from './Step';
import CodeWindow from './CodeWindow';
import { TabID } from './types';

const Breadcrumb = ({ items }: { items: string[] }) => (
    <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
        {items.map((item, index) => (
            <React.Fragment key={index}>
                <span className={index === items.length - 1 ? 'text-secondary-base font-medium' : 'hover:text-text-primary cursor-pointer'}>{item}</span>
                {index < items.length - 1 && <span className="text-text-muted">/</span>}
            </React.Fragment>
        ))}
    </div>
);

import { INTEGRATION_GUIDES } from './PAYFI_DOCS_DATA';
import { CheckCircle, XCircle, Lightbulb, Lightning } from '@phosphor-icons/react';

export const IntegrationContent: React.FC = () => (
    <div className="space-y-16">
        <Breadcrumb items={['Docs', 'Getting Started', 'Integration']} />

        {INTEGRATION_GUIDES.map((guide, index) => (
            <div key={guide.id} id={`guide-${guide.id}`} className="scroll-mt-32">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-4">{guide.title}</h1>
                    <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-6">{guide.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full font-medium ${guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {guide.difficulty}
                        </span>
                        <span className="flex items-center gap-1.5 text-text-secondary">
                            <Timer size={16} />
                            {guide.duration}
                        </span>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="scroll-mt-32">
                        <Step stepNumber={index + 1} title={guide.title} isLast={index === INTEGRATION_GUIDES.length - 1}>
                            <div className="space-y-6">
                                <p className="text-text-secondary leading-relaxed whitespace-pre-line">{guide.content}</p>

                                {guide.subsections?.map((sub, subIndex) => (
                                    <div key={subIndex} className="space-y-3">
                                        {sub.title && <h4 className="font-bold text-text-primary">{sub.title}</h4>}
                                        <p className="text-text-secondary text-sm">{sub.description}</p>
                                    </div>
                                ))}

                                {guide.code && (
                                    <CodeWindow
                                        fileName={guide.code.language === 'bash' ? 'terminal' : `example.${guide.code.language}`}
                                        nodeCode={guide.code.language === 'javascript' ? guide.code.content : undefined}
                                        pythonCode={guide.code.language === 'python' ? guide.code.content : undefined}
                                    // Handle bash or other languages if CodeWindow supports them, or default to nodeCode/pythonCode props
                                    />
                                )}

                                {(guide.doCards || guide.dontCards) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {guide.doCards?.map((card, i) => (
                                            <div key={i} className="p-4 bg-status-success-bg/10 border border-status-success-text/20 rounded-lg flex gap-3">
                                                <CheckCircle className="text-status-success-text shrink-0" size={20} weight="fill" />
                                                <div>
                                                    <h5 className="text-sm font-bold text-status-success-text mb-1">{card.title}</h5>
                                                    <p className="text-xs text-text-secondary">{card.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {guide.dontCards?.map((card, i) => (
                                            <div key={i} className="p-4 bg-status-error-bg/10 border border-status-error-text/20 rounded-lg flex gap-3">
                                                <XCircle className="text-status-error-text shrink-0" size={20} weight="fill" />
                                                <div>
                                                    <h5 className="text-sm font-bold text-status-error-text mb-1">{card.title}</h5>
                                                    <p className="text-xs text-text-secondary">{card.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {guide.tips && guide.tips.map((tip, i) => (
                                    <div key={i} className="p-4 bg-brand-primary-light/10 border border-brand-primary/20 rounded-lg flex gap-3">
                                        <Lightbulb className="text-brand-primary shrink-0" size={20} weight="fill" />
                                        <span className="text-sm text-text-secondary">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </Step>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

import { API_ENDPOINTS, NO_CODE_GUIDES } from './PAYFI_DOCS_DATA';

export const ApiReferenceContent: React.FC = () => (
    <div className="space-y-16">
        <Breadcrumb items={['Docs', 'API Reference']} />

        {Object.entries(API_ENDPOINTS).map(([name, endpoint]) => (
            <div key={name} id={name.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32 border-b border-border-default pb-12 last:border-0">
                <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold font-mono uppercase ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                            endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                        }`}>
                        {endpoint.method}
                    </span>
                    <h2 className="text-2xl font-bold text-text-primary">{name}</h2>
                </div>
                <code className="block bg-secondary-dark text-text-on-dark p-3 rounded-lg font-mono text-sm mb-6">
                    {endpoint.path}
                </code>
                <p className="text-text-secondary mb-8 text-lg">{endpoint.description}</p>

                {endpoint.parameters && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Parameters</h3>
                        <div className="border border-border-default rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary-light text-text-secondary font-medium">
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-default">
                                    {Object.entries(endpoint.parameters).map(([paramName, details]) => (
                                        <tr key={paramName} className="bg-white">
                                            <td className="px-4 py-3 font-mono text-brand-primary">{paramName} {details.required && <span className="text-status-error-text">*</span>}</td>
                                            <td className="px-4 py-3 text-text-muted">{details.type}</td>
                                            <td className="px-4 py-3 text-text-secondary">{details.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {endpoint.response && (
                    <div>
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Response</h3>
                        <CodeWindow
                            fileName="response.json"
                            nodeCode={JSON.stringify(endpoint.response, null, 2)}
                        />
                    </div>
                )}
            </div>
        ))}
    </div>
);

export const NoCodeContent: React.FC = () => (
    <div className="space-y-16">
        <Breadcrumb items={['Docs', 'No-Code Guides']} />

        {NO_CODE_GUIDES.map((guide, index) => (
            <div key={guide.id} id={`guide-${guide.id}`} className="scroll-mt-32">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{guide.icon}</span>
                        <h1 className="text-3xl font-bold text-text-primary">{guide.title}</h1>
                    </div>
                    <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-6">{guide.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="px-2.5 py-1 rounded-full bg-brand-primary-light/10 text-brand-primary font-medium">
                            {guide.difficulty}
                        </span>
                        <span className="flex items-center gap-1.5 text-text-secondary">
                            <Timer size={16} />
                            {guide.duration}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {guide.features && (
                        <div className="bg-page-light-alt p-6 rounded-xl border border-border-default">
                            <h3 className="font-bold text-text-primary mb-4">Features</h3>
                            <ul className="space-y-2">
                                {guide.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                        <CheckCircle className="text-status-success-text shrink-0 mt-0.5" weight="fill" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {guide.benefits && (
                        <div className="bg-page-light-alt p-6 rounded-xl border border-border-default">
                            <h3 className="font-bold text-text-primary mb-4">Benefits</h3>
                            <ul className="space-y-2">
                                {guide.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                        <Lightning className="text-brand-primary shrink-0 mt-0.5" weight="fill" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {guide.steps && (
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-text-primary">How it works</h3>
                        <div className="space-y-6">
                            {guide.steps.map((step) => (
                                <div key={step.number} className="flex gap-4">
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-primary mb-1">{step.title}</h4>
                                        <p className="text-text-secondary text-sm">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
);
