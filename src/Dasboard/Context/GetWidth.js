import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the window width
const WindowWidthContext = createContext();

// Custom hook to use the window width value
export const useWindowWidth = () => useContext(WindowWidthContext);

// Provider component to wrap your application and provide the window width
export const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};
