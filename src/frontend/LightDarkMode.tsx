// LightDarkMode.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with an undefined default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false); // State for dark mode

  // Function to toggle dark mode manually
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
      return newMode;
    });
  };

  // Detect system's dark/light mode on mount
  useEffect(() => {
    // Check for saved user preference in localStorage
    const savedPreference = localStorage.getItem("darkMode");

    if (savedPreference === "enabled") {
      setDarkMode(true); // If user prefers dark mode
    } else if (savedPreference === "disabled") {
      setDarkMode(false); // If user prefers light mode
    } else {
      // If no preference is saved, check the system's theme
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemPrefersDark); // Apply system preference
    }

    // Listen for system theme changes
    const systemThemeListener = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches); // Update darkMode if the system theme changes
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", systemThemeListener);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", systemThemeListener);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  // Check if context is undefined and throw an error if it is
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // Return the context value
};