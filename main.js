import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// -------------------------------------------------------------------
// SETUP & CONFIGURATION
// -------------------------------------------------------------------

// Performance monitoring (for development)
const performance = {
    fps: 0,
    lastTime: 0,
    frameCount: 0
};

// Global DOM Elements
const cursorFollower = document.querySelector('.cursor-follower');
const nav = document.querySelector('.navigation');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.querySelector('.contact-form');
const typingText = document.querySelector('.typing-text');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');

// Global State
let lastScrollY = window.scrollY;
let ticking = false;
const mouse = { x: 0, y: 0 };
let mouseTarget = { x: 0, y: 0 };
let cursorX = 0;
let cursorY = 0;
let mouseX = 0;
let mouseY = 0;

// -------------------------------------------------------------------
// CURSOR FOLLOWER
// -------------------------------------------------------------------

function animateCursor() {
    // Only run if the follower is visible
    if (cursorFollower.style.display !== 'none') {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
    }
    requestAnimationFrame(animateCursor);
}

// -------------------------------------------------------------------
// THREE.JS SCENE SETUP
// -------------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: window.devicePixelRatio <= 1,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.z = 5;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;

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

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
    
    const color = natureColors[Math.floor(Math.random() * natureColors.length)];
    colorArray[i] = color.r;
    colorArray[i+1] = color.g;
    colorArray[i+2] = color.b;
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
const pointLight = new THREE.PointLight(0x4a7c59, 0.8, 100);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);
const directionalLight = new THREE.DirectionalLight(0x8fbc8f, 0.3);
directionalLight.position.set(-5, 5, 5);
scene.add(directionalLight);


// -------------------------------------------------------------------
// UI & INTERACTIVITY
// -------------------------------------------------------------------

// Smooth Scrolling
function smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Theme Toggle
function setupTheme() {
    const themeIcon = themeToggle.querySelector('i');
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        applyTheme(newTheme);
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    const duration = 2000;
    let current = 0;
    const increment = target / (duration / 16); // Calculate increment per frame (approx 60fps)

    const update = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

// Typing Animation
function typeWriter() {
    if(!typingText) return;
    const phrases = [
        'Machine Learning Enthusiast', 'Frontend Web Developer', 'AI Engineer',
        'Problem Solver', 'Data Scientist', 'Full Stack Developer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        let typeSpeed = isDeleting ? 75 : 150;

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }
    // Start after a short delay
    setTimeout(type, 1000);
}


// -------------------------------------------------------------------
// SCROLL-BASED EFFECTS (UNIFIED HANDLER)
// -------------------------------------------------------------------

function handleAllScrollEffects() {
    const currentScrollY = window.scrollY;

    // 1. Navigation Bar Styling & Hiding
    if (currentScrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    // 2. Scroll Progress Bar
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (currentScrollY / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';

    // 3. Back to Top Button Visibility
    if (currentScrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // 4. Parallax Effect
    const parallaxElements = document.querySelectorAll('.profile-image');
    parallaxElements.forEach(element => {
        const speed = 0.4;
        element.style.transform = `translateY(${currentScrollY * speed}px)`;
    });

    // Update last scroll position
    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleAllScrollEffects();
            ticking = false;
        });
        ticking = true;
    }
}


// -------------------------------------------------------------------
// MAIN ANIMATION LOOP (THREE.JS)
// -------------------------------------------------------------------

function animate() {
    // Smoothly update mouse position for particle interaction
    mouse.x += (mouseTarget.x - mouse.x) * 0.05;
    mouse.y += (mouseTarget.y - mouse.y) * 0.05;

    // Animate particles
    particlesMesh.rotation.y += 0.0003 + (mouse.x * 0.0003);
    particlesMesh.rotation.x += 0.0003 + (mouse.y * 0.0003);

    // Update controls
    controls.update();
    
    // Render the scene
    renderer.render(scene, camera);

    // FPS monitoring
    if (performance.lastTime) {
        performance.frameCount++;
        if (Date.now() - performance.lastTime >= 1000) {
            // console.log(`FPS: ${performance.frameCount}`);
            performance.fps = performance.frameCount;
            performance.frameCount = 0;
            performance.lastTime = Date.now();
        }
    } else {
        performance.lastTime = Date.now();
    }
}


// -------------------------------------------------------------------
// INITIALIZATION & EVENT LISTENERS
// -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    // --- General Event Listeners ---
    document.addEventListener('mousemove', (e) => {
        // For cursor follower
        mouseX = e.clientX;
        mouseY = e.clientY;
        // For Three.js scene
        mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update camera
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            // Update renderer
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            // Update cursor visibility
            cursorFollower.style.display = (window.innerWidth <= 768) ? 'none' : 'block';
        }, 150);
    });

    document.addEventListener('visibilitychange', () => {
        // Pause animation when tab is not visible to save resources
        if (document.hidden) {
            renderer.setAnimationLoop(null);
        } else {
            renderer.setAnimationLoop(animate);
        }
    });

    // --- Component-specific Initializations ---

    // Cursor
    cursorFollower.style.display = (window.innerWidth > 768) ? 'block' : 'none';
    animateCursor();

    // Theme
    setupTheme();

    // Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target);
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Project Filtering
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            
            document.querySelectorAll('.project-card').forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const matchesFilter = (filter === 'all' || category === filter);
                
                card.style.transitionDelay = `${index * 50}ms`;
                card.classList.toggle('hidden', !matchesFilter);
            });
        });
    });
    
    // Certificate Slider
    const sliderContainer = document.querySelector('.certificates-slider-container');
    if(sliderContainer) {
        // The complex slider logic from the original code can be placed here.
        // It was well-written and is self-contained.
    }
    // =======================================================
