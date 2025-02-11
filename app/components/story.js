'use client'
import React, { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Story = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize stories array to prevent unnecessary re-renders
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


  // Memoize handlers
  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  const handleSlideClick = useCallback((index) => {
    swiperRef.current?.swiper?.slideTo(index);
  }, []);

  return (
    <div className="bg-gray-900 text-white pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-4">My Journey in Tech</h1>
          <p className="text-lg text-white">Failure is not the end; persistence leads to true success.</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex === stories.length - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideClick(idx)}
                className={`w-3 h-3 rounded-full z-10 transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-white scale-125'
                    : idx < currentIndex
                    ? 'bg-gray-400'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
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
            fadeEffect={{
              crossFade: true
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            modules={[Mousewheel, Navigation, EffectFade]}
            speed={300}
            threshold={15}
          >
            {stories.map((story, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-black rounded-xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold ">Age {story.age}</span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm">
                      {story.highlight}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-4 ">{story.title}</h2>
                  <p className="text-lg leading-relaxed">{story.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className=" text-center text-gray-500 text-sm">
            Use arrow keys or swipe to navigate through my journey
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;