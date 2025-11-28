import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: window.devicePixelRatio <= 1,
            alpha: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        camera.position.z = 5;

        // Particle System
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 1500 : 4000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        const natureColors = [];

        for (let i = 0; i < 10; i++) {
            const hue = 0.25 + Math.random() * 0.15; // Green range
            const saturation = 0.4 + Math.random() * 0.4;
            const lightness = 0.3 + Math.random() * 0.4;
            natureColors.push(new THREE.Color().setHSL(hue, saturation, lightness));
        }

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;

            const color = natureColors[Math.floor(Math.random() * natureColors.length)];
            colorArray[i] = color.r;
            colorArray[i + 1] = color.g;
            colorArray[i + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x2d5a27, 0.4);
        scene.add(ambientLight);

        const mouse = { x: 0, y: 0 };
        const mouseTarget = { x: 0, y: 0 };

        const handleMouseMove = (event) => {
            mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            mouse.x += (mouseTarget.x - mouse.x) * 0.05;
            mouse.y += (mouseTarget.y - mouse.y) * 0.05;

            particlesMesh.rotation.y += 0.0003 + (mouse.x * 0.0003);
            particlesMesh.rotation.x += 0.0003 + (mouse.y * 0.0003);

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return <div id="canvas-container" ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
};

export default ThreeBackground;
