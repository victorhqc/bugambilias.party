import React, { useEffect, useState, useRef } from 'react';

const isInScreen = (WrappedComponent) => (props) => {
  const [isInScreen, setIsInScreen] = useState(false);
  const elementRef = useRef(null);

  const checkIfInScreen = isElementRefInScreen(elementRef, setIsInScreen);

  useEffect(() => {
    if (!elementRef.current) return;
    checkIfInScreen();

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkIfInScreen();
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [elementRef.current]);

  return (
    <div ref={elementRef}>
      <WrappedComponent isInScreen={isInScreen} {...props} />
    </div>
  );
};

function isElementRefInScreen(elementRef, setIsInScreen) {
  return () => {
    const rect = elementRef.current.getBoundingClientRect();

    if (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      setIsInScreen(true);
    } else {
      setIsInScreen(false);
    }
  };
}

export default isInScreen;
