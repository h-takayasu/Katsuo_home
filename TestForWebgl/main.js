import * as THREE from './three.js-master/build/three.module.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer, actions = {};

document.getElementById('kedarugeButton').addEventListener('click', () => playAnimation('kedaruge'));
document.getElementById('panchButton').addEventListener('click', () => playAnimation('panch.001'));

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);  
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('../asset/models/soleil-san_for_Website.glb', (gltf) => {
        console.log("Model loaded successfully");
        const model = gltf.scene;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
        });

        actions['kedaruge'].play();
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.01);
    renderer.render(scene, camera);
}

function playAnimation(name) {
    for (let actionName in actions) {
        actions[actionName].stop();
    }
    actions[name].play();
}