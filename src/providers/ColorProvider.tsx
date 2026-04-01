"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { ColorContext, ColorKey, colors } from "@/contexts/color-context";

function getInitialColor(): ColorKey {
  if (typeof window === "undefined") return "default";
  return (localStorage.getItem("app-color-name") as ColorKey) ?? "default";
}

// Pure DOM updater
function applyColorToDOM(key: ColorKey, isDark: boolean) {
  const found = colors.find((c) => c.key === key);
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
  const [colorName, setColorState] = useState<ColorKey>(getInitialColor);
  const { resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    applyColorToDOM(colorName, isDark);
  }, [colorName, isDark]);

  const setColorName = (key: ColorKey) => {
    localStorage.setItem("app-color-name", key);
    setColorState(key);
  };

  return (
    <ColorContext.Provider value={{ colorName, setColorName }}>
      {children}
    </ColorContext.Provider>
  );
}