import PigTracker from './examples/PigTracker';
import SolarSystem from './examples/SolarSystem';

const ROUTES = [
  {
    key: 'pigTracker',
    path: '/',
    name: 'Pig Tracker',
    component: PigTracker,
  },
  {
    key: 'solarSystem',
    path: '/solar-system',
    name: 'Solar System',
    component: SolarSystem,
  },
];

export default ROUTES;
