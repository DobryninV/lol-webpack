varying vec2 vUv;
uniform vec2 u_size;
uniform vec2 u_resolution;
uniform float scale;
void main() {
    vUv = (position.xy+1.0);
    float scalex,scaley;
    scalex = u_size.x/(u_resolution.x);
    scaley = u_size.y/(u_resolution.y);
    vUv.x = vUv.x/scalex;
    vUv.y = vUv.y/scaley;
    gl_Position = vec4(position, 1.0);
}