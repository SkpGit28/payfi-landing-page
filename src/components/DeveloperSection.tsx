import React, { useRef, useState, useEffect, useContext } from 'react';
import { ArrowRight, Terminal, Copy, Check, ArrowUpRight } from '@phosphor-icons/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GhostButton from './GhostButton';
import { NavigationContext } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

const CodeBlock = () => {
    const [text, setText] = useState('');
    const codeSnippets = [
        `const payfi = require('payfi-node')('sk_test_...');

// Initialize payment
const session = await payfi.checkout.create({
  amount: 4999, // ₹49.99
  currency: 'inr',
  mode: 'payment',
  success_url: 'https://yoursite.com/success',
  cancel_url: 'https://yoursite.com/cancel',
});

console.log('Payment URL:', session.url);`,
        `// Create a subscription
const subscription = await payfi.subscriptions.create({
  customer: 'cus_123456',
  items: [{ price: 'price_premium_monthly' }],
  trial_period_days: 14
});

console.log('Sub ID:', subscription.id);`,
        `// Verify a webhook
const event = payfi.webhooks.constructEvent(
  request.body,
  signature,
  endpointSecret
);

if (event.type === 'payment_intent.succeeded') {
  const paymentIntent = event.data.object;
  console.log('Payment succeeded!');
}`
    ];

    const [snippetIndex, setSnippetIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 70%",
            onEnter: () => setIsTyping(true),
        });
    }, { scope: containerRef });

    useEffect(() => {
        if (!isTyping) return;

        let currentText = '';
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            const currentSnippet = codeSnippets[snippetIndex];

            if (isDeleting) {
                currentText = currentSnippet.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentSnippet.substring(0, charIndex + 1);
                charIndex++;
            }

            setText(currentText);

            let typeSpeed = 30;

            if (isDeleting) {
                typeSpeed = 10; // Delete faster
            }

            if (!isDeleting && charIndex === currentSnippet.length) {
                // Finished typing, wait before deleting
                typeSpeed = 5000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next snippet
                isDeleting = false;
                setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
                typeSpeed = 500;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        type();

        return () => clearTimeout(timeoutId);
    }, [isTyping, snippetIndex]);

    return (
        <div ref={containerRef} className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl border border-white/10 font-mono text-sm md:text-base relative group">
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-xs text-white/40 flex items-center gap-1">
                    <Terminal size={12} />
                    integration.js
                </div>
            </div>
            <div className="p-6 min-h-[300px] text-gray-300 overflow-x-auto">
                <pre>
                    <code>
                        {text.split('\n').map((line, i) => (
                            <div key={i} className="table-row">
                                <span className="table-cell text-right pr-4 text-white/20 select-none">{i + 1}</span>
                                <span className="table-cell">
                                    {line.split(' ').map((word, j) => {
                                        if (word.includes('const') || word.includes('await') || word.includes('require')) return <span key={j} className="text-[#569CD6]">{word} </span>;
                                        if (word.includes('payfi') || word.includes('console')) return <span key={j} className="text-[#4EC9B0]">{word} </span>;
                                        if (word.includes('\'')) return <span key={j} className="text-[#CE9178]">{word} </span>;
                                        if (word.includes('//')) return <span key={j} className="text-[#6A9955]">{word} </span>;
                                        return word + ' ';
                                    })}
                                </span>
                            </div>
                        ))}
                        <span className="animate-pulse inline-block w-2 h-4 bg-[#569CD6] align-middle ml-1"></span>
                    </code>
                </pre>
            </div>
            <div className="absolute top-14 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <Copy size={16} />
                </button>
            </div>
        </div>
    );
};

const DeveloperSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const context = useContext(NavigationContext);
    const navigate = context?.navigate || (() => { });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".dev-content-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        tl.from(".dev-console", {
            x: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-secondary-base text-white overflow-hidden">
            <div className="max-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        <div className="dev-content-item mb-6">
                            <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block">
                                Developer First
                            </span>
                        </div>

                        <h2 className="dev-content-item font-technical font-bold text-4xl md:text-5xl leading-tight mb-6">
                            Integration so simple,<br />
                            it feels like <span className="text-brand-primary drop-shadow-[0_0_220px_rgba(39,201,63,0.5)]">Magic</span>.
                        </h2>

                        <p className="dev-content-item font-interface text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                            We've abstracted the complexity of payments into a few lines of code.
                            Our SDKs are typed, documented, and designed to get you up and running in minutes, not weeks.
                        </p>

                        <div className="dev-content-item flex flex-col sm:flex-row gap-4 items-center">
                            <button
                                onClick={() => navigate('documentations')}
                                className="group bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-interface font-semibold text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                Get API Keys
                                <div className="p-1 rounded-full bg-white/20 group-hover:bg-page-light-alt group-hover:text-brand-primary transition-all duration-300">
                                    <ArrowUpRight className="w-3 h-3" weight="bold" />
                                </div>
                            </button>
                            <GhostButton onClick={() => navigate('documentations')} className="text-white">
                                View Documentation
                            </GhostButton>
                        </div>

                        <div className="dev-content-item mt-12 grid grid-cols-2 gap-6">
                            {[
                                { title: '99.99% Uptime', desc: 'Reliability you can trust' },
                                { title: '<50ms Latency', desc: 'Blazing fast transactions' }
                            ].map((item, idx) => (
                                <div key={idx} className="border-l-2 border-brand-primary/30 pl-4">
                                    <div className="font-bold text-xl mb-1">{item.title}</div>
                                    <div className="text-sm text-white/50">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Console */}
                    <div className="dev-console order-1 lg:order-2 relative">
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full opacity-50 pointer-events-none" />
                        <CodeBlock />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeveloperSection;
