import { useState, useEffect, useCallback } from "react";

export default function useDropdown(dropEl, actionEl) {
  dropEl = dropEl.current;
  actionEl = actionEl.current;

  const [drop, setDrop] = useState(false);

  const toggleDrop = useCallback(toggleState => {
    setDrop(toggleState !== undefined ? Boolean(toggleState) : !drop);
  }, [drop]);

  const onWindowClick = useCallback(ev => {
    const clickOnAction =
      actionEl && (ev.target === actionEl || actionEl.contains(ev.target));
    const clickOnDrop =
      dropEl && (ev.target === dropEl || dropEl.contains(ev.target));

    if (!clickOnAction && !clickOnDrop && drop === true) {
      toggleDrop(false);
    }
  }, [drop, actionEl, dropEl, toggleDrop]);

  const onEsc = useCallback(ev => {
    if (ev.keyCode === 27 && drop === true) {
      toggleDrop(false);
    }
  }, [drop, toggleDrop]);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  });

  useEffect(() => {
    window.addEventListener("keyup", onEsc);
    return () => window.removeEventListener("keyup", onEsc);
  });

  return [drop, toggleDrop];
}
