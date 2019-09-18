import React, { useRef, useEffect } from "react";
import { Mesh, SphereGeometry, MeshNormalMaterial, Vector3 } from "three";
import useThree from "../../hooks/useThree";
import useMouseVector from "../../hooks/useMouseVector";
import { createPig, PIG_SIZE, getRandomPosition } from "../../helper";

function PigTracker() {
  const { domRef, scene, camera, renderer } = useThree();
  const pigs = useRef([]);
  const mousePosition = useMouseVector(camera);
  const cursor = useRef();

  useEffect(() => {
    const pigsToAdd = [...Array(100).keys()].map((a, i) => {
      const pig = createPig(PIG_SIZE.MEDIUM);
      const { x, y, z } = getRandomPosition();

      pig.position.x = x;
      pig.position.y = y;
      pig.position.z = z;
      scene.current.add(pig);
      return pig;
    });
    pigs.current = pigsToAdd;

    cursor.current = new Mesh(
      new SphereGeometry(10, 10, 10),
      new MeshNormalMaterial()
    );
    scene.current.add(cursor.current);
    animate();
    window.addEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animate() {
    requestAnimationFrame(animate);
    if (cursor.current) {
      cursor.current.position.copy(mousePosition.current);
    }

    renderer.current.render(scene.current, camera.current);
  }

  function handleMouseMove() {
    if (pigs.current) {
      pigs.current.forEach(pig => {
        const { x, y, z } = cursor.current.position;
        pig.lookAt(new Vector3(x, y, z));
      });
    }
  }

  return <div ref={domRef} />;
}

export default PigTracker;
