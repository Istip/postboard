import { useState, useEffect, RefObject } from "react";

// Define the types for the callback functions
type SwipeCallback = () => void;

const useSwipe = (
  elementRef: RefObject<HTMLElement>,
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

    const element = elementRef.current;

    if (element) {
      // Adding touch event listeners to the specific element
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchmove", handleTouchMove);
      element.addEventListener("touchend", handleTouchEnd);

      // Cleanup function to remove event listeners
      return () => {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [elementRef, touchStart, touchEnd, onSwipeUp, onSwipeDown, threshold]);
};

export default useSwipe;
