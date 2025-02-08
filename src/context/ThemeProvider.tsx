import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const rootElement = document.documentElement;  // This is the <html> element
    const bodyElement = document.body;  // This is the <body> element

    // Apply or remove the dark class based on the theme
    if (theme === "dark") {
      rootElement.classList.add("dark");
      bodyElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
      bodyElement.classList.remove("dark");
    }

    // Save the theme to localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
