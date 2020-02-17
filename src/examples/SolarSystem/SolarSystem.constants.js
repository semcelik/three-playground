import earth_surface from '../../assets/earth_surface.jpeg';
import sun_surface from '../../assets/sun_surface.jpeg';
import mars_surface from '../../assets/mars_surface.jpg';
import mercury_surface from '../../assets/mercury_surface.jpg';
import venus_surface from '../../assets/venus_surface.jpg';
import jupiter_surface from '../../assets/jupiter_surface.jpg';
import saturn_surface from '../../assets/saturn_surface.jpg';

function generateGetPosition(position, multiplier = position) {
  return (t) => ({
    x: position * Math.sin(t * multiplier),
    z: position * Math.cos(t * multiplier),
  });
}

const CAMERA_POSITION = 500;

const PLANET_MAP = {
  SUN: {
    key: 'SUN',
    name: 'Sun',
    radius: 30,
    xPosition: 0,
    surface: sun_surface,
    rotation: {
      x: 0.0005,
      y: 0.001,
    },
  },
  MERCURY: {
    key: 'MERCURY',
    name: 'Mercury',
    radius: 14,
    xPosition: 70,
    surface: mercury_surface,
    rotation: {
      x: 0.002,
      y: 0.01,
    },
    getPosition: generateGetPosition(70),
  },
  VENUS: {
    key: 'VENUS',
    name: 'Venus',
    radius: 20,
    xPosition: 120,
    surface: venus_surface,
    rotation: {
      x: 0.002,
      y: 0.01,
    },
    getPosition: generateGetPosition(120),
  },
  EARTH: {
    key: 'EARTH',
    name: 'Earth',
    radius: 10,
    xPosition: 170,
    surface: earth_surface,
    rotation: {
      x: 0.001,
      y: 0.004,
    },
    getPosition: generateGetPosition(170),
  },
  MARS: {
    key: 'MARS',
    name: 'Mars',
    radius: 15,
    xPosition: 200,
    surface: mars_surface,
    rotation: {
      x: 0.002,
      y: 0.0001,
    },
    getPosition: generateGetPosition(200),
  },
  JUPITER: {
    key: 'JUPITER',
    name: 'Jupiter',
    radius: 40,
    xPosition: 270,
    surface: jupiter_surface,
    rotation: {
      x: 0.001,
      y: 0.004,
    },
    getPosition: generateGetPosition(270, 200),
  },
  SATURN: {
    key: 'SATURN',
    name: 'Saturn',
    radius: 40,
    xPosition: 400,
    surface: saturn_surface,
    rotation: {
      x: 0.001,
      y: 0.004,
    },
    getPosition: generateGetPosition(400, 100),
  },
};

export { PLANET_MAP, CAMERA_POSITION };
