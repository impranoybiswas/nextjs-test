"use client";

import { useState } from "react";
import { useTheme, themes } from "@/contexts/theme-context";

export function ThemeModal() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-muted transition"
      >
        🎨 Theme
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background rounded-xl border border-border p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-medium mb-1">Choose theme</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Select a color palette
            </p>

            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => {
                const isActive = theme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => {
                      setTheme(t.key);
                      setOpen(false);
                    }}
                    className={`flex flex-col gap-2 p-3 rounded-lg border transition text-left ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {/* Color swatches */}
                    <div className="flex gap-1">
                      {t.colors.map((color : any) => (
                        <span
                          key={color}
                          className="w-5 h-5 rounded-full border border-black/10"
                          style={{ background: color }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t.name}</span>
                      {isActive && (
                        <span className="text-xs text-primary">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full py-2 rounded-lg border border-border text-sm hover:bg-muted transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}