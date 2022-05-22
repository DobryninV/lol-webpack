varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec4 resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_animation;
uniform sampler2D t1, t2;
uniform sampler2D map;
uniform float progress;

void main() {

    float m = (u_mouse.x/u_resolution.x - 0.5)*0.0006;

    float distort = sin(vUv.y * 30.0 + u_time)*0.001 + m;

    float distortY = sin(vUv.x * 30.0 + u_time)*0.001;

    float textureMap = texture2D(map, vUv).r;

    vec2 newUv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

    vec2 coverDistort = vec2(newUv.x + distort*textureMap,newUv.y + distortY*textureMap);

    vec4 i1 = texture2D(t1, coverDistort);
    vec4 i2 = texture2D(t2, coverDistort);

    float dist = distance(i1,i2)/2.;


    float pr = step(dist,progress);
    vec3 color = vec3(pr);

    
    vec4 final = mix(
        mix(i1,i2,pr),
        i2,
        pr
    );

    gl_FragColor = final;
}