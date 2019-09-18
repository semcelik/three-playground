import { useRef, useEffect } from "react";
import { Vector3 } from "three";

function useMouseVector(camera) {
  const positionVector = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMouseMove({ clientX, clientY }) {
    const { innerWidth, innerHeight } = window;

    const vector = new Vector3();
    vector.set(
      (clientX / innerWidth) * 2 - 1,
      -(clientY / innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera.current);
    const dir = vector.sub(camera.current.position).normalize();
    const distance = -camera.current.position.z / dir.z;
    positionVector.current = camera.current.position
      .clone()
      .add(dir.multiplyScalar(distance));
  }

  return positionVector;
}

export default useMouseVector;
