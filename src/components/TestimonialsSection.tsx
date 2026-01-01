import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            quote: <>PayFi <span className="text-brand-primary">transformed</span> how we handle payments. No more failed transactions, no more headaches.</>,
            impact: "IMPACT",
            result: "99.8% Success Rate",
            name: "Rajesh Kumar",
            title: "Owner, Kumar Electronics",
            image: "/1.png"
        },
        {
            quote: <>Integration was <span className="text-brand-primary">seamless</span>. We went live in under 2 hours and never looked back.</>,
            impact: "IMPACT",
            result: "2 Hour Integration",
            name: "Priya Sharma",
            title: "Founder, Sharma Textiles",
            image: "/2.png"
        },
        {
            quote: <>The settlement speed changed our <span className="text-brand-primary">cash flow</span> game. T+0 settlements are a game changer.</>,
            impact: "IMPACT",
            result: "T+0 Settlements",
            name: "Arun Patel",
            title: "Owner, Spice Garden Restaurant",
            image: "/3.png"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-24 bg-page-light-alt overflow-hidden [--card-width:85vw] md:[--card-width:75vw] lg:[--card-width:1000px] [--gap:2rem]">
            <div className="max-container mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div
                        className="gsap-fade-up max-w-2xl"
                    >
                        <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                            Trusted by Thousands
                        </span>
                        <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-4">
                            Why they trusted PayFI?
                        </h2>
                        <p className="font-interface text-secondary-light/70 text-lg">
                            Real stories from real businesses scaling with Payfi's invisible payment infrastructure.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 rounded-full border border-neutral-200 bg-white text-secondary-base hover:bg-neutral-50 hover:border-brand-primary/30 transition-all shadow-sm"
                        >
                            <CaretLeft weight="bold" className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="p-3 rounded-full border border-neutral-200 bg-white text-secondary-base hover:bg-neutral-50 hover:border-brand-primary/30 transition-all shadow-sm"
                        >
                            <CaretRight weight="bold" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider Container */}
            <div className="flex">
                {/* Left Spacer to align with vertical symmetry (max-container left edge) */}
                <div className="w-[max(2rem,calc((100vw-80rem)/2+2rem))] md:w-[max(3rem,calc((100vw-80rem)/2+3rem))] flex-shrink-0" />

                {/* Visible Area - Clips on the left at the symmetry line, bleeds to screen edge on the right */}
                <div className="flex-grow overflow-hidden">
                    <motion.div
                        className="flex gap-[var(--gap)]"
                        animate={{ x: `calc(-${activeIndex} * (var(--card-width) + var(--gap)))` }}
                        transition={{ type: "spring", stiffness: 180, damping: 25 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="w-[var(--card-width)] flex-shrink-0"
                            >
                                <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-neutral-100 h-[600px] md:h-[500px] flex flex-col md:flex-row relative">
                                    {/* Left: Image Section (40%) */}
                                    <div className="w-full md:w-[40%] h-[200px] md:h-full relative overflow-hidden bg-neutral-100">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                                    </div>

                                    {/* Right: Content Section (60%) */}
                                    <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center relative bg-white">
                                        <div className="w-16 h-1 bg-brand-primary mb-8 rounded-full" />

                                        <blockquote className="font-technical text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 italic text-secondary-base tracking-tight">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        <div className="mb-8">
                                            <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block mb-2">
                                                {testimonial.impact}
                                            </span>
                                            <p className="font-technical text-xl font-medium text-secondary-light">
                                                {testimonial.result}
                                            </p>
                                        </div>

                                        <div className="h-px w-full bg-neutral-100 mb-8" />
                                        <div className="mt-auto flex items-end justify-between">
                                            <div>
                                                <p className="font-technical text-lg font-bold text-secondary-base mb-1">
                                                    {testimonial.name}
                                                </p>
                                                <p className="font-interface text-sm text-secondary-light/70">
                                                    {testimonial.title}
                                                </p>
                                            </div>

                                            {/* Progress Dots */}
                                            <div className="flex gap-2">
                                                {testimonials.map((_, dotIndex) => (
                                                    <div
                                                        key={dotIndex}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dotIndex === activeIndex
                                                            ? 'bg-brand-primary w-4'
                                                            : 'bg-neutral-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
