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
                    <div className="stat-item">
                        <div className="stat-number" data-target="7">0</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" data-target="10">0</div>
                        <div className="stat-label">Certifications</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" data-target="12">0</div>
                        <div className="stat-label">Technologies</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" data-target="2">0</div>
                        <div className="stat-label">Years Learning</div>
                    </div>
                </div>

                <div className="about-details">
                    <div className="about-section education">
                        <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                        <div className="education-card">
                            <h4>B.Tech in Computer Science</h4>
                            <p className="university">Lovely Professional University</p>
                            <p className="duration"><i class="far fa-calendar-alt"></i> 2023 - 2027</p>
                            <div className="education-tags">
                                <span>Computer Science</span>
                                <span>Engineering</span>
                                <span>Technology</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-section">
                        <h3><i className="fas fa-brain"></i> Machine Learning Expertise</h3>
                        <p>
                            My journey in ML involves developing sophisticated algorithms for real-world problems. I work with cutting-edge technologies like TensorFlow and PyTorch to create intelligent solutions that can analyze data, make predictions, and automate complex tasks.
                        </p>
                    </div>

                    <div className="about-section">
                        <h3><i className="fas fa-code"></i> Frontend Development</h3>
                        <p>
                            On the frontend side, I craft responsive and dynamic web applications using modern technologies like React.js. I'm passionate about creating seamless user experiences with clean, efficient code and innovative design solutions.
                        </p>
                    </div>

                    <div className="about-section">
                        <h3><i className="fas fa-rocket"></i> Innovation & Problem Solving</h3>
                        <p>
                            I thrive on tackling challenging problems and turning innovative ideas into reality. Whether it's optimizing ML models or building intuitive user interfaces, I'm committed to creating solutions that make a meaningful impact.
                        </p>
                    </div>
                </div>

                <div className="about-highlights">
                    <div className="highlight">
                        <i className="fas fa-graduation-cap"></i>
                        <span>Computer Science Background</span>
                    </div>
                    <div className="highlight">
                        <i className="fas fa-project-diagram"></i>
                        <span>Full-Stack Capabilities</span>
                    </div>
                    <div className="highlight">
                        <i className="fas fa-users"></i>
                        <span>Team Collaboration</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
