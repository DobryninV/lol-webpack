varying vec2 vUv;
uniform vec2 u_size;
uniform vec2 u_resolution;
uniform float scale;
void main() {
    vUv = uv;
    float scalex,scaley;
    scalex = u_size.x/u_resolution.x;
    scaley = u_size.y/u_resolution.y;
    // vUv.x = vUv.x/scalex;
    // vUv.y = vUv.y/scaley;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
    gl_Position = projectionMatrix * mvPosition;
}