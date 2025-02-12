"use client";
import {Trophy, TrendingUp, Users, BarChart, Zap, Rocket, Search, ShoppingBag, Newspaper } from "lucide-react";
import { useState } from "react";

const Achievements = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const achievements = [
    {
      icon: <TrendingUp />,
      title: "60K YouTube Views",
      description: "Grew from 0 to 60K views on YouTube within 2 months.",
    },
    {
      icon: <Users />,
      title: "2M+ Facebook Community",
      description: "Built a Facebook group that reached over 2 million members.",
    },
    {
      icon: <BarChart />,
      title: "90% SEO Boost in 2 Weeks",
      description: "Increased a website’s Traffic by 90% within 2 weeks.",
    },
    {
      icon: <Zap />,
      title: "Fastest Website on the Internet",
      description: "Created the fastest website using Next.js and Netlify.",
    },
    {
      icon: <Rocket />,
      title: "110+ Users in 1 Hour",
      description: "Launched a task app that gained 110+ users within an hour.",
    },
    {
      icon: <Search />,
      title: "#1 Google Ranking in 24 Hours",
      description: "Ranked my personal portfolio as the top result on Google within 24 hours.",
    },
    {
      icon: <ShoppingBag />,
      title: "Sold Out a Clothing Brand",
      description: "Helped a small clothing brand sell out every product they launched.",
    },
    {
      icon: <Newspaper />,
      title: "Published 50+ Tech Articles",
      description: "Published over 50+ tech-related articles on my own Facebook blog.",
    },
    {
      icon: <Users />,
      title: "Media Co-Founder",
      description: "Co-founded a tech media company that covers various aspects of technology in Myanmar.",
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <Trophy className="text-white" size={28} />
        My Achievements
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {achievements.map((achieve, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-lg transition-all duration-300"
            style={{ backgroundColor: '#0a1929' }}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-center gap-2 text-white mb-2">
              {achieve.icon}
              <h3 className="font-semibold">{achieve.title}</h3>
            </div>
            <p className="text-gray-300 text-sm">
              {achieve.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;