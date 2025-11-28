import React, { useEffect, useRef } from 'react';

const About = () => {
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        let count = 0;
                        const updateCount = () => {
                            const increment = target / 100;
                            if (count < target) {
                                count += increment;
                                counter.innerText = Math.ceil(count);
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
    };

    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        card.style.transition = 'none';
    };

    const handleCardLeave = (e) => {
        const card = e.currentTarget;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    };

    return (
        <section className="about" id="about" ref={statsRef}>
            <div className="section-header">
                <h2>About Me</h2>
                <p className="section-subtitle">Passionate about creating intelligent solutions</p>
            </div>
            <div className="about-content">
                <div className="about-intro">
                    <p>
                        As an aspiring AI and Machine Learning Engineer with a strong foundation in Full Stack Development, I combine technical expertise with creative problem-solving. My proficiency spans across multiple programming languages and databases, highlighted by my 4-star ratings in C++, Python, and SQL. Currently exploring Data Structures & Algorithms and Advanced C++, I'm passionate about creating intelligent solutions that bridge the gap between complex algorithms and user-friendly interfaces.
                    </p>
                </div>

                <div className="about-stats">
                    {[
                        { target: 7, label: 'Projects Completed' },
                        { target: 10, label: 'Certifications' },
                        { target: 12, label: 'Technologies' },
                        { target: 2, label: 'Years Learning' }
                    ].map((stat, index) => (
                        <div
                            className="stat-item"
                            key={index}
                            onMouseMove={handleCardMove}
                            onMouseEnter={handleCardEnter}
                            onMouseLeave={handleCardLeave}
                        >
                            <div className="stat-number" data-target={stat.target}>0</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="about-details">
                    <div
                        className="about-section education"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                        <div className="education-card">
                            <h4>B.Tech in Computer Science</h4>
                            <p className="university">Lovely Professional University</p>
                            <p className="duration"><i className="far fa-calendar-alt"></i> 2023 - 2027</p>
                            <div className="education-tags">
                                <span>Computer Science</span>
                                <span>Engineering</span>
                                <span>Technology</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="about-section"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-brain"></i> Machine Learning Expertise</h3>
                        <p>
                            My journey in ML involves developing sophisticated algorithms for real-world problems. I work with cutting-edge technologies like TensorFlow and PyTorch to create intelligent solutions that can analyze data, make predictions, and automate complex tasks.
                        </p>
                    </div>

                    <div
                        className="about-section"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-code"></i> Frontend Development</h3>
                        <p>
                            On the frontend side, I craft responsive and dynamic web applications using modern technologies like React.js. I'm passionate about creating seamless user experiences with clean, efficient code and innovative design solutions.
                        </p>
                    </div>

                    <div
                        className="about-section"
                        onMouseMove={handleCardMove}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <h3><i className="fas fa-rocket"></i> Innovation & Problem Solving</h3>
                        <p>
                            I thrive on tackling challenging problems and turning innovative ideas into reality. Whether it's optimizing ML models or building intuitive user interfaces, I'm committed to creating solutions that make a meaningful impact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
