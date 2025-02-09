'use client'
import Header from './components/header';
import ComputerLove from './components/computerlove';
import Story from './components/story';
import Projects from './components/projects';
import GradientLine from './components/gradientline';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <GradientLine/>
      <ComputerLove />
      <Story />
      <Projects />
    </main>
  );
}