'use client'
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    "https://picsum.photos/800/400?random=1"
   
  ];
  

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Reality Check Gallery</h1>
      <div className="relative w-full max-w-lg h-64 sm:h-96 flex items-center justify-center">
        <button onClick={prevImage} className="absolute left-2 p-2 bg-black/50 rounded-full">
          <ChevronLeft size={32} />
        </button>
        <div className="w-full h-full overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            width={600}
            height={400}
            className="rounded-lg w-full h-full object-cover invert"
            style={{ filter: "invert(1)" }}
          />
        </div>
        <button onClick={nextImage} className="absolute right-2 p-2 bg-black/50 rounded-full">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}