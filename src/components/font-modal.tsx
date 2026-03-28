"use client";

import { useState } from "react";
import { useFont, fonts } from "@/contexts/font-context";

export function FontModal() {
  const [open, setOpen] = useState(false);
  const { font, setFont } = useFont();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-muted transition"
      >
        🎨 Font
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background rounded-xl border border-border p-6 w-80 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-medium mb-4">Choose Font</h2>

            <div className="flex flex-col gap-2">
              {fonts.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setFont(f.value);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition text-sm ${
                    font === f.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span style={{ fontFamily: f.value }}>{f.name}</span>
                  {font === f.value && (
                    <span className="text-xs text-primary">✓</span>
                  )}
                </button>
              ))}
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
