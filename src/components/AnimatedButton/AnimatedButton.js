import './AnimatedButton.scss';

import React from 'react';
import { animated, useSpring } from 'react-spring';

function AnimatedButton({ className, children, onClick }) {
  const [{ transformSR }, set] = useSpring(() => ({
    transformSR: [1, 0],
    config: { tension: 180, friction: 20 },
  }));

  function handleOnHover() {
    set({ transformSR: [1.2, 180] });
  }

  function handleOnBlur() {
    set({ transformSR: [1, 0] });
  }

  const interpolateTransform = transformSR.interpolate(
    (s, r) => `scale(${s}) rotate(${r}deg)`
  );

  return (
    <animated.button
      className={`animated-button ${className}`}
      onClick={onClick}
      onMouseOver={handleOnHover}
      onTouchStart={handleOnHover}
      onMouseLeave={handleOnBlur}
      onTouchEnd={handleOnBlur}
      style={{ transform: interpolateTransform }}
    >
      {children}
    </animated.button>
  );
}

export default AnimatedButton;
