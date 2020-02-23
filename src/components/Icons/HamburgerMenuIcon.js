import React from 'react';

function HamburgerMenuIcon({ width = 32, height = 32 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32">
      <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z" />
    </svg>
  );
}

export default HamburgerMenuIcon;
