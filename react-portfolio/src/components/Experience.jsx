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

    return (
        <section className="experience" id="experience" ref={sectionRef}>
            <div className="section-header">
                <h2>Experience & Education</h2>
                <p className="section-subtitle">My professional journey and academic background</p>
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
