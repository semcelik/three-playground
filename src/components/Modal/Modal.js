import './Modal.scss';

import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import Content from './modal/Content';
import { CLOSED, OPEN } from './Modal.constants';

function Modal({ children, openFromMiddle }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonPosition = useRef({
    x: CLOSED.POSITION_PERCENTAGE,
    y: CLOSED.POSITION_PERCENTAGE,
  });

  useEffect(() => {
    ref.current.show = showModal;
    ref.current.hide = hideModal;
    ref.current.visible = isOpen;
  }, [isOpen]);

  const { animationValue } = useSpring({
    animationValue: isOpen ? 1 : 0,
    config: { tension: 180, friction: 20 },
  });

  function showModal(xPercentage, yPercentage) {
    buttonPosition.current = { x: xPercentage, y: yPercentage };
    setIsOpen(true);
  }

  function hideModal() {
    setIsOpen(false);
  }

  function getInterpolatedPosition(from) {
    return animationValue
      .interpolate({
        range: [0, 1],
        output: [
          openFromMiddle ? OPEN.POSITION_PERCENTAGE : from,
          OPEN.POSITION_PERCENTAGE,
        ],
      })
      .interpolate((a) => `${a}%`);
  }

  const interpolateSize = animationValue.interpolate({
    range: [0, 1],
    output: [CLOSED.WIDTH, OPEN.WIDTH],
  });

  const interpolateRadius = animationValue
    .interpolate({
      range: [0, 1],
      output: [50, 0],
    })
    .interpolate((a) => `${a}%`);

  return (
    <div
      className="modal-mask"
      style={{ display: isOpen ? 'block' : 'none' }}
      onClick={() => hideModal()}
    >
      <animated.div
        className="modal"
        style={{
          display: animationValue.interpolate((a) =>
            a === 0 ? 'none' : 'block'
          ),
          opacity: animationValue,
          width: interpolateSize,
          minHeight: interpolateSize,
          top: getInterpolatedPosition(buttonPosition.current.y),
          left: getInterpolatedPosition(buttonPosition.current.x),
          marginLeft: interpolateSize.interpolate((s) => `-${s / 2}px`),
          marginTop: interpolateSize.interpolate((s) => `-${s / 2}px`),
          borderRadius: interpolateRadius,
        }}
      >
        <Content closeAfterSelect onClose={hideModal}>
          {children}
        </Content>
      </animated.div>
    </div>
  );
}

export default forwardRef(Modal);
