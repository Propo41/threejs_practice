import * as THREE from "three";
import { create_room, createLight, createTv, createTable } from "./utils.js";

//-------------------- initialization ------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

var vec = new THREE.Vector3(); // used to manipulate coords
var pos = new THREE.Vector3(); // used to manipulate coords

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

//--------------------  create image textures of video --------------------

const video = document.getElementById("video");
const videoTexture = new THREE.VideoTexture(video);

videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

var movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
});

// loop to render the scene
function animate() {
  requestAnimationFrame(animate);
  // update video texture with new image of video (series of images)
  videoTexture.needsUpdate = true;
  renderer.render(scene, camera);
}

//-------------------- creating objects ------------------------

const room = create_room();
scene.add(room);

const tv = createTv(movieMaterial);
scene.add(tv);

const table = createTable();
scene.add(table);

var pointLight = createLight();
scene.add(pointLight);

animate();

// ------------------ listeners -------------------

// mouse listener
document.addEventListener("mousemove", function (event) {
  video.play();
  // move mouse to move the light
  vec.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );

  vec.unproject(camera);

  vec.sub(camera.position).normalize();

  var distance = -camera.position.z / vec.z;
  pos.copy(camera.position).add(vec.multiplyScalar(distance));

  pointLight.position.x = pos.x;
  pointLight.position.y = pos.y;
  pointLight.position.z = pos.z;
  renderer.render(scene, camera);
});

// keyboard listener
window.addEventListener(
  "keydown",
  (event) => {
    let distance = 0;
    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction); // get the direction the camera is facing and store it in direction

    switch (event.code) {
      case "ArrowUp":
        distance = 0.3;
        var move = direction.multiplyScalar(distance);
        camera.position.add(move);
        break;

      case "ArrowDown":
        // down arrow
        distance = -0.3;
        var move = direction.multiplyScalar(distance);
        camera.position.add(move);
        break;

      case "ArrowRight":
        camera.rotation.y -= 0.1;
        break;

      case "ArrowLeft":
        camera.rotation.y += 0.1;
        break;
    }

    renderer.render(scene, camera);
  },
  true
);

// ------------------ animating screen -------------------
// var frame = 0;
// var count = 0;
// const animateTvScreen = () => {
//   // changing frame every 3 iterations upto 183
//   if (count == 3) {
//     frame = (frame + 1) % 183;
//     count = 0;
//   } else {
//     count++;
//   }

//   requestAnimationFrame(animateTvScreen);

//   var src = "./images/screen/frame" + frame + ".jpg";
//   tv.children[0].material.map = new THREE.TextureLoader().load(src, animate);
// };

// animateTvScreen();
