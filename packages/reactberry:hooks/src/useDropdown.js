const {useState, useEffect, useCallback} = require('react');

function useDropdown(dropElRef, actionElRef) {
  const [drop, setDrop] = useState(false);

  const toggleDrop = useCallback(toggleState => {
    setDrop(currentDrop =>
      toggleState !== undefined ? Boolean(toggleState) : !currentDrop
    );
  }, []);

  const onWindowClick = useCallback(
    event => {
      const dropEl = dropElRef && dropElRef.current;
      const actionEl = actionElRef && actionElRef.current;
      const clickOnAction =
        actionEl && (event.target === actionEl || actionEl.contains(event.target));
      const clickOnDrop =
        dropEl && (event.target === dropEl || dropEl.contains(event.target));

      if (!clickOnAction && !clickOnDrop && drop === true) {
        toggleDrop(false);
      }
    },
    [actionElRef, dropElRef, drop, toggleDrop]
  );

  const onEsc = useCallback(
    event => {
      if (event.keyCode === 27 && drop === true) {
        toggleDrop(false);
      }
    },
    [drop, toggleDrop]
  );

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, [onWindowClick]);

  useEffect(() => {
    window.addEventListener('keyup', onEsc);
    return () => window.removeEventListener('keyup', onEsc);
  }, [onEsc]);

  return [drop, toggleDrop];
}

module.exports = useDropdown;