import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// creating the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// init orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// making the donut (torus)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);


// light source //
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);


// TEXTURES //
const widepeepoTexture = new THREE.TextureLoader().load('assets/widepeepoHappy.png');
const sadgeTexture = new THREE.TextureLoader().load('assets/faangsadge.png');
const pogUTeethTexture = new THREE.TextureLoader().load('assets/poguTeeth.png')

// rough texture for moon
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');

// mapping sadgeTexture to a boxgeometry
const sadge = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: sadgeTexture })
);
    
// mapping widepeepoTexture on a sphere
// normal map used for moon-like look
const peepoMoon = new THREE.Mesh(
new THREE.SphereGeometry(3,32,32),
new THREE.MeshStandardMaterial( {
    map: widepeepoTexture,
    normalMap: normalTexture
})
);

// mapping poguTeethTexture to a sphere
// normal map used for moon-like look
const poguTeethMoon = new THREE.Mesh(
new THREE.SphereGeometry(5,32,32),
new THREE.MeshStandardMaterial( {
    map: pogUTeethTexture,
    normalMap: normalTexture
})
);

// setting default camera pos
camera.position.z = 30;

// setting the position of the light source
pointLight.position.set(20,20,20);
peepoMoon.position.set(-7, 12, 18)
poguTeethMoon.position.set(0, 30, 10)

// move when scroll
//document.body.onscroll = moveCamera
// ONLY USED WITH SCROLL MOVE - not called
function moveCamera() {
const t = document.body.getBoundingClientRect().top;
peepoMoon.rotation.x += 0.05;
peepoMoon.rotation.y += 0.075;
peepoMoon.rotation.z += 0.05;

poguTeethMoon.rotation.x += 0.1;
poguTeethMoon.rotation.y += 0.009;
poguTeethMoon.rotation.z += 0.05;

sadge.rotation.y += 0.01;
sadge.rotation.z += 0.01;

camera.position.z = t*-0.01;
camera.position.x = t*-0.0002;
camera.position.y = t*-0.0002;
}

// WINDOW EVENT LISTENERS
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render();
})

// DOC EVENT LISTENERS
// add for arrow keystrokes

// FUNCTIONS //
// making a starry sky
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
    
}

// like a gameloop
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    peepoMoon.rotation.x += 0.005;
    peepoMoon.rotation.y += 0.01;
    peepoMoon.rotation.z += 0.005;

    poguTeethMoon.rotation.x += 0.01;
    poguTeethMoon.rotation.y += 0.009;
    poguTeethMoon.rotation.z += 0.005;

    sadge.rotation.y += 0.01;
    sadge.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);

}


// SCENE ADDS //
scene.add(torus);
scene.add(pointLight, ambientLight);
scene.add(lightHelper, gridHelper);
scene.add(sadge);
scene.add(peepoMoon);
scene.add(poguTeethMoon);

// creating stars
for(let i = 0; i < 200; i++){
    addStar();
}

// calling animate to display animations
animate();