import {
  BackSide,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';
import stars from '../../assets/stars.jpeg';
import marsSurfaceDark from '../../assets/mars_surface_dark.jpg';
import { CAMERA_POSITION } from './SolarSystem.constants';

function getPlanet({
  radius,
  position = { x: 0, y: 0, z: 0 },
  surface,
  key,
} = {}) {
  const geometry = new SphereGeometry(radius, 32, 32);
  const material = new MeshPhongMaterial();
  setTextures(material, surface);

  const mesh = new Mesh(geometry, material);
  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;
  mesh.__key = key;

  return mesh;
}

function getStars() {
  const geometry = new SphereGeometry(CAMERA_POSITION, 50, 50);
  const material = new MeshBasicMaterial();
  material.map = new TextureLoader().load(stars);
  material.side = BackSide;

  return new Mesh(geometry, material);
}

function setTextures(material, surface) {
  material.map = new TextureLoader().load(surface);
  material.bumpMap = new TextureLoader().load(marsSurfaceDark);
  material.bumpScale = 0.15;
}

function getLight(x = 2, y = 3) {
  const light = new DirectionalLight(0xcccccc, 1);
  light.position.set(x, y, 2);
  return light;
}

export { getPlanet, getStars, getLight };
