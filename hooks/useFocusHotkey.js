import { useEffect } from "react";

const useFocusHotkey = (
  searchInputRef,
  codeHotkey = "KeyS",
  keyCodeHotkeys = [115, 83]
) => {
  useEffect(() => {
    if (window && searchInputRef.current) {
      const eventHandler = (e) => {
        const focusInput = () => {
          if (window.document.activeElement !== searchInputRef.current) {
            e.preventDefault();
            searchInputRef.current.focus();
          }
        };

        if (e.code === codeHotkey) {
          focusInput();
        } else if (keyCodeHotkeys.includes(e.keyCode)) {
          focusInput();
        }
      };
      window.document.addEventListener("keydown", eventHandler);

      return () => {
        window.document.removeEventListener("keydown", eventHandler);
      };
    }
  }, [searchInputRef]);
};

export default useFocusHotkey;
