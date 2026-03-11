import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfileStats from './components/ProfileStats';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import AnoAI from './components/ui/animated-shader-background';
import CursorFollower from './components/CursorFollower';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <AnoAI />
      <CursorFollower />
      <Navbar />

      <main className="content">
        <Hero />
        <ProfileStats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />

      </main>

      <Footer />
    </div>
  );
}

export default App;
