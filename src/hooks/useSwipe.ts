import { useState, useEffect } from "react";

// Define the types for the callback functions
type SwipeCallback = () => void;

const useSwipe = (
  onSwipeUp: SwipeCallback,
  onSwipeDown: SwipeCallback,
  threshold: number = 50
): void => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset touch coordinates after a delay to avoid multiple swipe detections
  const resetTouch = (): void => {
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Effect to add and remove touch event listeners
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent): void => {
      setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent): void => {
      setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = (): void => {
      if (touchStart !== null && touchEnd !== null) {
        const swipeDistance = touchStart - touchEnd;
        if (swipeDistance > threshold) {
          onSwipeUp();
        } else if (swipeDistance < -threshold) {
          onSwipeDown();
        }
      }
      resetTouch();
    };

    // Adding touch event listeners
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStart, touchEnd, onSwipeUp, onSwipeDown, threshold]);
};

export default useSwipe;
