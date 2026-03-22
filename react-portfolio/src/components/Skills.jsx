import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, Brain, Wrench, Bot, Server, Layers,
    Database, Eye, TrendingUp, GitBranch, Search, Link,
    Zap, Globe, Network, Box, Monitor, Filter,
    BarChart2, Cpu, RefreshCw, Sparkles, Shuffle, HardDrive, Wifi
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            const skillCategories = gsap.utils.toArray('.skill-category');
            skillCategories.forEach((category, index) => {
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
            CategoryIcon: Code2,
            skills: [
                { name: 'Python', level: 90, Icon: Code2 },
                { name: 'C++', level: 85, Icon: Cpu },
                { name: 'SQL', level: 80, Icon: Database },
            ]
        },
        {
            title: 'ML & AI',
            CategoryIcon: Brain,
            skills: [
                { name: 'Data Preprocessing & Feature Engineering', level: 85, Icon: Filter },
                { name: 'Supervised Learning (RF, SVM, KNN, NB)', level: 85, Icon: TrendingUp },
                { name: 'Unsupervised Learning (K-Means, DBSCAN)', level: 80, Icon: Shuffle },
                { name: 'CNN & Computer Vision', level: 75, Icon: Eye },
            ]
        },
        {
            title: 'Tools & Frameworks',
            CategoryIcon: Wrench,
            skills: [
                { name: 'Scikit-learn, Pandas, NumPy', level: 88, Icon: BarChart2 },
                { name: 'TensorFlow & Hugging Face', level: 78, Icon: Zap },
                { name: 'Git & GitHub', level: 90, Icon: GitBranch },
                { name: 'CI/CD & MLOps', level: 75, Icon: RefreshCw },
            ]
        },
        {
            title: 'Generative AI',
            CategoryIcon: Sparkles,
            skills: [
                { name: 'LangChain & LangGraph', level: 85, Icon: Link },
                { name: 'RAG & Vector Search', level: 82, Icon: Search },
                { name: 'Agentic AI & LLMs', level: 80, Icon: Bot },
                { name: 'Transformers', level: 78, Icon: Zap },
            ]
        },
        {
            title: 'Backend & Cloud',
            CategoryIcon: Server,
            skills: [
                { name: 'Flask & RESTful APIs', level: 82, Icon: Globe },
                { name: 'Node.js', level: 78, Icon: Server },
                { name: 'Supabase, MySQL & MongoDB', level: 80, Icon: Database },
                { name: 'Vector Databases', level: 75, Icon: HardDrive },
            ]
        },
        {
            title: 'Core Concepts',
            CategoryIcon: Layers,
            skills: [
                { name: 'Data Structures & Algorithms', level: 85, Icon: Network },
                { name: 'Object-Oriented Programming', level: 88, Icon: Box },
                { name: 'Operating Systems', level: 78, Icon: Monitor },
                { name: 'Computer Networks', level: 78, Icon: Wifi },
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
                {skillCategories.map((category, index) => {
                    const { CategoryIcon } = category;
                    return (
                        <div className="skill-category" key={index}>
                            <h3>
                                <CategoryIcon size={18} className="skill-cat-icon" />
                                {category.title}
                            </h3>
                            <div className="skills-list">
                                {category.skills.map((skill, idx) => {
                                    const { Icon } = skill;
                                    return (
                                        <div className="skill-item" key={idx}>
                                            <div className="skill-info">
                                                <span className="skill-name-wrap">
                                                    <Icon size={13} className="skill-item-icon" />
                                                    {skill.name}
                                                </span>
                                            </div>
                                            <div className="skill-progress">
                                                <div
                                                    className="progress"
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;
