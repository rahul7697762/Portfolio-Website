import React, { useState, useEffect } from 'react';
import profilePhoto from '../assets/photos/IMG_20250604_0938251.jpg';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const phrases = [
        'Machine Learning Enthusiast',
        'Frontend Web Developer',
        'AI Engineer',
        'Problem Solver',
        'Data Scientist',
        'Full Stack Developer'
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

    return (
        <section className="hero" id="home">
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
                        <span className="tag"><i className="fas fa-robot"></i> Aspiring AI & ML Engineer</span>
                        <span className="tag"><i className="fas fa-code"></i> Frontend Developer</span>
                        <span className="tag achievement"><i className="fas fa-star"></i> 4⭐ in C++, Python, SQL</span>
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
                        <a href="/Resumes/Machine_Learning.pdf" className="cta-button outline" download>
                            <i className="fas fa-download"></i>
                            Download CV
                        </a>
                    </div>
                    <div className="skills-pills">
                        {['HTML', 'CSS', 'Python', 'C', 'DBMS', 'MySQL', 'DSA', 'Advanced C++'].map(skill => (
                            <span className="pill" key={skill}>{skill}</span>
                        ))}
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
