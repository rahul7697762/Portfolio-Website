import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with ScrollTrigger
 * @param {Function} animationCallback - Function that creates GSAP animations
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export const useGSAP = (animationCallback, dependencies = []) => {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (ref.current) {
                animationCallback(ref.current, gsap, ScrollTrigger);
            }
        }, ref);

        return () => ctx.revert(); // Cleanup
    }, dependencies);

    return ref;
};

/**
 * Animate elements when they scroll into view
 */
export const useScrollReveal = (options = {}) => {
    const ref = useRef(null);
    const {
        y = 60,
        opacity = 0,
        duration = 1,
        ease = 'power3.out',
        stagger = 0.1,
        trigger = null,
        start = 'top 85%',
        toggleActions = 'play none none none',
        selector = null,
    } = options;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = selector
                ? ref.current.querySelectorAll(selector)
                : ref.current;

            gsap.from(elements, {
                y,
                opacity,
                duration,
                ease,
                stagger,
                scrollTrigger: {
                    trigger: trigger || ref.current,
                    start,
                    toggleActions,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return ref;
};

/**
 * Animate numbers counting up
 */
export const animateCounter = (element, target, duration = 2) => {
    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value);
        },
    });
};

/**
 * Create staggered animation timeline
 */
export const createStaggerTimeline = (elements, options = {}) => {
    const {
        y = 40,
        opacity = 0,
        duration = 0.8,
        stagger = 0.15,
        ease = 'power3.out',
    } = options;

    return gsap.timeline().from(elements, {
        y,
        opacity,
        duration,
        stagger,
        ease,
    });
};

export { gsap, ScrollTrigger };
