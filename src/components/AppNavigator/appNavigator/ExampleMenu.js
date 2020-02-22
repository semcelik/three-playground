import React from 'react';
import ROUTES from '../../../routes';
import { Link } from 'react-router-dom';

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
            <Link to={path} {...(closeAfterSelect && { onClick: onClose })}>
              <li key={key}>{name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExampleMenu;
