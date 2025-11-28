import React, { useState, useEffect, useRef } from 'react';
import n1 from '../assets/photos/n1.png';
import python from '../assets/photos/python.png';
import sql from '../assets/photos/sql.png';
import cpp from '../assets/photos/cpp.png';
import dsa from '../assets/photos/dsa.png';
import c from '../assets/photos/c.png';
import n2 from '../assets/photos/n2.png';

const Certificates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);

    const certificates = [
        { title: 'Computer Networking', desc: 'Professional Networking Certification', date: '2024', img: n1 },
        { title: 'Python Programming', desc: 'Advanced Python Development', date: '2024', img: python },
        { title: 'SQL Database', desc: 'Database Management & SQL', date: '2024', img: sql },
        { title: 'C++ Programming', desc: 'Advanced C++ Development', date: '2024', img: cpp },
        { title: 'Data Structures & Algorithms', desc: 'Advanced DSA Certification', date: '2024', img: dsa },
        { title: 'C Programming', desc: 'Core C Programming', date: '2024', img: c },
        { title: 'Internetworking Technologies', desc: 'Advanced Network Infrastructure', date: '2024', img: n2 },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="certificates" className="certificates-section" ref={sectionRef}>
            <div className="section-header">
                <h2>Certificates & Achievements</h2>
                <p className="section-subtitle">My Professional Certifications and Technical Achievements</p>
            </div>
            <div className="slider-container" style={{ overflow: 'hidden' }}>
                <button className="slider-button prev" onClick={prevSlide} aria-label="Previous certificate">❮</button>
                <div
                    className="certificates-slider"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / certificates.length}%)`,
                        width: `${certificates.length * 100}%`,
                        display: 'flex',
                        transition: 'transform 0.5s ease'
                    }}
                >
                    {certificates.map((cert, index) => (
                        <div
                            className="certificate-card"
                            key={index}
                            style={{
                                width: `${100 / certificates.length}%`,
                                flexShrink: 0,
                                flexGrow: 0
                            }}
                        >
                            <img src={cert.img} alt={`${cert.title} Certificate`} loading="lazy" />
                            <div className="certificate-details">
                                <h3>{cert.title}</h3>
                                <p>{cert.desc}</p>
                                <p className="certificate-date">{cert.date}</p>
                                <div className="certificate-badge">
                                    <i className="fas fa-certificate"></i>
                                    Certified
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="slider-button next" onClick={nextSlide} aria-label="Next certificate">❯</button>
            </div>
            <div className="slider-dots">
                {certificates.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;
