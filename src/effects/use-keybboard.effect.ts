import { useEffect, useCallback } from 'React';

/**
 * Use Keyboard Effect
 **/
export function useKeyboard(cb: Function) {
  const callback = useCallback(cb, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {

      // Don't let repeats through
      if (event.repeat === true) {
        return;
      }
      // Ignore meta/ctrl/alt keys
      if (!(event.metaKey || event.ctrlKey || event.altKey)) {
        callback(event);
      }
    }
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [callback]);
}