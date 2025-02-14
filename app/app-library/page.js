import Link from 'next/link';
import { Home, CheckCircle, Compass, ArrowRight } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: "Aung Ko Myint - App Library",
    description:
      "Explore the App Library by Aung Ko Myint, showcasing innovative web apps like Taskest for task management and Career Compass for AI-powered career guidance.",
    keywords:
      "Aung Ko Myint, app library, web apps, Taskest, Career Compass, AI, task management, career guidance, web development",
    alternates: {
      canonical: "https://www.akmweb.online/app-library",
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 fixed w-full z-10">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-200 hover:text-white transition-colors group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          App Library by Aung Ko Myint
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed mb-12 max-w-3xl mx-auto text-center">
          Welcome to the official App Library of <span className="font-semibold text-white">Aung Ko Myint</span>, 
          where I present two of my most innovative web apps designed to improve productivity and career development.
        </p>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Taskest Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500 mr-3" />
              <h2 className="text-2xl font-semibold text-white">Taskest</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              A simple, intuitive task management tool designed to help you stay organized, 
              increase productivity, and manage tasks effectively. Whether you're a student, 
              professional, or entrepreneur, Taskest streamlines your daily to-do lists.
            </p>
            <Link 
              href="/taskest" 
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors group"
            >
              Explore Taskest
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Career Compass Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-center mb-4">
              <Compass className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-semibold text-white">Career Compass</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              An AI-powered tool designed to guide your career journey. Get personalized 
              career insights, job match predictions, and advice tailored to your skillset, 
              interests, and goals.
            </p>
            <Link 
              href="/careercompass" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors group"
            >
              Try Career Compass
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}