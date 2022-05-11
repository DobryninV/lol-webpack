varying vec2 vUv;
uniform vec2 u_size;
uniform vec2 u_resolution;
uniform float scale;
void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
    gl_Position = projectionMatrix * mvPosition;
}