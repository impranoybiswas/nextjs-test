"use client";

import { createContext, useContext } from "react";

export const colors = [
  {
    name: "Default",
    key: "default",
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.922 0 0)",
    palette: ["#000000", "#6b7280"],
  },
  {
    name: "Ocean",
    key: "ocean",
    light: "oklch(0.55 0.2 250)",
    dark: "oklch(0.70 0.2 250)",
    palette: ["#3b82f6", "#0ea5e9"],
  },
  {
    name: "Forest",
    key: "forest",
    light: "oklch(0.55 0.2 145)",
    dark: "oklch(0.70 0.2 145)",
    palette: ["#22c55e", "#16a34a"],
  },
  {
    name: "Rose",
    key: "rose",
    light: "oklch(0.55 0.2 10)",
    dark: "oklch(0.70 0.2 10)",
    palette: ["#f43f5e", "#e11d48"],
  },
  {
    name: "Purple",
    key: "purple",
    light: "oklch(0.55 0.2 300)",
    dark: "oklch(0.70 0.2 300)",
    palette: ["#a855f7", "#9333ea"],
  },
  {
    name: "Amber",
    key: "amber",
    light: "oklch(0.55 0.2 80)",
    dark: "oklch(0.70 0.2 80)",
    palette: ["#f59e0b", "#d97706"],
  },
] as const;

export type ColorKey = (typeof colors)[number]["key"];

interface ColorContextType {
  colorName: ColorKey;
  setColorName: (key: ColorKey) => void;
}

export const ColorContext = createContext<ColorContextType>({
  colorName: "default",
  setColorName: () => {},
});

export const useColor = () => useContext(ColorContext);