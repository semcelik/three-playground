import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { CameraIcon } from '../../../components/Icons';
import { PLANET_MAP } from '../SolarSystem.constants';
import ModalButton from '../../../components/ModalButton';

function PlanetSelect() {
  let { url } = useRouteMatch();
  return (
    <ModalButton
      className="camera-button"
      icon={CameraIcon}
      content={(modal) => (
        <ul className="planet-list">
          {Object.values(PLANET_MAP).map(({ name, key }) => {
            return (
              <Link
                key={key}
                to={`${url}?planet=${key.toLowerCase()}`}
                onClick={() => modal.hide()}
              >
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
      )}
    />
  );
}

export default PlanetSelect;
