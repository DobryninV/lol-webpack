varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_animation;
uniform sampler2D mainPhoto;
uniform sampler2D map;

void main() {

    float m = (u_mouse.x/u_resolution.x - 0.5)*0.0006;

    float distort = sin(vUv.y * 30.0 + u_time)*0.001 + m;

    float distortY = sin(vUv.x * 30.0 + u_time)*0.001;

    float textureMap = texture2D(map, vUv).r;

    vec4 color = texture2D(mainPhoto, vec2(vUv.x + distort*textureMap,vUv.y + distortY*textureMap));

    gl_FragColor = color;

}