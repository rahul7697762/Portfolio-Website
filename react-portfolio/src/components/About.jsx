import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef(null);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animation
            gsap.from('.about .section-header h2', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            gsap.from('.about .section-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // About intro animation
            gsap.from('.about-intro', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-intro',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Stats items with stagger and counter animation
            const statItems = gsap.utils.toArray('.stat-item');
            statItems.forEach((item, index) => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        onEnter: () => {
                            // Animate counter
                            const counter = item.querySelector('.stat-number');
                            const target = parseInt(counter.getAttribute('data-target'));
                            gsap.to({ value: 0 }, {
                                value: target,
                                duration: 2,
                                delay: index * 0.1,
                                ease: 'power2.out',
                                onUpdate: function () {
                                    counter.textContent = Math.round(this.targets()[0].value);
                                },
                            });
                        },
                    },
                });
            });

            // About sections (cards) with stagger
            const aboutSections = gsap.utils.toArray('.about-section');
            aboutSections.forEach((section, index) => {
                gsap.from(section, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-details',
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });

                // Icon animation
                const icon = section.querySelector('h3 i');
                if (icon) {
                    gsap.from(icon, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.5,
                        delay: 0.3 + index * 0.15,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: '.about-details',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    });
                }
            });

            // Education tags animation
            gsap.from('.education-tags span', {
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.education',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleCardMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = -((y - centerY) / centerY) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    };

    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleCardLeave = (e) => {
        const card = e.currentTarget;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="section-header">
                <h2>About Me</h2>
                <p className="section-subtitle">Passionate about creating intelligent solutions</p>
            </div>
            <div className="about-content">
                <div className="about-intro">
                    <p>
                        As an aspiring AI and Machine Learning Engineer with a strong foundation in Full Stack Development, I combine technical expertise with creative problem-solving. My proficiency spans across multiple programming languages and databases, highlighted by my 4-star ratings in C++, Python, and SQL. Currently exploring Data Structures & Algorithms and Advanced C++, I'm passionate about creating intelligent solutions that bridge the gap between complex algorithms and user-friendly interfaces.
                    </p>
                </div>

                <div className="about-stats" ref={statsRef}>
                    {[
                        { target: 7, label: 'Projects Completed', icon: 'fa-rocket' },
                        { target: 10, label: 'Certifications', icon: 'fa-certificate' },
                        { target: 12, label: 'Technologies', icon: 'fa-code' },
                        { target: 2, label: 'Years Learning', icon: 'fa-graduation-cap' }
                    ].map((stat, index) => (
                        <div
                            className="stat-item"
                            key={index}
                            onMouseMove={handleCardMove}
                            onMouseEnter={handleCardEnter}
                            onMouseLeave={handleCardLeave}
                        >
                            <i className={`fas ${stat.icon} stat-icon-top`}></i>
                            <div className="stat-number" data-target={stat.target}>0</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="about-details">
                    <div
                        className="about-section education"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                        <div className="education-card">
                            <h4>B.Tech in Computer Science</h4>
                            <p className="university">Lovely Professional University</p>
                            <p className="duration"><i className="far fa-calendar-alt"></i> 2023 - 2027</p>
                            <div className="education-tags">
                                <span>Computer Science</span>
                                <span>Engineering</span>
                                <span>Technology</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="about-section"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-brain"></i> Machine Learning Expertise</h3>
                        <p>
                            My journey in ML involves developing sophisticated algorithms for real-world problems. I work with cutting-edge technologies like TensorFlow and PyTorch to create intelligent solutions that can analyze data, make predictions, and automate complex tasks.
                        </p>
                    </div>

                    
                    <div
                        className="about-section"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-rocket"></i> Innovation & Problem Solving</h3>
                        <p>
                            I thrive on tackling challenging problems and turning innovative ideas into reality. Whether it's optimizing ML models or building intuitive user interfaces, I'm committed to creating solutions that make a meaningful impact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
