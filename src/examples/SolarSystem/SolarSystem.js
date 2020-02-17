import React, { useEffect, useRef } from 'react';
import { GridHelper } from 'three';
import { getPlanet, getStars, getLight } from './SolarSystem.helper';
import useThree from '../../hooks/useThree';
import { CAMERA_POSITION, PLANET_MAP } from './SolarSystem.constants';

function SolarSystem() {
  const t = useRef(0.001);
  const planetsRef = useRef([]);
  const { domRef, scene, camera, renderer } = useThree();

  useEffect(() => {
    planetsRef.current = Object.values(PLANET_MAP).map(
      ({ key, radius, xPosition, surface }) =>
        getPlanet({
          position: { x: xPosition, y: 0, z: 0 },
          radius,
          surface,
          key,
        })
    );
    camera.current.position.z = CAMERA_POSITION;
    camera.current.fov = 75;
    camera.current.updateProjectionMatrix();

    planetsRef.current.forEach((planet) => {
      scene.current.add(planet);
    });

    scene.current.add(getStars());
    scene.current.add(getLight());
    scene.current.add(getLight(-2, -3));

    scene.current.add(new GridHelper(40, 40));
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animate() {
    requestAnimationFrame(animate);
    t.current += 0.0001;
    planetsRef.current.forEach((planet) => {
      const { rotation, getPosition } = PLANET_MAP[planet.__key];
      planet.rotation.x += rotation.x;
      planet.rotation.y += rotation.y;
      if (getPosition) {
        const position = getPosition(t.current);
        planet.position.x = position.x;
        planet.position.z = position.z;
      }
    });

    renderer.current.render(scene.current, camera.current);
  }

  return <div ref={domRef} />;
}

export default SolarSystem;
