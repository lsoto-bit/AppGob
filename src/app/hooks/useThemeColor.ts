import { useEffect } from "react";

const META_NAME = "theme-color";

function getOrCreateThemeColorMeta(): HTMLMetaElement {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${META_NAME}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = META_NAME;
    document.head.appendChild(meta);
  }
  return meta;
}

export function useThemeColor(color: string) {
  useEffect(() => {
    const meta = getOrCreateThemeColorMeta();
    const previous = meta.content;
    meta.content = color;
    return () => {
      meta.content = previous;
    };
  }, [color]);
}
