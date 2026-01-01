import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Fade Up Animation
        const fadeElements = gsap.utils.toArray('.gsap-fade-up');
        fadeElements.forEach((el: any) => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Text Reveal Animation (Lines)
        const textElements = gsap.utils.toArray('.gsap-text-reveal');
        textElements.forEach((el: any) => {
            gsap.fromTo(el,
                { opacity: 0, y: 20, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    }
                }
            );
        });

        // Stagger Children
        const staggerContainers = gsap.utils.toArray('.gsap-stagger-children');
        staggerContainers.forEach((el: any) => {
            gsap.fromTo(el.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    }
                }
            );
        });

    }, { scope: containerRef });

    return { containerRef };
};
