varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec4 resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_animation;
uniform sampler2D t1, t2;
uniform float progress;
float aspect = 0.001;

void main() {

	vec4 black = vec4(.0, .0, .0, 1.);
	vec4 white = vec4(1., 1., 1., 1.);

    vec2 newUv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

    vec4 i1 = texture2D(t1, newUv);
    vec4 i2 = texture2D(t2, newUv);

    float dist = distance(i1,i2)/2.;
    float pr = step(dist, progress);
    vec3 color = vec3(pr);

    float map1 = distance(i1,white)/2.;
    float map2 = distance(i2,white)/2.;

	float middle1 = step(map1, 0.5);
	float middle2 = step(map2, 0.5);

	vec4 l1 = texture2D(t1, newUv);
    vec4 l2 = texture2D(t2, newUv);
    
    vec4 final = mix(
        mix(l1,l2,pr),
        l2,
        pr
    );

    gl_FragColor = final;
}