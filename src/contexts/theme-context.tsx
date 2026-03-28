"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const themes = [
  {
    name: "Default",
    key: "default",
    primary: "oklch(0.205 0 0)",
    colors: ["#000000", "#ffffff"],
  },
  {
    name: "Ocean",
    key: "ocean",
    primary: "oklch(0.55 0.2 250)",
    colors: ["#3b82f6", "#0ea5e9"],
  },
  {
    name: "Forest",
    key: "forest",
    primary: "oklch(0.55 0.2 145)",
    colors: ["#22c55e", "#16a34a"],
  },
  {
    name: "Rose",
    key: "rose",
    primary: "oklch(0.55 0.2 10)",
    colors: ["#f43f5e", "#e11d48"],
  },
  {
    name: "Purple",
    key: "purple",
    primary: "oklch(0.55 0.2 300)",
    colors: ["#a855f7", "#9333ea"],
  },
  {
    name: "Amber",
    key: "amber",
    primary: "oklch(0.55 0.2 80)",
    colors: ["#f59e0b", "#d97706"],
  },
] as const;

export type ThemeKey = (typeof themes)[number]["key"];

interface ThemeContextType {
  theme: ThemeKey;
  setTheme: (key: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("default");

  useEffect(() => {
    const saved = localStorage.getItem("app-theme") as ThemeKey | null;
    if (saved) applyTheme(saved);
  }, []);

  const applyTheme = (key: ThemeKey) => {
    const found = themes.find((t) => t.key === key);
    if (!found) return;
    document.documentElement.style.setProperty("--primary", found.primary);
    // primary-foreground সাদা রাখো
    document.documentElement.style.setProperty(
      "--primary-foreground",
      "oklch(0.985 0 0)"
    );
    setThemeState(key);
    localStorage.setItem("app-theme", key);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);