import "./PigTracker.scss";

import React, { useRef, useEffect, useState } from "react";
import { Mesh, SphereGeometry, MeshNormalMaterial, Vector3 } from "three";
import useThree from "../../hooks/useThree";
import useMouseVector from "../../hooks/useMouseVector";
import { createPig, PIG_SIZE, getRandomPosition } from "./PigTracker.helper";
import CustomControlPanel from "../../components/CustomControlPanel";
import { Math as ThreeMath } from "three";
import DefaultInputRange from "../../components/DefaultInputRange";

function PigTracker() {
  const { domRef, scene, camera, renderer } = useThree();
  const pigs = useRef([]);
  const mousePosition = useMouseVector(camera);
  const cursor = useRef();
  const [xVolume, setXVolume, xVolumeRef] = useVolume(25);
  const [yVolume, setYVolume, yVolumeRef] = useVolume(25);

  useEffect(() => {
    const pigsToAdd = [...Array(100).keys()].map((a, i) => {
      const pig = createPig(PIG_SIZE.MEDIUM);
      const { x, y, z } = getRandomPosition();

      pig.position.x = x;
      pig.position.y = y;
      pig.position.z = z;
      pig.isLeft = false;
      scene.current.add(pig);
      return pig;
    });
    pigs.current = pigsToAdd;

    cursor.current = new Mesh(
      new SphereGeometry(10, 10, 10),
      new MeshNormalMaterial()
    );
    cursor.current.position.copy(mousePosition.current);
    scene.current.add(cursor.current);
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getX() {
    const fov = ThreeMath.degToRad(camera.current.fov);
    const height = 2 * Math.tan(fov / 2) * 500;
    const width = camera.current.aspect * height;
    return width;
  }

  function animate() {
    requestAnimationFrame(animate);
    if (cursor.current) {
      cursor.current.position.copy(mousePosition.current);
    }
    movePigs();
    lookAll();
    renderer.current.render(scene.current, camera.current);
  }

  function movePigs() {
    const x = getX() / 2;
    pigs.current.forEach(pig => {
      if (pig.isLeft && pig.position.x < -x) {
        pig.isLeft = false;
      }
      if (!pig.isLeft && pig.position.x > x) {
        pig.isLeft = true;
      }
      pig.position.x =
        pig.position.x +
        (pig.isLeft ? -xVolumeRef.current : xVolumeRef.current) / 100;
      pig.position.y =
        yVolumeRef.current * Math.sin((Math.PI / 80) * pig.position.x);
    });
  }

  function lookAll() {
    if (pigs.current) {
      pigs.current.forEach(pig => {
        const { x, y, z } = cursor.current.position;
        pig.lookAt(new Vector3(x, y, z));
      });
    }
  }

  return (
    <>
      <CustomControlPanel className="pig-tracker-control-panel">
        <CustomControlPanel.Row label="x">
          <DefaultInputRange value={xVolume} onChange={setXVolume} />
        </CustomControlPanel.Row>
        <CustomControlPanel.Row label="y">
          <DefaultInputRange value={yVolume} onChange={setYVolume} />
        </CustomControlPanel.Row>
      </CustomControlPanel>
      <div className="pig-canvas-wrapper" ref={domRef} />
    </>
  );
}

//TODO: it is a workaround due to avoid reanimate on every volume change. Need a better way
function useVolume(defaultValue) {
  const [volume, setVolume] = useState(defaultValue);
  const volumeRef = useRef(defaultValue);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  return [volume, setVolume, volumeRef];
}

export default PigTracker;
