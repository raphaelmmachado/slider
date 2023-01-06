import { useState, useEffect } from "react";

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    // height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize(() => {
        if (window.innerWidth < 450) {
          return { width: 1 };
        }
        if (window.innerWidth < 768) {
          return { width: 2 };
        }
        if (window.innerWidth < 1024) {
          return { width: 3 };
        }
        if (window.innerWidth < 1440) {
          return { width: 4 };
        }
        if (window.innerWidth > 1440) {
          return { width: 5 };
        }
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