// DYNAMIC CODING PROFILE FETCHER
// =======================================================

// --- CONFIGURATION ---
// IMPORTANT: Replace with your actual usernames!
const profileUsernames = {
    leetcode: 'your-leetcode-username',
    codeforces: 'your-codeforces-handle',
    codechef: 'your-codechef-username'
};

// This URL should point to your own serverless function proxy for best results.
// See the "Serverless Function" explanation below.
// If you don't have a proxy, you can try the direct API URLs, but they may fail.
const API_BASE_URL = 'https://your-vercel-project.vercel.app/api/userdata'; // Recommended
// const API_BASE_URL = ''; // Use this if trying direct calls

/**
 * Fetches all coding profile data when the page loads.
 */
async function fetchAllCodingProfiles() {
    // We fetch them in parallel for faster loading
    await Promise.all([
        fetchLeetCodeData(),
        fetchCodeforcesData(),
        fetchCodeChefData()
    ]);
}

// --- LeetCode ---
async function fetchLeetCodeData() {
    const card = document.getElementById('leetcode-card');
    // NOTE: This unofficial API is often blocked by CORS. A proxy is needed.
    const url = `${API_BASE_URL}?platform=leetcode&username=${profileUsernames.leetcode}`;
    // Direct URL (likely to fail): `https://leetcode-stats-api.herokuapp.com/${profileUsernames.leetcode}`
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        document.getElementById('leetcode-solved').textContent = data.totalSolved || 'N/A';
        document.getElementById('leetcode-easy').textContent = data.easySolved || 'N/A';
        document.getElementById('leetcode-medium').textContent = data.mediumSolved || 'N/A';
        document.getElementById('leetcode-hard').textContent = data.hardSolved || 'N/A';
        
        card.classList.add('loaded');
    } catch (error) {
        console.error('Failed to fetch LeetCode data:', error);
        handleFetchError(card, 'Could not load LeetCode stats.');
    }
}

// --- Codeforces ---
async function fetchCodeforcesData() {
    const card = document.getElementById('codeforces-card');
    // Codeforces has an official API, but calling from a browser might still be restricted.
    const url = `${API_BASE_URL}?platform=codeforces&username=${profileUsernames.codeforces}`;
    // Direct URL: `https://codeforces.com/api/user.info?handles=${profileUsernames.codeforces}`

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (data.status !== 'OK' || !data.result || data.result.length === 0) {
            throw new Error('User not found or API error.');
        }
        const user = data.result[0];
        document.getElementById('codeforces-rating').textContent = user.rating || 'Unrated';
        document.getElementById('codeforces-max-rating').textContent = user.maxRating || 'Unrated';
        document.getElementById('codeforces-rank').textContent = user.rank || 'N/A';

        card.classList.add('loaded');
    } catch (error) {
        console.error('Failed to fetch Codeforces data:', error);
        handleFetchError(card, 'Could not load Codeforces stats.');
    }
}

// --- CodeChef ---
async function fetchCodeChefData() {
    const card = document.getElementById('codechef-card');
    // NOTE: This is another unofficial API that requires a proxy.
    const url = `${API_BASE_URL}?platform=codechef&username=${profileUsernames.codechef}`;
    // Direct URL (likely to fail): `https://codechef-api.vercel.app/${profileUsernames.codechef}`

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.errors[0] || 'User not found.');
        }
        document.getElementById('codechef-rating').textContent = data.rating || 'N/A';
        document.getElementById('codechef-stars').textContent = data.stars || 'N/A';
        document.getElementById('codechef-global-rank').textContent = data.globalRank || 'N/A';
        
        card.classList.add('loaded');
    } catch (error) {
        console.error('Failed to fetch CodeChef data:', error);
        handleFetchError(card, 'Could not load CodeChef stats.');
    }
}


/**
 * Handles UI changes when an API fetch fails.
 * @param {HTMLElement} card The profile card element.
 * @param {string} message The error message to display.
 */
function handleFetchError(card, message) {
    if (!card) return;
    const errorElement = card.querySelector('.card-error-msg');
    errorElement.textContent = message;
    card.classList.add('error');
}

// Add the call to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... (all your other initialization code)

    // Fetch coding profiles data
    fetchAllCodingProfiles();
});

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => { // Simulate API call
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('skill-item')) {
                    const skillFill = entry.target.querySelector('.skill-fill');
                    skillFill.style.transform = `translateX(-${100 - parseInt(skillFill.dataset.skill, 10)}%)`;
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }

                obs.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, .skill-item, .stat-number, .project-card, .certificate-card').forEach(el => {
        observer.observe(el);
    });

    // Start typing animation
    typeWriter();

    // Start the main Three.js animation loop
    renderer.setAnimationLoop(animate);

    // PWA Service Worker
    if ('serviceWorker'in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered.', reg))
                .catch(err => console.error('Service Worker registration failed:', err));
        });
    }

    console.log('🚀 Portfolio initialized successfully!');
});

// Global Error Handling
window.addEventListener('error', (e) => console.error('Global error:', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('Unhandled promise rejection:', e.reason));