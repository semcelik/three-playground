import React from 'react';

function Content({ onClose, children }) {
  return (
    <div>
      <div className="header">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="menu-content">{children}</div>
    </div>
  );
}

export default Content;
