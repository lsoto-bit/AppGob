import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";

const FONT_SIZE_CLASS: Record<FontSize, string> = {
  small: "font-size-small",
  medium: "font-size-medium",
  large: "font-size-large",
};

interface FontSizeContextValue {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null);

function getStoredFontSize(): FontSize {
  const stored = localStorage.getItem("app-font-size");
  return stored === "small" || stored === "large" ? stored : "medium";
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(getStoredFontSize);

  function setFontSize(size: FontSize) {
    setFontSizeState(size);
    localStorage.setItem("app-font-size", size);
  }

  useEffect(() => {
    document.documentElement.classList.remove(
      "font-size-small",
      "font-size-medium",
      "font-size-large",
    );
    document.documentElement.classList.add(FONT_SIZE_CLASS[fontSize]);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize must be used within FontSizeProvider");
  return ctx;
}
