import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Footer sections stagger reveal
            const footerSections = gsap.utils.toArray('.footer-section');
            footerSections.forEach((section, index) => {
                gsap.from(section, {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.footer-content',
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                });

                // Section headers
                const header = section.querySelector('h3');
                if (header) {
                    gsap.from(header, {
                        x: -20,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.2 + index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.footer-content',
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    });
                }
            });

            // Quick links animation
            gsap.from('.footer-section ul li', {
                x: -20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-content',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });

            // Social links — no GSAP opacity/scale animation to avoid invisible state

            // Footer CTA button
            gsap.from('.footer-cta', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-content',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });

            // Footer bottom animation
            gsap.from('.footer-bottom p', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-bottom',
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                },
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Back to top button animation
    useEffect(() => {
        if (showBackToTop) {
            gsap.fromTo('.back-to-top',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );
        }
    }, [showBackToTop]);

    const scrollToTop = () => {
        // Animate button before scrolling
        gsap.to('.back-to-top', {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    };

    const handleSocialHover = (e, isEnter) => {
        gsap.to(e.currentTarget, {
            scale: isEnter ? 1.2 : 1,
            y: isEnter ? -5 : 0,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const socialBtnStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 14px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
        color: '#ffffff',
        textDecoration: 'none',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
    };

    return (
        <footer className="footer" id="contact" ref={footerRef}>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#certificates">Certificates</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Connect</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                        <a
                            href="https://github.com/rahul7697762"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => handleSocialHover(e, true)}
                            onMouseLeave={(e) => handleSocialHover(e, false)}
                            style={socialBtnStyle}
                        >
                            <i className="fab fa-github" style={{ fontSize: '1.1rem', width: '18px', textAlign: 'center' }}></i>
                            <span>GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rahul1232/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => handleSocialHover(e, true)}
                            onMouseLeave={(e) => handleSocialHover(e, false)}
                            style={socialBtnStyle}
                        >
                            <i className="fab fa-linkedin" style={{ fontSize: '1.1rem', width: '18px', textAlign: 'center' }}></i>
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://x.com/RAHUL179300"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => handleSocialHover(e, true)}
                            onMouseLeave={(e) => handleSocialHover(e, false)}
                            style={socialBtnStyle}
                        >
                            <i className="fab fa-x-twitter" style={{ fontSize: '1.1rem', width: '18px', textAlign: 'center' }}></i>
                            <span>Twitter / X</span>
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Let's Work Together</h3>
                    <p>Open for collaborations and opportunities</p>
                    <a href="mailto:your.email@example.com" className="footer-cta">Get in Touch</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Rahul. All rights reserved.</p>
                <p>Made with <i className="fas fa-heart"></i> and <i className="fas fa-code"></i></p>
            </div>

            <button
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </footer>
    );
};

export default Footer;
