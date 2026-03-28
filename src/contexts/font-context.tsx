"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const fonts = [
  { name: "Geist", value: "var(--font-sans)" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Mono", value: "monospace" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
] as const;

export type FontValue = (typeof fonts)[number]["value"];

interface FontContextType {
  font: FontValue;
  setFont: (font: FontValue) => void;
}

const FontContext = createContext<FontContextType>({
  font: fonts[0].value,
  setFont: () => {},
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = useState<FontValue>(fonts[0].value);

  useEffect(() => {
    const saved = localStorage.getItem("app-font") as FontValue | null;
    if (saved) setFontState(saved);
  }, []);

  const setFont = (newFont: FontValue) => {
    setFontState(newFont);
    localStorage.setItem("app-font", newFont);
    document.body.style.fontFamily = newFont;
  };

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFont = () => useContext(FontContext);