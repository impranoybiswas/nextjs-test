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

// localStorage থেকে initial value নাও
function getInitialFont(): FontValue {
  if (typeof window === "undefined") return fonts[0].value;
  return (localStorage.getItem("app-font") as FontValue) ?? fonts[0].value;
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = useState<FontValue>(getInitialFont); // ✅ initializer function

  const setFont = (newFont: FontValue) => {
    setFontState(newFont);
    localStorage.setItem("app-font", newFont);
    document.body.style.fontFamily = newFont;
  };

  // শুধু DOM sync করার জন্য এই একটা effect
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