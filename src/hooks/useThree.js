import { useRef, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three';
import OrbitControls from 'three-orbitcontrols';

function useThree() {
  const domRef = useRef();
  const scene = useRef();
  const camera = useRef();
  const renderer = useRef();

  useEffect(() => {
    scene.current = new Scene();

    camera.current = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 500;
    camera.current.position.y = 2;

    renderer.current = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setClearColor(0x000000, 0);
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    domRef.current.appendChild(renderer.current.domElement);

    const controls = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.target = new Vector3(0, 0, 0);

    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  function onWindowResize() {
    camera.current.aspect = window.innerWidth / window.innerHeight;
    camera.current.updateProjectionMatrix();

    renderer.current.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    domRef,
    scene,
    camera,
    renderer,
  };
}

export default useThree;
