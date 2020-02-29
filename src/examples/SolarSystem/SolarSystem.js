import React, { useEffect, useRef } from 'react';
import { getPlanet, getStars, getLight } from './SolarSystem.helper';
import useThree from '../../hooks/useThree';
import { CAMERA_POSITION, PLANET_MAP } from './SolarSystem.constants';

function SolarSystem() {
  const t = useRef(0.001);
  const planetsRef = useRef([]);
  const { domRef, scene, camera, renderer } = useThree();

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
    camera.current.position.x = CAMERA_POSITION.X;
    camera.current.position.y = CAMERA_POSITION.Y;
    camera.current.position.z = CAMERA_POSITION.Z;
    camera.current.lookAt(0, 0, 0);
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
      }
    });

    renderer.current.render(scene.current, camera.current);
  }

  return <div ref={domRef} />;
}

export default SolarSystem;
