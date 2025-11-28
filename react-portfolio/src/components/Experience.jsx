import React from 'react';

const Experience = () => {
    const experiences = [
        {
            date: '2023 - Present',
            title: 'Computer Science Student',
            company: 'Lovely Professional University, CGPA: 7.6',
            description: 'Pursuing B.Tech in Computer Science with focus on AI/ML and software development. Maintaining excellent academic performance while working on practical projects.',
            skills: ['Data Structures', 'Algorithms', 'Machine Learning', 'Software Engineering']
        },
        {
            date: '2024',
            title: 'Freelance Developer',
            company: 'Self-Employed',
            description: 'Developed multiple web applications and machine learning projects for clients. Specialized in creating responsive websites and data analysis solutions.',
            skills: ['React.js', 'Python', 'Data Analysis', 'Web Development']
        },
        {
            date: '2025',
            title: 'Open Source Contributor',
            company: 'GitHub Community',
            description: 'Actively contributing to open source projects, particularly in machine learning and web development domains. Building a strong portfolio of collaborative work.',
            skills: ['Open Source', 'Git', 'Collaboration', 'Code Review']
        },
        {
            date: '2025',
            title: 'Web Development Intern',
            company: 'Rajni Tech Foundation',
            description: 'Developed and maintained responsive web applications for educational platforms. Collaborated with the design team to implement UI/UX improvements and ensure cross-browser compatibility. Worked on both frontend and backend development, including API integration and database management.',
            skills: ['HTML5/CSS3', 'JavaScript', 'React.js', 'Node.js', 'MongoDB', 'RESTful APIs', 'Git', 'Collaboration', 'Code Review', 'Documentation']
        }
    ];

    return (
        <section className="experience" id="experience">
            <div className="section-header">
                <h2>Experience & Journey</h2>
                <p className="section-subtitle">My professional and learning journey</p>
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
