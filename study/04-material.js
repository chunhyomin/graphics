import * as THREE from '../build/three.module.js';
 
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
 
     _setupModel() {
         const vertices = [];
         for (let i = 0; i < 10000; i++) {
             const x = THREE.MathUtils.randFloatSpread(5);
             const y = THREE.MathUtils.randFloatSpread(5);
             const z = THREE.MathUtils.randFloatSpread(5);
             vertices.push(x, y, z);
         }
 
         const geometry = new THREE.BufferGeometry();
         geometry.setAttribute(
             'position',
             new THREE.Float32BufferAttribute(vertices, 3)
         );
 
         const material = new THREE.PointsMaterial({
             color: 0x00ff00,
             size: 0.05,
             sizeAttenuation: false
         });
 
         const points = new THREE.Points(geometry, material);
         this._scene.add(points);
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