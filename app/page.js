'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/app/utils/analytics';
import Header from './components/header';
import ComputerLove from './components/computerlove';
import Story from './components/story';
import Projects from './components/projects';
import GradientLine from './components/gradientline';

export default function Home() {
  useEffect(() => {
    trackEvent({
      action: 'view',
      category: 'page',
      label: 'home_page',
      value: 1
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
     
      <ComputerLove />
      <GradientLine/>
    
   
      <Story />
      <Projects />
    </main>
  );
}