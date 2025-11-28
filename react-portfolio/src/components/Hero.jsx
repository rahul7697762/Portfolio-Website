import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/photos/IMG_20250604_0938251.jpg';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const heroRef = useRef(null);

    const phrases = [
        'AI Developer',
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];

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

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="hero" id="home" ref={heroRef}>
            <div className="hero-content">
                <div className="profile-image">
                    <img src={profilePhoto} alt="Rahul's Profile Picture" loading="eager" />
                    <div className="profile-ring"></div>
                    <div className="profile-status">
                        <span className="status-dot"></span>
                        Available for work
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
                        <span className="tag"><i className="fas fa-code"></i> Full Stack Developer</span>
                        <span className="tag achievement"><i className="fas fa-star"></i> LeetCode 1664</span>
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
                        <a href="https://drive.google.com/file/d/1ezQbnjycwuy_qZ6CbsFUy3FGDgbuVZJ9/view?usp=sharing" className="cta-button outline" download>
                            <i className="fas fa-download"></i>
                            Download CV
                        </a>
                    </div>
                    <div className="skills-pills">
                        {['Python', 'C++', 'React', 'Next.js', 'Machine Learning', 'LangChain', 'Docker', 'AWS'].map(skill => (
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
