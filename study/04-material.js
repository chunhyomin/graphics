import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

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
     }
 
     _setupLight() {
         const color = 0xffffff;
         const intensity = 1;
         const light = new THREE.DirectionalLight(color, intensity);
         light.position.set(-1, 2, 4);
         this._scene.add(light);
     }
     _setupControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    }

     _setupModel() {
        const vertices = [
            -1, 1, 0,
            1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
        ];
         const geometry = new THREE.BufferGeometry();

         geometry.setAttribute("position", 
            new THREE.Float32BufferAttribute(vertices, 3));

            const material = new THREE.LineDashedMaterial({
                color: 0xffff00,
                dashSize: 0.2,
                gapSize: 0.1,
                scale: 1
        });
        const line = new THREE.LineLoop(geometry, material);
        line.computeLineDistances();
        this._scene.add(line);
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