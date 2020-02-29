import earth_surface from '../../assets/earth_surface.jpeg';
import sun_surface from '../../assets/sun_surface.jpeg';
import mars_surface from '../../assets/mars_surface.jpg';
import mercury_surface from '../../assets/mercury_surface.jpg';
import venus_surface from '../../assets/venus_surface.jpg';
import jupiter_surface from '../../assets/jupiter_surface.jpg';
import saturn_surface from '../../assets/saturn_surface.jpg';

const EARTH_RADIUS = 10;

function generateGetPosition(position, preMultiplier = position) {
  const multiplier = preMultiplier * (Math.floor(Math.random() * 2) + 1);
  return (t) => ({
    x: position * Math.sin(t * multiplier),
    z: position * Math.cos(t * multiplier),
  });
}

const CAMERA_POSITION = {
  X: -160,
  Y: 100,
  Z: 150,
};

const PLANET_MAP = {
  SUN: {
    key: 'SUN',
    name: 'Sun',
    radius: EARTH_RADIUS * 3,
    surface: sun_surface,
    rotation: {
      x: 0.0005,
      y: 0.001,
    },
    shine: true,
  },
  MERCURY: {
    key: 'MERCURY',
    name: 'Mercury',
    radius: EARTH_RADIUS * 0.4,
    surface: mercury_surface,
    rotation: {
      x: 0.002,
      y: 0.01,
    },
    getPosition: generateGetPosition(45),
  },
  VENUS: {
    key: 'VENUS',
    name: 'Venus',
    radius: EARTH_RADIUS * 0.95,
    surface: venus_surface,
    rotation: {
      x: 0.002,
      y: 0.01,
    },
    getPosition: generateGetPosition(70),
  },
  EARTH: {
    key: 'EARTH',
    name: 'Earth',
    radius: EARTH_RADIUS,
    surface: earth_surface,
    rotation: {
      x: 0.001,
      y: 0.004,
    },
    getPosition: generateGetPosition(110),
  },
  MARS: {
    key: 'MARS',
    name: 'Mars',
    radius: EARTH_RADIUS * 0.5,
    surface: mars_surface,
    rotation: {
      x: 0.002,
      y: 0.0001,
    },
    getPosition: generateGetPosition(140),
  },
  JUPITER: {
    key: 'JUPITER',
    name: 'Jupiter',
    radius: EARTH_RADIUS * 1.3,
    surface: jupiter_surface,
    rotation: {
      x: 0.001,
      y: 0.004,
    },
    getPosition: generateGetPosition(175, 100),
  },
  SATURN: {
    key: 'SATURN',
    name: 'Saturn',
    radius: EARTH_RADIUS * 1.25,
    surface: saturn_surface,
    rotation: {
      x: 0.0005,
      y: 0.014,
    },
    getPosition: generateGetPosition(240, 120),
    hasStar: true,
  },
};

export { PLANET_MAP, CAMERA_POSITION };
