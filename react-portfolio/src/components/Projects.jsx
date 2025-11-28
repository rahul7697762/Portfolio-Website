import React, { useState, useEffect, useRef } from 'react';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const sectionRef = useRef(null);

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
            description: 'Chatbot website designed to help users solve mathematical problems and analyze images. Powered by Gemini’s API and built with Python and Streamlit.',
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
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = -((y - centerY) / centerY) * 10;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        card.style.transition = 'none';
        const content = card.querySelector('.project-content');
        if (content) content.style.transform = 'translateZ(50px)';
    };

    const handleCardLeave = (e) => {
        const card = e.currentTarget;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        const content = card.querySelector('.project-content');
        if (content) content.style.transform = 'translateZ(30px)';
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
                        onClick={() => setFilter(cat)}
                    >
                        {cat === 'ml' ? 'AI & ML' : cat === 'web' ? 'Web Dev' : 'All Projects'}
                    </button>
                ))}
            </div>
            <div className="projects-grid">
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
