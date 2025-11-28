import React, { useEffect, useRef } from 'react';

const CursorFollower = () => {
    const cursorRef = useRef(null);
    const cursorPos = useRef({ x: 0, y: 0 });
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (window.innerWidth > 768) {
                cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.1;
                cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.1;

                cursor.style.left = `${cursorPos.current.x}px`;
                cursor.style.top = `${cursorPos.current.y}px`;
                cursor.style.display = 'block';
            } else {
                cursor.style.display = 'none';
            }
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <div className="cursor-follower" ref={cursorRef}></div>;
};

export default CursorFollower;
