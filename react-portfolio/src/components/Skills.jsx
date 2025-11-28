import React, { useEffect, useRef } from 'react';

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.transform = 'translateX(0)';
                    });
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const skillCategories = [
        {
            title: 'Languages',
            icon: 'fa-code',
            skills: [
                { name: 'Python', level: 90 },
                { name: 'C++', level: 85 },
                { name: 'JavaScript', level: 85 },
                { name: 'SQL', level: 80 }
            ]
        },
        {
            title: 'ML & AI',
            icon: 'fa-brain',
            skills: [
                { name: 'Machine Learning', level: 85 },
                { name: 'LangChain & LLMs', level: 80 },
                { name: 'RAG & Vector Search', level: 75 },
                { name: 'Preprocessing', level: 85 }
            ]
        },
        {
            title: 'Frameworks & Tools',
            icon: 'fa-tools',
            skills: [
                { name: 'React & Next.js', level: 85 },
                { name: 'Node.js & Express', level: 80 },
                { name: 'Docker', level: 75 },
                { name: 'Git & GitHub', level: 90 }
            ]
        },
        {
            title: 'Backend & Cloud',
            icon: 'fa-server',
            skills: [
                { name: 'Supabase & Firebase', level: 85 },
                { name: 'MySQL & MongoDB', level: 80 },
                { name: 'Flask API', level: 80 },
                { name: 'Vercel & Railway', level: 85 }
            ]
        }
    ];

    return (
        <section className="skills" id="skills" ref={sectionRef}>
            <div className="section-header">
                <h2>Technical Skills</h2>
                <p className="section-subtitle">My technical expertise and proficiency levels</p>
            </div>
            <div className="skills-container">
                {skillCategories.map((category, index) => (
                    <div className="skill-category" key={index}>
                        <h3><i className={`fas ${category.icon}`}></i> {category.title}</h3>
                        <div className="skills-list">
                            {category.skills.map((skill, idx) => (
                                <div className="skill-item" key={idx}>
                                    <div className="skill-info">
                                        <span>{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className="skill-progress">
                                        <div
                                            className="progress"
                                            style={{ width: `${skill.level}%`, transform: 'translateX(-100%)', transition: 'transform 1s ease-out' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
