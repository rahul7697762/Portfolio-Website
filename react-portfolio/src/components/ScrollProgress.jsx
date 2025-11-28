import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / height) * 100;
            setWidth(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div className="scroll-progress" style={{ width: `${width}%` }}></div>;
};

export default ScrollProgress;
