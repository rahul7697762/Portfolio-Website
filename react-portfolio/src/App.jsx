import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CursorFollower from './components/CursorFollower';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <ThreeBackground />
      <CursorFollower />
      <Navbar />

      <main className="content">
        <Hero />
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
