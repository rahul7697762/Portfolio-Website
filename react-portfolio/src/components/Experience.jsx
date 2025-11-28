import React, { useEffect, useRef } from 'react';

const Experience = () => {
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

    const experiences = [
        {
            date: '2025 - Present',
            title: 'AI Developer Intern',
            company: 'Rajni Tech Foundation',
            description: 'Spearheading the development of AI-driven web solutions. Integrated OpenAI and Gemini APIs to create intelligent chatbots and automated content generation tools. Optimized frontend performance using React.js and reduced API latency by 40%.',
            skills: ['Generative AI', 'React.js', 'Python', 'API Integration', 'Performance Optimization']
        },
        {
            date: '2024 - 2025',
            title: 'Freelance Full Stack Developer',
            company: 'Self-Employed',
            description: 'Delivered 5+ custom web applications for diverse clients. Built a scalable e-commerce platform with secure payment gateway integration. Implemented responsive designs ensuring 100% mobile compatibility and improved SEO rankings.',
            skills: ['MERN Stack', 'Next.js', 'Stripe API', 'SEO', 'Client Management']
        },
        {
            date: '2024',
            title: 'Open Source Contributor',
            company: 'GitHub Community',
            description: 'Active contributor to major open-source machine learning repositories. Fixed critical bugs in data processing pipelines and added documentation for new features. Collaborated with global developers to enhance code quality and maintainability.',
            skills: ['Git', 'Open Source', 'Python', 'TensorFlow', 'Collaboration']
        },
        {
            date: '2023 - Present',
            title: 'B.Tech in Computer Science',
            company: 'Lovely Professional University',
            description: 'Specializing in Artificial Intelligence and Machine Learning. Maintained a CGPA of 7.6. Leading the university coding club and organizing hackathons. Completed capstone projects in Computer Vision and NLP.',
            skills: ['Data Structures', 'Algorithms', 'Deep Learning', 'System Design', 'Leadership']
        }
    ];

    return (
        <section className="experience" id="experience" ref={sectionRef}>
            <div className="section-header">
                <h2>Experience & Journey</h2>
                <p className="section-subtitle">My professional path and academic milestones</p>
            </div>
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-date">{exp.date}</div>
                            <h3>{exp.title}</h3>
                            <h4>{exp.company}</h4>
                            <p>{exp.description}</p>
                            <div className="timeline-skills">
                                {exp.skills.map((skill, idx) => (
                                    <span key={idx}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
