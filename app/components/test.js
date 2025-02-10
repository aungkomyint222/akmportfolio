"use client";

import { useEffect, useRef, useState } from "react";

const MagnifyingGlassCursor = () => {
  const [enabled, setEnabled] = useState(true);
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const [allowScroll, setAllowScroll] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const lastScrollY = useRef(0); // Store last known scroll position

  let animationFrameId = null;

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  const updateCursor = () => {
    if (cursorRef.current && enabled) {
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y + offsetY}px, 0)`;
    }
    animationFrameId = requestAnimationFrame(updateCursor);
  };

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      if (!isMobile()) {
        positionRef.current.x = e.clientX - 48;
        positionRef.current.y = e.clientY - 48;
      }
    };

    const handleTouchStart = (e) => {
      if (isMobile() && e.touches.length > 0) {
        const touch = e.touches[0];
        const circle = cursorRef.current?.getBoundingClientRect();

        if (circle) {
          const touchY = touch.clientY - circle.top;
          const circleHeight = circle.height;

          if (touchY > circleHeight * 0.7) {
            // Touching the bottom → Keep circle above finger, prevent scrolling
            setAllowScroll(false);
            setOffsetY(-circleHeight / 2);
          } else if (touchY < circleHeight * 0.3) {
            // Touching the top → Keep circle under finger, allow scrolling
            setAllowScroll(true);
            setOffsetY(circleHeight / 2);
          } else {
            setOffsetY(0);
          }
        }
      }
    };

    const handleTouchMove = (e) => {
      if (isMobile() && e.touches.length > 0) {
        positionRef.current.x = e.touches[0].clientX - 48;
        positionRef.current.y = e.touches[0].clientY - 48;

        if (!allowScroll) {
          e.preventDefault(); // Stop scrolling when touching the bottom
        }
      }
    };

    // Fix cursor moving with the page scroll
    const handleScroll = () => {
      if (cursorRef.current) {
        const scrollDiff = window.scrollY - lastScrollY.current;
        positionRef.current.y -= scrollDiff; // Adjust the cursor position based on scroll difference
        lastScrollY.current = window.scrollY; // Update last scroll position
      }
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, allowScroll]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md"
      >
        {enabled ? "Disable Cursor" : "Enable Cursor"}
      </button>

      {/* Custom Cursor (Fixed Position) */}
      {enabled && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-[9999] w-40 h-40 rounded-full border-2 border-black bg-transparent backdrop-invert will-change-transform"
          style={{ transform: "translate3d(-100px, -100px, 0)", position: "fixed" }}
        />
      )}
    </div>
  );
};

export default MagnifyingGlassCursor;
