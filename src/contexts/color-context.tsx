"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export const themes = [
  {
    name: "Default",
    key: "default",
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.922 0 0)",
    colors: ["#000000", "#6b7280"],
  },
  {
    name: "Ocean",
    key: "ocean",
    light: "oklch(0.55 0.2 250)",
    dark: "oklch(0.70 0.2 250)",
    colors: ["#3b82f6", "#0ea5e9"],
  },
  {
    name: "Forest",
    key: "forest",
    light: "oklch(0.55 0.2 145)",
    dark: "oklch(0.70 0.2 145)",
    colors: ["#22c55e", "#16a34a"],
  },
  {
    name: "Rose",
    key: "rose",
    light: "oklch(0.55 0.2 10)",
    dark: "oklch(0.70 0.2 10)",
    colors: ["#f43f5e", "#e11d48"],
  },
  {
    name: "Purple",
    key: "purple",
    light: "oklch(0.55 0.2 300)",
    dark: "oklch(0.70 0.2 300)",
    colors: ["#a855f7", "#9333ea"],
  },
  {
    name: "Amber",
    key: "amber",
    light: "oklch(0.55 0.2 80)",
    dark: "oklch(0.70 0.2 80)",
    colors: ["#f59e0b", "#d97706"],
  },
] as const;

export type ThemeKey = (typeof themes)[number]["key"];

interface ColorContextType {
  theme: ThemeKey;
  setTheme: (key: ThemeKey) => void;
}

const ColorContext = createContext<ColorContextType>({
  theme: "default",
  setTheme: () => {},
});

function getInitialTheme(): ThemeKey {
  if (typeof window === "undefined") return "default";
  return (localStorage.getItem("app-color-theme") as ThemeKey) ?? "default";
}

// ✅ DOM update আলাদা pure function — setState নেই
function applyColorToDOM(key: ThemeKey, isDark: boolean) {
  const found = themes.find((t) => t.key === key);
  if (!found) return;

  document.documentElement.style.setProperty(
    "--primary",
    isDark ? found.dark : found.light
  );
  document.documentElement.style.setProperty(
    "--primary-foreground",
    isDark ? "oklch(0.145 0 0)" : "oklch(0.985 0 0)"
  );
}

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(getInitialTheme);
  const { resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  // ✅ শুধু DOM sync — setState নেই
  useEffect(() => {
    applyColorToDOM(theme, isDark);
  }, [theme, isDark]);

  // ✅ setState নেই, শুধু localStorage + DOM
  const setTheme = (key: ThemeKey) => {
    localStorage.setItem("app-color-theme", key);
    setThemeState(key); // effect এর বাইরে — ঠিক আছে
  };

  return (
    <ColorContext.Provider value={{ theme, setTheme }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColorTheme = () => useContext(ColorContext);