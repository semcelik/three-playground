import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ExampleMenu({ onClose, closeAfterSelect }) {
  return (
    <div>
      <div className="header">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="menu-content">
        <ul className="list menu-list">
          {ROUTES.map(({ key, name, path }) => (
            <Link
              key={key}
              to={path}
              {...(closeAfterSelect && { onClick: onClose })}
            >
              <li>{name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExampleMenu;
