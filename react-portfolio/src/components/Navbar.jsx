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
            // Navbar slide down
            gsap.from('.navigation', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2,
            });

            // Nav brand animation
            gsap.from('.nav-brand', {
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.5,
            });

            // Nav links stagger
            gsap.from('.nav-links li', {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.6,
            });

            // Theme toggle — use CSS for initial visibility, no GSAP opacity/scale animation
        }, navRef);

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
