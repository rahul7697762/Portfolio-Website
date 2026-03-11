import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animation
            gsap.from('.experience .section-header h2', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.experience .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            gsap.from('.experience .section-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.experience .section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Timeline items animation
            const timelineItems = gsap.utils.toArray('.timeline-item');
            timelineItems.forEach((item, index) => {
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    gsap.from(dot, {
                        scale: 0,
                        duration: 0.5,
                        delay: index * 0.2,
                        ease: 'back.out(1.7)',
                        clearProps: 'all',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    });
                }

                const content = item.querySelector('.timeline-content');
                if (content) {
                    gsap.from(content, {
                        x: index % 2 === 0 ? -60 : 60,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        clearProps: 'all',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    });

                    const date = content.querySelector('.timeline-date');
                    if (date) {
                        gsap.from(date, {
                            y: -20,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0.3 + index * 0.15,
                            ease: 'power3.out',
                            clearProps: 'all',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        });
                    }

                    const skills = content.querySelectorAll('.timeline-skills span');
                    if (skills.length) {
                        gsap.from(skills, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.4,
                            stagger: 0.05,
                            delay: 0.5 + index * 0.15,
                            ease: 'back.out(1.7)',
                            clearProps: 'all',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        });
                    }
                }
            });
            // Note: .timeline::before is a CSS pseudo-element — GSAP cannot animate it.

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const experiences = [
        {
            date: 'Oct 2025 – Present',
            title: 'AI Developer Intern → AI Executive',
            company: 'Bitlance Tech Hub Private Limited',
            description: 'Pioneered and deployed multi-agent LLM systems using LangChain and n8n, automating business workflows and reducing manual operations by 40%. Integrated AI agents into production workflows with real-time decision systems, improving automation efficiency by 30%. Established comprehensive testing protocols ensuring 95%+ production reliability while mentoring 3 interns.',
            skills: ['LangChain', 'LangGraph', 'n8n', 'LLMs', 'Next.js', 'Supabase']
        },
        {
            date: '2023 – 2027',
            title: 'B.Tech — Computer Science & Engineering',
            company: 'Lovely Professional University, Phagwara, Punjab',
            description: 'Pursuing Bachelor of Technology in Computer Science and Engineering. CGPA: 7.6. Focused on Data Structures & Algorithms, OOPS, Operating Systems, Computer Networks, Machine Learning, and AI.',
            skills: ['DSA', 'OOPS', 'OS', 'CN', 'C++', 'Python', 'ML']
        },
        {
            date: '2021 – 2022',
            title: '12th — Science Stream',
            company: 'A.W Faez E-Aam Inter College, Amroha, Uttar Pradesh',
            description: 'Completed 12th with Science stream. Percentage: 69.8%.',
            skills: ['Physics', 'Chemistry', 'Mathematics']
        },
        {
            date: '2019 – 2020',
            title: '10th — Science Stream',
            company: 'H.P Inter College, Amroha, Uttar Pradesh',
            description: 'Completed 10th with Science stream. Percentage: 69.7%.',
            skills: ['Mathematics', 'Science', 'English']
        }
    ];

    const handleCardHover = (e, isEnter) => {
        const content = e.currentTarget.querySelector('.timeline-content');
        if (content) {
            gsap.to(content, {
                scale: isEnter ? 1.02 : 1,
                boxShadow: isEnter ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)',
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    return (
        <section className="experience" id="experience" ref={sectionRef}>
            <div className="section-header">
                <h2>Experience & Education</h2>
                <p className="section-subtitle">My professional journey and academic background</p>
            </div>
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div
                        className="timeline-item"
                        key={index}
                        onMouseEnter={(e) => handleCardHover(e, true)}
                        onMouseLeave={(e) => handleCardHover(e, false)}
                    >
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
