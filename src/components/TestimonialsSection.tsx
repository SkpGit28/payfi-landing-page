import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            quote: "PayFi transformed how we handle payments. No more failed transactions, no more headaches.",
            impact: "IMPACT",
            result: "99.8% Success Rate",
            name: "Rajesh Kumar",
            title: "Owner, Kumar Electronics",
            image: "/C:/Users/Sushant Kumar/.gemini/antigravity/brain/8bb85291-2711-48f5-808d-8403b358b503/indian_business_owner_1_1767214651352.png"
        },
        {
            quote: "Integration was seamless. We went live in under 2 hours and never looked back.",
            impact: "IMPACT",
            result: "2 Hour Integration",
            name: "Priya Sharma",
            title: "Founder, Sharma Textiles",
            image: "/C:/Users/Sushant Kumar/.gemini/antigravity/brain/8bb85291-2711-48f5-808d-8403b358b503/indian_business_owner_2_1767214667769.png"
        },
        {
            quote: "The settlement speed changed our cash flow game. T+0 settlements are a game changer.",
            impact: "IMPACT",
            result: "T+0 Settlements",
            name: "Arun Patel",
            title: "Owner, Spice Garden Restaurant",
            image: "/C:/Users/Sushant Kumar/.gemini/antigravity/brain/8bb85291-2711-48f5-808d-8403b358b503/indian_business_owner_3_1767214684551.png"
        }
    ];

    const [activeIndex, setActiveIndex] = React.useState(0);
    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">
                        Trusted by Thousands
                    </span>
                    <h2 className="font-technical font-bold text-4xl md:text-5xl text-secondary-base mb-4">
                        Why they trusted PayFI?
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Image with Hover Zoom */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
                        >
                            <img
                                src={activeTestimonial.image}
                                alt={activeTestimonial.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Right: Stacked Cards with Testimonial */}
                    <div className="relative">
                        {/* Background Stacked Cards - More Visible */}
                        {[3, 2, 1, 0].map((index) => (
                            <motion.div
                                key={index}
                                className="absolute inset-0 rounded-3xl border-2"
                                style={{
                                    transform: `translateX(${index * 8}px) translateY(${index * 8}px) scale(${1 - index * 0.02})`,
                                    zIndex: -index,
                                    backgroundColor: index === 0 ? '#1a2332' : `rgba(226, 232, 240, ${0.3 + index * 0.2})`,
                                    borderColor: index === 0 ? 'transparent' : `rgba(148, 163, 184, ${0.2 + index * 0.1})`
                                }}
                            />
                        ))}

                        {/* Main Testimonial Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20, rotateY: -10 }}
                                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                exit={{ opacity: 0, y: -20, rotateY: 10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="relative z-10 bg-secondary-base rounded-3xl p-8 md:p-12 text-white shadow-2xl"
                            >
                                {/* Decorative Line */}
                                <div className="w-12 h-1 bg-brand-primary mb-8 rounded-full" />

                                {/* Quote */}
                                <blockquote className="font-technical text-2xl md:text-3xl font-medium leading-tight mb-8 italic">
                                    "{activeTestimonial.quote}"
                                </blockquote>

                                {/* Impact Section */}
                                <div className="mb-8 pb-8 border-b border-white/10">
                                    <span className="font-interface text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block mb-2">
                                        {activeTestimonial.impact}
                                    </span>
                                    <p className="font-technical text-xl font-bold text-white">
                                        {activeTestimonial.result}
                                    </p>
                                </div>

                                {/* Author Info */}
                                <div>
                                    <p className="font-technical text-lg font-bold text-white mb-1">
                                        {activeTestimonial.name}
                                    </p>
                                    <p className="font-interface text-sm text-white/60">
                                        {activeTestimonial.title}
                                    </p>
                                </div>

                                {/* Navigation Dots */}
                                <div className="flex gap-2 mt-10">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                                    ? 'bg-brand-primary w-8'
                                                    : 'bg-white/20 hover:bg-white/40 w-2'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
