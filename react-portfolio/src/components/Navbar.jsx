import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState('dark');
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // GSAP navbar entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate nav-brand and nav-links scoped inside navRef
            gsap.from('.nav-brand', {
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.3,
                clearProps: 'all',
            });

            gsap.from('.nav-links li', {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.4,
                clearProps: 'all',
            });

            // Theme toggle — use CSS for initial visibility, no GSAP opacity/scale animation
        }, navRef);

        // Animate the nav element itself using the ref directly (can't select root from context)
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            clearProps: 'all',
        });

        return () => ctx.revert();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        // Theme toggle animation
        gsap.to('.theme-toggle i', {
            rotation: 360,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle('menu-open', !menuOpen);

        // Animate mobile menu
        if (!menuOpen) {
            gsap.from('.nav-links.active li', {
                x: 50,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power3.out',
            });
        }
    };

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setMenuOpen(false);
            document.body.classList.remove('menu-open');
        }
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'certificates', label: 'Certificates' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <nav className={`navigation ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
            <div className="nav-container">
                <a href="#home" className="nav-brand" onClick={(e) => scrollToSection(e, 'home')}>
                    <svg
                        className="nav-logo-mark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                        width="28"
                        height="28"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="nlg" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#818cf8" />
                            </linearGradient>
                        </defs>
                        <rect width="36" height="36" rx="8" fill="#0d1117" />
                        <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="7.5"
                            fill="none" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5" />
                        {/* Stem */}
                        <rect x="9" y="8" width="3.8" height="20" rx="1.2" fill="url(#nlg)" />
                        {/* Bowl arc */}
                        <path d="M12.8 8 Q23 8 23 14.5 Q23 21 12.8 21"
                            fill="none" stroke="url(#nlg)" strokeWidth="3.8" strokeLinecap="round" />
                        {/* Leg */}
                        <line x1="12.8" y1="21" x2="25" y2="28"
                            stroke="url(#nlg)" strokeWidth="3.8" strokeLinecap="round" />
                    </svg>
                    Rahul
                </a>

                <button
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger"></span>
                </button>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className={activeSection === link.id ? 'active' : ''}
                                onClick={(e) => scrollToSection(e, link.id)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
