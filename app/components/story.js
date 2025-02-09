import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Story = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      age: "8",
      title: "The First Step into Tech",
      text: "Received my first laptop - a gift that would shape my future. This was the moment that sparked my lifelong passion for technology.",
      highlight: "First Computer"
    },
    {
      age: "10",
      title: "Digital Art Discovery",
      text: "Discovered Adobe Photoshop and dove deep into digital creativity. Spent countless hours learning every tool and technique I could find.",
      highlight: "Creative Journey"
    },
    {
      age: "11",
      title: "Hardware & OS Explorer",
      text: "Took my first steps into system administration by learning to dual-boot Linux and Windows. Fixed my computer hardware issues independently.",
      highlight: "Tech Independence"
    },
    {
      age: "12",
      title: "Code Academy",
      text: "Began my programming journey, exploring various languages and understanding the fundamentals of coding. Each new language opened up new possibilities.",
      highlight: "First Code"
    },
    {
      age: "14-15",
      title: "Academic Excellence",
      text: "Graduated high school with honors, balancing my passion for technology with academic achievement. A testament to dedication and hard work.",
      highlight: "Academic Success"
    },
    {
      age: "16-17",
      title: "Higher Education",
      text: "Embarked on my college journey in computer science and cybersecurity. Started building the foundation for my future in tech.",
      highlight: "College Journey"
    },
    {
      age: "18",
      title: "Web Development",
      text: "Built my first full-stack applications using PHP and MySQL. Created solutions that solved real-world problems.",
      highlight: "First Projects"
    },
    {
      age: "19-20",
      title: "Framework Mastery",
      text: "Mastered Laravel and advanced JavaScript, enabling me to build more complex and scalable applications.",
      highlight: "Skill Growth"
    },
    {
      age: "21-22",
      title: "Design Evolution",
      text: "Expanded my skillset through design school, combining technical expertise with creative design principles.",
      highlight: "Creative Growth"
    },
    {
      age: "23",
      title: "Professional Developer",
      text: "Working as a full-stack developer, creating impactful digital solutions and continuing to grow in my career.",
      highlight: "Career Success"
    },
  ];

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4">My Journey in Tech</h1>
          <p className="text-lg text-indigo-200">A true passion and a path of choice</p>
        </div>

        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex === stories.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-700 -translate-y-1/2"></div>
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideClick(idx)}
                className={`w-4 h-4 rounded-full z-10 transition-all duration-300 cursor-pointer hover:ring-4 hover:ring-indigo-300 hover:ring-opacity-50 ${
                  idx === currentIndex
                    ? 'bg-indigo-400 ring-4 ring-indigo-300 ring-opacity-50'
                    : idx < currentIndex
                    ? 'bg-indigo-500'
                    : 'bg-indigo-800'
                }`}
              />
            ))}
          </div>

          <Swiper
            ref={swiperRef}
            className="rounded-xl"
            spaceBetween={50}
            slidesPerView={1}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
            }}
            effect="fade"
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            modules={[Mousewheel, Navigation, EffectFade]}
            speed={500}
            threshold={15}
          >
            {stories.map((story, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-black backdrop-blur-md rounded-xl p-8 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-indigo-300">Age {story.age}</span>
                    <span className="px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-200">
                      {story.highlight}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-4 text-indigo-100">{story.title}</h2>
                  <p className="text-lg leading-relaxed text-indigo-100/90">{story.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-3 text-center text-indigo-200 text-sm">
            Use arrow keys or swipe to navigate through my journey
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;