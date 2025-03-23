import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from '../examples/jsm/helpers/VertexNormalsHelper.js';

class App {
    constructor() {
        const divContainer = document.querySelector('#webgl-container');
        this.divContainer = divContainer;

        let renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        
        window.onresize = this.resize.bind(this);
        this.resize();
    
        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this.divContainer.clientWidth;
        const height = this.divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        //this._scene.add(light);
        this._camera.add(light);



    }

    _setupControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    }

    _setupModel() {
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("images/glass/Glass_Window_002_basecolor.jpg");
        const mapAO = textureLoader.load("images/glass/Glass_Window_002_ambientOcclusion.jpg");
        const mapHeight = textureLoader.load("images/glass/Glass_Window_002_height.png");
        const mapNormal = textureLoader.load("images/glass/Glass_Window_002_normal.jpg");
        const mapRoughness = textureLoader.load("images/glass/Glass_Window_002_roughness.jpg");
        const mapMetalic = textureLoader.load("images/glass/Glass_Window_002_metallic.jpg");
        const mapAlpha = textureLoader.load("images/glass/Glass_Window_002_opacity.jpg");
        const material = new THREE.MeshStandardMaterial({
            map: map,
            normalMap: mapNormal,
        });

        const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        box.position.set(-1, 0, 0);
        this._scene.add(box);

        const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00, 1);
        this._scene.add(boxHelper);


        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
        sphere.position.set(1, 0, 0);
        this._scene.add(sphere);

        const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00, 1);
        this._scene.add(sphereHelper);
    }

    resize() {
        const width = this.divContainer.clientWidth;
        const height = this.divContainer.clientHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;

    }
}

window.onload = function() {
    new App();
}