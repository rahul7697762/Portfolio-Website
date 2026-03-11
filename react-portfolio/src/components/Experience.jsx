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
            date: 'Oct 2025 - Present',
            title: 'AI Developer Intern',
            company: 'Bitlance Tech Hub Private Limited',
            description: 'Built and integrated AI agents using n8n and Supabase to automate business workflows. Collaborated with product teams to enhance real-time decision systems, improving automation efficiency by 30%. Progressed into an AI Executive role, leading AI-driven automation initiatives and mentoring interns. Designed scalable multi-agent LLM pipelines with LangChain and Next.js.',
            skills: ['n8n', 'React', 'LLMs', 'LangChain', 'Next.js', 'Supabase']
        },
        {
            date: 'Aug 2025 - Nov 2025',
            title: 'Web Development Intern',
            company: 'Rajni Tech Foundation',
            description: 'Developed and maintained responsive web applications. Collaborated with the design team to implement UI/UX improvements. Worked on frontend development using React.js and ensured cross-browser compatibility.',
            skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Git']
        },
        {
            date: '2023 - 2027',
            title: 'B.Tech in Computer Science',
            company: 'Lovely Professional University',
            description: 'Pursuing Bachelor of Technology in Computer Science and Engineering. Maintaining a CGPA of 7.6. Focusing on Data Structures, Algorithms, OOPS, Operating Systems, and Computer Networks.',
            skills: ['DSA', 'OOPS', 'OS', 'CN', 'C++', 'Python']
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
