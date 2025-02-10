'use client'
import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function CountMate() {
  const [duration, setDuration] = useState(60);
  const [countInterval, setCountInterval] = useState(1); // renamed from "interval"
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const countRef = useRef(null);

  const startCounting = () => {
    setIsActive(true);
    let current = 1;
    const max = Math.floor(duration / countInterval);

    const tick = () => {
      if (current <= max) {
        // Update the visual count and time
        setCount(current);
        setTimeLeft(prev => prev - countInterval);

        // Cancel any pending speech before speaking the new number.
        window.speechSynthesis.cancel();

        // Create and speak the utterance.
        const utterance = new SpeechSynthesisUtterance(current.toString());
        utterance.lang = 'en-US';
        // Optionally adjust the speech rate if needed:
        utterance.rate = 2; 
        window.speechSynthesis.speak(utterance);

        current++;
        // Schedule the next tick after countInterval seconds.
        countRef.current = setTimeout(tick, countInterval * 1000);
      } else {
        stopCounting();
      }
    };

    tick();
  };

  const stopCounting = () => {
    clearTimeout(countRef.current);
    setIsActive(false);
    window.speechSynthesis.cancel();
  };

  const resetCounter = () => {
    stopCounting();
    setCount(0);
    setTimeLeft(duration);
  };

  useEffect(() => {
    setTimeLeft(duration);
    return () => {
      clearTimeout(countRef.current);
      window.speechSynthesis.cancel();
    };
  }, [duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.floor(Math.max(0, seconds) % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Count Mate</h1>
      <div className="text-center mb-6">
  <p className="text-lg font-medium text-gray-700">
    Count Mate is a simple timer design by Aung Ko Myint
  </p>
  <p className="text-sm text-gray-500 mt-2">
    Adjust the Duration and Interval, press Start, and let Count Mate guide you. You can stop or reset the timer anytime.
  </p>
</div>
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {count}
            </div>
            <div className="text-2xl font-semibold flex items-center justify-center gap-2">
              <Timer className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration: {duration}s</label>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={isActive}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interval: {countInterval}s</label>
            <input
              type="range"
              min={1}
              max={5}
              step={0.5}
              value={countInterval}
              onChange={(e) => setCountInterval(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={isActive}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={isActive ? stopCounting : startCounting}
              className={`flex items-center justify-center w-32 px-4 py-2 rounded-lg font-medium ${
                isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isActive ? (
                <><Pause className="w-4 h-4 mr-2" /> Stop</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Start</>
              )}
            </button>
            <button
              onClick={resetCounter}
              className="flex items-center justify-center w-32 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
              disabled={isActive}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </button>

          </div>
          <div className="text-center mt-6">
          <Link href="/" className='inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'>
        
        Back to Home
      
    </Link>
    </div>
        </div>
      </div>
    </div>
  );
}
