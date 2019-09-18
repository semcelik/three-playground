import {
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  MeshBasicMaterial,
  Group
} from "three";

const PIG_SIZE = {
  SMALL: "s",
  MEDIUM: "m",
  LARGE: "l"
};

function createPig(size = PIG_SIZE.MEDIUM) {
  let multiplier;
  if (size === PIG_SIZE.LARGE) {
    multiplier = 3;
  }
  if (size === PIG_SIZE.MEDIUM) {
    multiplier = 2;
  }
  if (size === PIG_SIZE.SMALL) {
    multiplier = 1;
  }

  const faceSize = 5 * multiplier;
  const noseSize = 1 * multiplier;
  const eyeSize = {
    width: (2 / 3) * multiplier,
    depth: (1 / 3) * multiplier
  };
  const eyePosition = {
    x: -1 * multiplier,
    y: (5 / 3) * multiplier,
    z: (8 / 3) * multiplier
  };
  const nosePosition = {
    y: (-2 / 3) * multiplier,
    z: 3 * multiplier
  };

  const geometry = new BoxGeometry(faceSize, faceSize, faceSize);
  const material = new MeshNormalMaterial();
  const cube = new Mesh(geometry, material);

  const smallGeo = new BoxGeometry(noseSize * 2, noseSize, noseSize);
  const smallMaterial = new MeshNormalMaterial();
  const smallCube = new Mesh(smallGeo, smallMaterial);
  smallCube.position.y = nosePosition.y;
  smallCube.position.z = nosePosition.z;

  const leftEyeGeometry = new BoxGeometry(
    eyeSize.width,
    eyeSize.width,
    eyeSize.width
  );
  const leftEyeMaterial = new MeshBasicMaterial({ color: "#fff" });
  const leftEye = new Mesh(leftEyeGeometry, leftEyeMaterial);
  leftEye.position.x = eyePosition.x;
  leftEye.position.y = eyePosition.y;
  leftEye.position.z = eyePosition.z;

  const rightEye = leftEye.clone();
  rightEye.position.x = -eyePosition.x;

  const pig = new Group();
  pig.add(cube);
  pig.add(smallCube);
  pig.add(leftEye);
  pig.add(rightEye);

  return pig;
}

function getRandomPosition() {
  let xOffset = 1;
  let yOffset = 1;

  const region = Math.floor(Math.random() * 4);

  if (region === 1 || region === 2) {
    xOffset = -1;
  }
  if (region === 2 || region === 3) {
    yOffset = -1;
  }

  const positionX =
    xOffset * Math.random() * 100 + 5 * Math.floor(Math.random() * 4);
  const positionY =
    yOffset * Math.random() * 80 + 5 * Math.floor(Math.random() * 4);
  const positionZ =
    yOffset * Math.random() * 200 + 5 * Math.floor(Math.random() * 4);

  return { x: positionX, y: positionY, z: positionZ };
}

export { PIG_SIZE, createPig, getRandomPosition };
