import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const fragment = require("./shader/transitionFragment.glsl");
// const fragment = require("./shader/distornFragment.glsl");
// const fragment = require("./shader/mandelbrot.glsl");
// const fragment = require("./shader/m.glsl");
const vertex = require("./shader/vertex.glsl");

// имеет смысл сделать класс с методами обновления и пососать
export class Sketch {
    mouse = {x:0, y:0};
    constructor(delay = 1.5) {
        this.uniforms;
        this.camera;
        this.scene;
        this.material;
        this.valRes;
        
        this.imageAspect = 3456/4608;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.loader = new THREE.TextureLoader();
        this.imageLoader = new THREE.ImageLoader();
        this.pole = this.loader.load( "img/mountains.jpeg" );
        this.pole2 = this.loader.load( "img/sea.jpeg" );
        this.mountains = this.loader.load( "img/tower.jpeg" );
        this.isAnimate = false;
        this.curent = 't1';
        this.settings;
        this.delay = delay;
    }

    settingsGUI() {
        this.settings = {
            progress: 0,
        }
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "progress", 0, 1, 0.01)
    }
    

    getMouseXY(e) {
        this.mouse.x = e.pageX;
        this.mouse.y = e.pageY;
        this.uniforms.u_mouse.value.x = this.mouse.x;
        this.uniforms.u_mouse.value.y = this.mouse.y;
    }

    init() {
        document.onmousemove = this.getMouseXY.bind(this);
        this.container = document.getElementById( 'container' );
        
        this.scene = new THREE.Scene();
        const imgSize = new THREE.Vector2(this.image?.width, this.image?.height)
        let geometry = new THREE.PlaneBufferGeometry( 1, 1 );

        // camera
        var frustumSize = 1;
        this.camera = 
            new THREE.OrthographicCamera( 
                frustumSize / - 2, 
                frustumSize / 2, 
                frustumSize / 2, 
                frustumSize / - 2, -1000, 1000 
            );
        this.camera.position.set(0, 0, 2);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        
        this.valRes = new THREE.Vector4();

            
        this.uniforms = {
            u_time: { type: "f", value: 1.0 },
            progress: { value: 0 },
            u_animation: { type: "f", value: 0.0 },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            resolution: { type: "v4", value: this.valRes },
            u_size: { type:"v2",value: imgSize },
            t1: { value: this.pole },
            t2: { value: this.pole2 },
        };

        this.material = new THREE.ShaderMaterial( {
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        } );

        const mesh = new THREE.Mesh( geometry, this.material );
        this.scene.add( mesh );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        
        this.container.appendChild( this.renderer.domElement );
        this.onWindowResize();
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }


    onWindowResize( event ) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
        this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
        this.uniforms.u_mouse.value.x = this.mouse.x;
        this.uniforms.u_mouse.value.y = this.mouse.y;

        let a1, a2;
        if (this.height/this.width > this.imageAspect) {
            a1 = (this.width/this.height) * this.imageAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (this.height/this.width)/this.imageAspect;;
        }

        this.uniforms.resolution.value.z = a1;
        this.uniforms.resolution.value.w = a2;
    }

    async changeRoute (route) {
        if (this.isAnimate) {
            return false;
        }
        this.isAnimate = true;

        this.curent = this.curent === 't1' ? 't2' : 't1';
        const value = this.curent === 't1' ? 0 : 1;

        switch(route) {
            case "pole2":
                this.uniforms[this.curent].value = this.pole2
                break;
            case "mountains":
                this.uniforms[this.curent].value = this.mountains
                break;
            default:
                this.uniforms[this.curent].value = this.pole
        }

        await gsap
            .to(
                this.uniforms.progress, 
                {value, duration: this.delay, ease: "power1.inOut"}
            )
        this.isAnimate = false;
        return true;
    }



    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    }


    render() {
        this.uniforms.u_time.value += 0.05;
        // this.uniforms.progress.value = this.settings.progress;
        this.renderer.render( this.scene, this.camera );
    }

    start() {
        // this.settingsGUI()
        this.init()
        this.animate()
    }
}