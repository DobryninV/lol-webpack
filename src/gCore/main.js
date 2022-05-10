import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
const fragment = require("./shader/fragment.glsl");
const vertex = require("./shader/vertexParticles.glsl");

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
        this.renderer = new THREE.WebGLRenderer();
        this.loader = new THREE.TextureLoader();
        this.imageLoader = new THREE.ImageLoader();
        this.myTexture = this.loader.load( "img/foto.jpg" )
        this.image = this.imageLoader.load( "img/foto.jpg" )
        console.log(this)
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
        
        this.camera = new THREE.Camera();
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        let geometry = new THREE.PlaneBufferGeometry( 2, 2 );

        // camera
        var frustumSize = 10;
        var aspect = window.innerWidth / window.innerHeight;
        this.camera = 
            new THREE.OrthographicCamera( 
                frustumSize / - 2, 
                frustumSize / 2, 
                frustumSize / 2, 
                frustumSize / - 2, -1000, 1000 
            );
        this.camera.position.set(0, 0, 150);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.time = 0;

        const resSize = new THREE.Vector2()
        const imgSize = new THREE.Vector2(this.image?.width, this.image?.height)
        console.log(resSize, imgSize)

            
        this.uniforms = {
            u_time: { type: "f", value: 1.0 },
            u_animation: { type: "f", value: 0.0 },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            u_resolution: { type: "v2", value: resSize },
            u_size: {type:"v2",value: imgSize },
            mainPhoto: {value: this.myTexture},
            scale: { type: "f", value: 0.4},
            map: {value: this.loader.load( "img/popkamap.jpg" ) }
        };

        const material = new THREE.ShaderMaterial( {
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        } );

        const mesh = new THREE.Mesh( geometry, material );
        this.scene.add( mesh );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        
        this.container.appendChild( this.renderer.domElement );
        this.onWindowResize();
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
        
        document.addEventListener('click',function(){
            gsap
                .to(this.uniforms.u_animation, 3, {value:1})
        })
    }


    onWindowResize( event ) {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
        this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
        this.uniforms.u_mouse.value.x = this.mouse.x;
        this.uniforms.u_mouse.value.y = this.mouse.y;
    }


    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    }


    render() {
        this.uniforms.u_time.value += 0.05;
        this.renderer.render( this.scene, this.camera );
    }

    start() {
        this.init()
        this.animate()
    }
}