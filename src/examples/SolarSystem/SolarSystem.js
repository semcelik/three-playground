import './SolarSystem.scss';

import React, { useEffect, useRef } from 'react';
import { getPlanet, getStars, getLight } from './SolarSystem.helper';
import useThree from '../../hooks/useThree';
import { CAMERA_POSITION, PLANET_MAP } from './SolarSystem.constants';
import PlanetSelect from './solarSystem/PlanetSelect';
import useQuery from '../../hooks/useQuery';

function SolarSystem() {
  const t = useRef(0.001);
  const planetsRef = useRef([]);
  const { domRef, scene, camera, renderer } = useThree();
  const query = useQuery();
  const selectedPlanetRef = useRef('');
  selectedPlanetRef.current = query.get('planet');

  useEffect(() => {
    if (!selectedPlanetRef.current) {
      initCameraPosition();
    }
  }, [selectedPlanetRef.current]);

  useEffect(() => {
    planetsRef.current = Object.values(PLANET_MAP).map(
      ({ key, radius, xPosition, surface, hasStar, shine }) =>
        getPlanet({
          position: { x: xPosition, y: 0, z: 0 },
          radius,
          surface,
          key,
          hasStar,
          shine,
        })
    );
    camera.current.fov = 75;
    camera.current.updateProjectionMatrix();

    planetsRef.current.forEach((planet) => {
      scene.current.add(planet);
    });

    scene.current.add(getStars());
    scene.current.add(getLight());
    scene.current.add(getLight(-2, -3));

    //scene.current.add(new GridHelper(400, 40));
    animate();
  }, []);

  function initCameraPosition() {
    camera.current.position.x = CAMERA_POSITION.X;
    camera.current.position.y = CAMERA_POSITION.Y;
    camera.current.position.z = CAMERA_POSITION.Z;
    camera.current.lookAt(0, 0, 0);
  }

  function animate() {
    requestAnimationFrame(animate);
    t.current += 0.00003;
    planetsRef.current.forEach((planet) => {
      const { rotation, getPosition } = PLANET_MAP[planet.__key];
      planet.rotation.x += rotation.x;
      planet.rotation.y += rotation.y;
      if (getPosition) {
        const position = getPosition(t.current);
        planet.position.x = position.x;
        planet.position.z = position.z;
        const selectedPlanet =
          selectedPlanetRef.current && selectedPlanetRef.current.toUpperCase();
        if (planet.__key === selectedPlanet) {
          camera.current.position.x = planet.position.x;
          camera.current.position.z = planet.position.z;
          camera.current.position.y = 0;
          camera.current.lookAt(0, 0, 0);
        }
      }
    });

    renderer.current.render(scene.current, camera.current);
  }

  return (
    <>
      <PlanetSelect />
      <div ref={domRef} />
    </>
  );
}

export default SolarSystem;
