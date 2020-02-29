import {
  BackSide,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
  Group,
  RingBufferGeometry,
  DoubleSide,
  Vector3,
} from 'three';
import stars from '../../assets/stars.jpeg';
import marsSurfaceDark from '../../assets/mars_surface_dark.jpg';
import { CAMERA_POSITION } from './SolarSystem.constants';
import saturn_surface from '../../assets/saturn_rings.jpg';

const RING_BUFFER = 4;
const MULTIPLIER_FOR_RING = 2.5;

function getPlanet({
  radius,
  surface,
  key,
  hasStar = false,
  shine = false,
} = {}) {
  const geometry = new SphereGeometry(radius, 32, 32);
  const SelectedMaterial = shine ? MeshBasicMaterial : MeshPhongMaterial;
  const material = new SelectedMaterial();
  setTextures(material, surface);

  const mesh = new Mesh(geometry, material);

  if (!hasStar) {
    mesh.__key = key;
    return mesh;
  }

  const group = new Group();

  const ringMesh1 = getRing(radius + RING_BUFFER, radius * MULTIPLIER_FOR_RING);
  group.add(mesh);
  group.add(ringMesh1);
  group.__key = key;
  return group;
}

function getRing(innerRadius, outerRadius) {
  const texture = new TextureLoader().load(saturn_surface);

  const ringGeo = new RingBufferGeometry(innerRadius, outerRadius, 64);

  const ringGeoPosition = ringGeo.attributes.position;

  const v3 = new Vector3();
  for (let i = 0; i < ringGeoPosition.count; i++) {
    v3.fromBufferAttribute(ringGeoPosition, i);
    ringGeo.attributes.uv.setXY(
      i,
      v3.length() < (outerRadius + innerRadius) / 2 ? 0 : 1,
      0
    );
  }

  const ringMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    side: DoubleSide,
    map: texture,
  });

  const ringMesh = new Mesh(ringGeo, ringMaterial);
  ringMesh.rotateX(30);
  return ringMesh;
}

function getStars() {
  const geometry = new SphereGeometry(CAMERA_POSITION.Z * 2, 50, 50);
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
