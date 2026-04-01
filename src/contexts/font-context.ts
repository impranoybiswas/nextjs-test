"use client";

import { createContext, useContext } from "react";

export const fonts = [
  { name: "Geist", value: "var(--font-sans)" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Mono", value: "monospace" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
] as const;

export type FontValue = (typeof fonts)[number]["value"];

export interface FontContextType {
  font: FontValue;
  setFont: (font: FontValue) => void;
}

export const FontContext = createContext<FontContextType>({
  font: fonts[0].value,
  setFont: () => {},
});

export const useFont = () => useContext(FontContext);