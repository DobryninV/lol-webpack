import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const fragment = require("./shader/fragment.glsl");
const vertex = require("./shader/vertex.glsl");

let navigation = 'main'

export const chengeImage = (navType) => {
    navigation = navType;
}

// имеет смысл сделать класс с методами обновления и пососать
export class Sketch {
    mouse = {x:0, y:0};
    constructor() {
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
        this.myTexture = this.loader.load( "img/pole.jpg" )
        this.pole = this.loader.load( "img/pole2.jpg" )
        this.image = this.imageLoader.load( "img/pole.jpg" )
        this.settings;
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
        
        // this.camera = new THREE.Camera();
        // this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        const resSize = new THREE.Vector2()
        const imgSize = new THREE.Vector2(this.image?.width, this.image?.height)
        let geometry = new THREE.PlaneBufferGeometry( 1, 1 );

        // camera
        var frustumSize = 1;
        var aspect = window.innerWidth / window.innerHeight;
        this.camera = 
            new THREE.OrthographicCamera( 
                frustumSize / - 2, 
                frustumSize / 2, 
                frustumSize / 2, 
                frustumSize / - 2, -1000, 1000 
            );
        this.camera.position.set(0, 0, 2);
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        
        this.valRes = new THREE.Vector4();

            
        this.uniforms = {
            u_time: { type: "f", value: 1.0 },
            progress: { value: 0 },
            u_animation: { type: "f", value: 0.0 },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            resolution: { type: "v4", value: this.valRes },
            u_size: {type:"v2",value: imgSize },
            t1: {value: this.myTexture},
            t2: { value: this.pole },
            map: {value: this.loader.load( "img/popkamap.jpg" ) }
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
        
        // document.addEventListener('click',function(){
        //     gsap
        //         .to(this.uniforms.u_animation, 3, {value:1})
        // })
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
        if (this.height/this.width>this.imageAspect) {
            a1 = (this.width/this.height) * this.imageAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (this.height/this.width)/this.imageAspect;;
        }

        console.log(a1, a2)

        if (this.material.uniforms.resolution) {
            console.log(this.material.uniforms.resolution, a1, a2)
            this.uniforms.resolution.value.z = a1;
            this.uniforms.resolution.value.w = a2;
        }
    }


    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    }


    render() {
        this.uniforms.u_time.value += 0.05;
        this.uniforms.progress.value = this.settings.progress;
        this.renderer.render( this.scene, this.camera );
    }

    start() {
        this.settingsGUI()
        this.init()
        this.animate()
    }
}