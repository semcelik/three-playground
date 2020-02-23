import './AppNavigator.scss';

import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import ExampleMenu from './appNavigator/ExampleMenu';
import { CLOSED, OPEN } from './AppNavigator.constants';
import MenuButton from './appNavigator/MenuButton';

function AppNavigator() {
  const [isOpen, setIsOpen] = useState(false);

  const { animationValue } = useSpring({
    animationValue: isOpen ? 1 : 0,
    config: { tension: 180, friction: 20 },
  });

  function handleToggleMenu() {
    setIsOpen((prevIsOpened) => !prevIsOpened);
  }

  const interpolateSize = animationValue.interpolate({
    range: [0, 1],
    output: [CLOSED.WIDTH, OPEN.WIDTH],
  });

  const interpolatePosition = animationValue
    .interpolate({
      range: [0, 1],
      output: [CLOSED.POSITION_PERCENTAGE, OPEN.POSITION_PERCENTAGE],
    })
    .interpolate((a) => `${a}%`);

  const interpolateRadius = animationValue
    .interpolate({
      range: [0, 1],
      output: [50, 0],
    })
    .interpolate((a) => `${a}%`);

  return (
    <>
      {!isOpen && <MenuButton onClick={handleToggleMenu} />}
      <animated.div
        className="app-navigator"
        style={{
          display: animationValue.interpolate((a) =>
            a === 0 ? 'none' : 'block'
          ),
          opacity: animationValue,
          width: interpolateSize,
          height: interpolateSize,
          top: interpolatePosition,
          left: interpolatePosition,
          marginLeft: interpolateSize.interpolate((s) => `-${s / 2}px`),
          marginTop: interpolateSize.interpolate((s) => `-${s / 2}px`),
          borderRadius: interpolateRadius,
        }}
      >
        <ExampleMenu closeAfterSelect onClose={handleToggleMenu} />
      </animated.div>
    </>
  );
}

export default AppNavigator;
