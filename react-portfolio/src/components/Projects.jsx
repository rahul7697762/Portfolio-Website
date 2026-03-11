import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animation
            gsap.from('.projects .section-header h2', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            gsap.from('.projects .section-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Filter buttons animation
            gsap.from('.filter-btn', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-filter',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Project cards stagger animation
            const projectCards = gsap.utils.toArray('.project-card');
            projectCards.forEach((card, index) => {
                gsap.from(card, {
                    y: 80,
                    opacity: 0,
                    rotateX: 15,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate filter change
    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.project-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }
    }, [filter]);

    const projects = [
        {
            title: 'Crop Guidance System',
            category: 'ml',
            image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
            status: 'Completed',
            statusClass: 'completed',
            icon: 'fa-seedling',
            description: 'Engineered a multi-model crop recommendation pipeline using CatBoost and LightGBM (~89% accuracy). Integrated live Weather API and market price endpoints for context-aware insights.',
            tech: ['React.js', 'Firebase', 'Flask API', 'Machine Learning', 'CatBoost'],
            links: {
                github: 'https://github.com/rahul7697762/Crop-Guidance-System.git',
                demo: '#'
            }
        },
        {
            title: 'PrepWise AI Platform',
            category: 'web',
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
            status: 'Live',
            statusClass: 'completed',
            icon: 'fa-microphone',
            description: 'AI-driven interview practice platform enabling real-time voice-based mock interviews using Vapi AI. Features dynamic performance dashboards and secure Firebase authentication.',
            tech: ['Next.js', 'TypeScript', 'Gemini', 'Firebase', 'Vapi AI'],
            links: {
                github: '#',
                demo: '#'
            }
        },
        {
            title: 'Portfolio Website',
            category: 'web',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
            status: 'Completed',
            statusClass: 'completed',
            icon: 'fa-code',
            description: 'A modern 3D portfolio website showcasing my skills and projects. Features interactive animations, responsive design, and seamless user experience with Three.js integration.',
            tech: ['React.js', 'Three.js', 'Vite', 'CSS3'],
            links: {
                github: 'https://github.com/rahul7697762/Portfolio-Website.git',
                demo: 'https://portfolio-website-nine-drab-37.vercel.app/'
            }
        },
        {
            title: 'Math Solving Assistant',
            category: 'ml',
            image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
            status: 'Completed',
            statusClass: 'completed',
            icon: 'fa-calculator',
            description: 'Chatbot website designed to help users solve mathematical problems and analyze images. Powered by Gemini\'s API and built with Python and Streamlit.',
            tech: ['Python', 'Gemini API', 'Streamlit', 'Computer Vision'],
            links: {
                github: 'https://github.com/rahul7697762/Ai-Math-Doubt-Solver',
                demo: 'https://ai-math-doubts-soler.onrender.com/'
            }
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    const handleCardMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = -((y - centerY) / centerY) * 12;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
        });

        // Spotlight effect
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        const content = card.querySelector('.project-content');
        const image = card.querySelector('.project-image img');

        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
        });

        if (content) {
            gsap.to(content, {
                z: 50,
                duration: 0.3,
                ease: 'power2.out',
            });
        }

        if (image) {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    const handleCardLeave = (e) => {
        const card = e.currentTarget;
        const content = card.querySelector('.project-content');
        const image = card.querySelector('.project-image img');

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
        });

        if (content) {
            gsap.to(content, {
                z: 30,
                duration: 0.5,
                ease: 'power2.out',
            });
        }

        if (image) {
            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    const handleFilterClick = (cat) => {
        setFilter(cat);
        // Animate filter button
        gsap.to(`.filter-btn.active`, {
            scale: 1,
            duration: 0.2,
        });
    };

    return (
        <section className="projects" id="projects" ref={sectionRef}>
            <div className="section-header">
                <h2>Featured Projects</h2>
                <p className="section-subtitle">Showcasing my latest work and innovations</p>
            </div>
            <div className="projects-filter">
                {['all', 'ml', 'web'].map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => handleFilterClick(cat)}
                    >
                        {cat === 'ml' ? 'AI & ML' : cat === 'web' ? 'Web Dev' : 'All Projects'}
                    </button>
                ))}
            </div>
            <div className="projects-grid" ref={gridRef}>
                {filteredProjects.map((project, index) => (
                    <div
                        className="project-card"
                        key={index}
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <div className="project-image">
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <div className="project-overlay">
                                <div className="project-links">
                                    <a href={project.links.github} className="project-link" aria-label="View Code" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href={project.links.demo} className="project-link" aria-label="Live Demo" target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="project-content">
                            <div className="project-header">
                                <i className={`fas ${project.icon} project-icon`}></i>
                                <h3>{project.title}</h3>
                                <span className={`project-status ${project.statusClass}`}>{project.status}</span>
                            </div>
                            <p className="project-description">
                                {project.description}
                            </p>
                            <div className="project-tech">
                                {project.tech.map((tech, idx) => (
                                    <span className="tech-tag" key={idx}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
