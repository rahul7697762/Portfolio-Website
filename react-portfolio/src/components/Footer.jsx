import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer" id="contact">
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
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/rahul1232/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/rahul7697762" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:your.email@example.com" title="Email">
                            <i className="fas fa-envelope"></i>
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
