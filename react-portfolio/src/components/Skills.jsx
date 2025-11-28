import React, { useEffect, useRef } from 'react';

const Skills = () => {
    const skillsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const progressBars = entry.target.querySelectorAll('.skill-fill');
                    progressBars.forEach(bar => {
                        bar.style.transform = 'translateX(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: 'fa-code',
            skills: [
                { name: 'Python', icon: 'python/python-original.svg', level: 100 },
                { name: 'C++', icon: 'cplusplus/cplusplus-original.svg', level: 100 },
                { name: 'C', icon: 'c/c-original.svg', level: 100 },
                { name: 'Java', icon: 'java/java-original.svg', level: 100 },
            ]
        },
        {
            title: 'Web Technologies',
            icon: 'fa-globe',
            skills: [
                { name: 'HTML5', icon: 'html5/html5-original.svg', level: 100 },
                { name: 'CSS3', icon: 'css3/css3-original.svg', level: 100 },
                { name: 'React.js', icon: 'react/react-original.svg', level: 100 },
                { name: 'JavaScript', icon: 'javascript/javascript-original.svg', level: 100 },
            ]
        },
        {
            title: 'Tools & Frameworks',
            icon: 'fa-tools',
            skills: [
                { name: 'Git', icon: 'git/git-original.svg', level: 100 },
                { name: 'TensorFlow', icon: 'tensorflow/tensorflow-original.svg', level: 100 },
                { name: 'MySQL', icon: 'mysql/mysql-original.svg', level: 100 },
                { name: 'Node.js', icon: 'nodejs/nodejs-original.svg', level: 100 },
            ]
        }
    ];

    return (
        <section className="skills" id="skills" ref={skillsRef}>
            <div className="section-header">
                <h2>Skills & Technologies</h2>
                <p className="section-subtitle">My technical expertise and proficiency levels</p>
            </div>
            <div className="skills-container">
                {skillCategories.map((category, index) => (
                    <div className="skill-category" key={index}>
                        <h3><i className={`fas ${category.icon}`}></i> {category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, idx) => (
                                <div className="skill-item" key={idx}>
                                    <img
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`}
                                        alt={`${skill.name} logo`}
                                        className="skill-icon"
                                    />
                                    <div className="skill-info">
                                        <span className="skill-name">{skill.name}</span>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-fill"
                                                style={{ transform: 'translateX(-100%)' }}
                                            ></div>
                                        </div>
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
