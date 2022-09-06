import * as THREE from "three";

const create_room = () => {
  const geometry = new THREE.BoxGeometry(40, 15, 40);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/wallpaper.jpg"),
  });

  material.side = THREE.BackSide; // Defines which side of faces will be rendered - front, back or both
  const room = new THREE.Mesh(geometry, material);
  room.receiveShadow = true;

  return room;
};

const createLight = () => {
  // creates the light used for this scene, we're using pointlight
  const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
  pointLight.castShadow = true;

  pointLight.position.set(0, 2, 0);
  pointLight.castShadow = true;

  return pointLight;
};

const createTv = (animate) => {
  const tvBody = new THREE.BoxGeometry(7.1, 4.1, 0.3);
  const tvBodyTexture = new THREE.MeshStandardMaterial({
    color: 0xad3547,
  });

  const tvMesh = new THREE.Mesh(tvBody, tvBodyTexture);

  const screen = new THREE.PlaneGeometry(6.7, 3.7);

  const screenTexture = new THREE.TextureLoader().load(
    "./images/tv_wallpaper.jpg",
    animate
  );
  const screenMaterialTexture = new THREE.MeshBasicMaterial({
    map: screenTexture,
  });
  const tvScreen = new THREE.Mesh(screen, screenMaterialTexture);

  tvMesh.position.z = -0.16;
  tvMesh.attach(tvScreen);

  tvMesh.castShadow = true;
  tvMesh.receiveShadow = true;
  tvMesh.position.z = 1.5;

  return tvMesh;
};

const createTable = () => {
  const geometry = new THREE.BoxGeometry(8, 3, 3);

  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/table_texture.jpg"),
  });

  const table = new THREE.Mesh(geometry, material);
  table.position.y -= 3.5;
  table.position.z += 1;

  table.castShadow = true;
  table.receiveShadow = true;

  return table;
};

export { create_room, createLight, createTv, createTable };
