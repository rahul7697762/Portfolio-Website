import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/photos/IMG_20250604_0938251.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    const phrases = [
        'AI Developer',
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];

    // Typing effect
    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main timeline for hero entrance
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Profile image animation
            tl.from('.profile-image', {
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.5)',
                clearProps: 'all',
            })
                // Hero text animations
                .from('.greeting', {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    clearProps: 'all',
                }, '-=0.3')
                .from('.name', {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    clearProps: 'all',
                }, '-=0.4')
                .from('.typing-text', {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    clearProps: 'all',
                }, '-=0.3')
                // Hero tags with stagger
                .from('.hero-tags .tag', {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    clearProps: 'all',
                }, '-=0.2')
                // CTA buttons with stagger
                .from('.hero-actions .cta-button', {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    clearProps: 'all',
                }, '-=0.3')
                // Skill pills with cascade effect
                .from('.skills-pills .pill', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'back.out(1.7)',
                    clearProps: 'all',
                }, '-=0.2')
                // Social links
                .from('.hero-text .social-links a', {
                    y: 20,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    clearProps: 'all',
                }, '-=0.3');

            // Scroll indicator animation
            gsap.to('.scroll-indicator', {
                y: 10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            // Parallax effect on scroll
            gsap.to('.hero-content', {
                y: 100,
                opacity: 0.3,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" id="home" ref={heroRef}>
            <div className="hero-content" ref={contentRef}>
                <div className="profile-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div className="profile-image" style={{ width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '15px', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <img src={profilePhoto} alt="Rahul's Profile Picture" loading="eager" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        <div className="profile-ring"></div>
                        <div className="profile-status" style={{ position: 'absolute', bottom: '0', right: '10%', background: 'rgba(45, 90, 39, 0.8)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            <span className="status-dot"></span>
                            Available for work
                        </div>
                    </div>
                </div>
                <div className="hero-text">
                    <h1>
                        <span className="greeting">Hello, I'm</span>
                        <span className="name">Rahul</span>
                    </h1>
                    <p className="typing-text">{text}</p>
                    <div className="hero-tags">
                        <span className="tag"><i className="fas fa-robot"></i> AI Developer</span>
                        <span className="tag"><i className="fas fa-brain"></i> ML Engineer</span>
                        <span className="tag achievement"><i className="fas fa-star"></i> LeetCode 300+ | Rating 1664</span>
                    </div>
                    <div className="hero-actions">
                        <a href="#contact" className="cta-button primary">
                            <i className="fas fa-envelope"></i>
                            Get In Touch
                        </a>
                        <a href="#projects" className="cta-button secondary">
                            <i className="fas fa-eye"></i>
                            View Work
                        </a>
                        <a
                            href="https://czojdmudmetuihzlrkhk.supabase.co/storage/v1/object/public/resume/rahul_resume_updated%20(1).pdf"
                            className="cta-button outline"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Rahul_Resume.pdf"
                        >
                            <i className="fas fa-download"></i>
                            Download CV
                        </a>
                    </div>
                    <div className="skills-pills">
                        {['Python', 'C++', 'LangChain', 'LLMs', 'React', 'Next.js', 'Flask', 'Scikit-learn'].map(skill => (
                            <span className="pill" key={skill}>{skill}</span>
                        ))}
                    </div>
                    <div className="social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                        <a href="https://www.linkedin.com/in/rahul1232/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/rahul7697762/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}>
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:rahulsaini11204@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}>
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="scroll-arrow">
                    <i className="fas fa-chevron-down"></i>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
