import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ExampleMenu({ onSelect }) {
  return (
    <ul className="list">
      {ROUTES.map(({ key, name, path }) => (
        <Link key={key} to={path} onClick={onSelect}>
          <li>{name}</li>
        </Link>
      ))}
    </ul>
  );
}

export default ExampleMenu;
