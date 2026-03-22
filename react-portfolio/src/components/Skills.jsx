import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animation
            gsap.from('.skills .section-header h2', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            gsap.from('.skills .section-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Skill categories with stagger
            const skillCategories = gsap.utils.toArray('.skill-category');
            skillCategories.forEach((category, index) => {
                // Category card reveal
                gsap.from(category, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });

                // Category icon animation
                const icon = category.querySelector('h3 i');
                if (icon) {
                    gsap.from(icon, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.6,
                        delay: 0.3 + index * 0.15,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: '.skills-container',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    });
                }

                // Progress bars animation
                const progressBars = category.querySelectorAll('.progress');
                progressBars.forEach((bar, barIndex) => {
                    const width = bar.style.width;
                    gsap.fromTo(bar,
                        { width: '0%', opacity: 0 },
                        {
                            width: width,
                            opacity: 1,
                            duration: 1.2,
                            delay: 0.5 + index * 0.15 + barIndex * 0.1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: '.skills-container',
                                start: 'top 80%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                });

                // Skill items stagger
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((item, itemIndex) => {
                    gsap.from(item, {
                        x: -30,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.4 + index * 0.15 + itemIndex * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.skills-container',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skillCategories = [
        {
            title: 'Languages',
            icon: 'fa-code',
            skills: [
                { name: 'Python', level: 90 },
                { name: 'C++', level: 85 },
                { name: 'SQL', level: 80 },
            ]
        },
        {
            title: 'ML & AI',
            icon: 'fa-brain',
            skills: [
                { name: 'Data Preprocessing & Feature Engineering', level: 85 },
                { name: 'Supervised Learning (RF, SVM, KNN, NB)', level: 85 },
                { name: 'Unsupervised Learning (K-Means, DBSCAN)', level: 80 },
                { name: 'CNN & Computer Vision', level: 75 },
            ]
        },
        {
            title: 'Tools & Frameworks',
            icon: 'fa-tools',
            skills: [
                { name: 'Scikit-learn, Pandas, NumPy', level: 88 },
                { name: 'TensorFlow & Hugging Face', level: 78 },
                { name: 'Git & GitHub', level: 90 },
                { name: 'CI/CD & MLOps', level: 75 },
            ]
        },
        {
            title: 'Generative AI',
            icon: 'fa-robot',
            skills: [
                { name: 'LangChain & LangGraph', level: 85 },
                { name: 'RAG & Vector Search', level: 82 },
                { name: 'Agentic AI & LLMs', level: 80 },
                { name: 'Transformers', level: 78 },
            ]
        },
        {
            title: 'Backend & Cloud',
            icon: 'fa-server',
            skills: [
                { name: 'Flask & RESTful APIs', level: 82 },
                { name: 'Node.js', level: 78 },
                { name: 'Supabase, MySQL & MongoDB', level: 80 },
                { name: 'Vector Databases', level: 75 },
            ]
        },
        {
            title: 'Core Concepts',
            icon: 'fa-layer-group',
            skills: [
                { name: 'Data Structures & Algorithms', level: 85 },
                { name: 'Object-Oriented Programming', level: 88 },
                { name: 'Operating Systems', level: 78 },
                { name: 'Computer Networks', level: 78 },
            ]
        },
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
                                        <span className="skill-percent">{skill.level}%</span>
                                    </div>
                                    <div className="skill-progress">
                                        <div
                                            className="progress"
                                            style={{ width: `${skill.level}%` }}
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
