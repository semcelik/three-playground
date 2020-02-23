import React from 'react';
import { animated, useSpring } from 'react-spring';
import { HamburgerMenuIcon } from '../../Icons';

function MenuButton({ onClick }) {
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
      className="menu-icon-button"
      onClick={onClick}
      onMouseOver={handleOnHover}
      onTouchStart={handleOnHover}
      onMouseLeave={handleOnBlur}
      onTouchEnd={handleOnBlur}
      style={{ transform: interpolateTransform }}
    >
      <HamburgerMenuIcon width={24} height={24} />
    </animated.button>
  );
}

export default MenuButton;
