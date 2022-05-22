varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec4 resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_animation;
uniform sampler2D t1, t2;
uniform sampler2D map;
uniform float progress;
float PI = 3.1415926535897932384626433832795;
float ripples = 0.35;
vec2 scale = vec2(5.0, 5.0);
bool trueDistortion = false;

void main() {
    float v = 0.0;
    vec2 distort = vUv * scale - scale/2.0;
    v += sqrt(distort.x*distort.x + distort.y * distort.y) + u_time*0.1 + 1.0;
    
    distort = vec2(sin(PI*v*ripples), cos(PI*v*ripples));
    vec2 texCord;
    
    if(trueDistortion){
    	texCord = vUv*distort;
    }else{
    	texCord = vUv+distort;
    }
    
    vec4 col = texture2D(t1, texCord);

    gl_FragColor = col;
}