import Header from './components/header';
import ComputerLove from './components/computerlove';
import Story from './components/story';
import Projects from './components/projects';
import GradientLine from './components/gradientline';
import TrackPageView from './utils/TrackPageView'; // Import the client component

export default function Home() {
  console.log("Running on:", typeof window === "undefined" ? "Server" : "Client");
  return (
    
    <main className="min-h-screen">
      <TrackPageView /> {/* Runs only on the client */}
      <Header />
      <ComputerLove />
      <GradientLine />
      <Story />
      <Projects />
    </main>
  );
}
