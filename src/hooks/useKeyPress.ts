import { useEffect } from "react";

export const useKeyPress = (key: string, callback?: () => void) => {
  useEffect(() => {
    const performCallback = (event: KeyboardEvent) => {
      if (key.toLowerCase() === event.key?.toLowerCase()) callback?.();
    };

    window.addEventListener("keydown", performCallback);

    return () => {
      window.removeEventListener("keydown", performCallback);
    };
  });
};
