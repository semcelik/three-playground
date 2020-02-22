import './AppNavigator.scss';

import React, { useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import ExampleMenu from './appNavigator/ExampleMenu';
import { CLOSED, OPEN } from './AppNavigator.constants';

function AppNavigator() {
  const [isOpened, setIsOpened] = useState(false);

  const { width, height, top, left } = useSpring({
    ...(isOpened ? OPEN : CLOSED),
    config: config.wobbly,
  });

  function handleToggleMenu() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  return (
    <animated.div
      className="app-navigator"
      style={{
        width,
        height,
        top: top.interpolate((t) => `${t}%`),
        left: left.interpolate((l) => `${l}%`),
        marginLeft: width.interpolate((w) => `-${w / 2}px`),
        marginTop: height.interpolate((h) => `-${h / 2}px`),
      }}
      {...(!isOpened && { onClick: handleToggleMenu })}
    >
      {isOpened ? (
        <ExampleMenu closeAfterSelect onClose={handleToggleMenu} />
      ) : null}
    </animated.div>
  );
}

export default AppNavigator;
