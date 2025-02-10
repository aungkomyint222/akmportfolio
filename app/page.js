import Header from './components/header';
import  MagnifyingGlassCursor from './components/test';
import  GalleryPage from './components/gallery';
import ComputerLove from './components/computerlove';
import Story from './components/story';
import Projects from './components/projects';
import GradientLine from './components/gradientline';
import TrackPageView from './utils/TrackPageView'; // Import the client component

export default function Home() {
  
  return (
    
    <main className="min-h-screen">
        <MagnifyingGlassCursor />
      <TrackPageView /> {/* Runs only on the client */}
    
      <Header />
      <ComputerLove />
    
      <GradientLine />
      <Story />
      <GalleryPage />
      <Projects />
    </main>
  );
}
