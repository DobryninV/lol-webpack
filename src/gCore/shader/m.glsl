
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 resolution;

float MAX_ITER = 120.0;

float mandelbrot(vec2 vUv) {
    vec2 c = 4. * vUv - vec2(.7, .0);
    c = c / pow(u_time/10., 4.) - vec2(0.65, 0.45);
    vec2 z = vec2(.0);
    float iter = .0;
    for (float i; i < MAX_ITER; i++) {
        z = vec2(z.x * z.x - z.y * z.y,
            2. * z.x * z.y) + c;
        if (dot(z, z) > 4.) return iter/MAX_ITER;
        iter++;
    }
    return 0.0;

}

vec3 hash13(float m ) {
    float x = fract(sin(m) * 5625.123);
    float y = fract(sin(m) * 1231.123);
    float z = fract(sin(m) * 3453.123);

    return vec3(x, y, z);
}

void main(){
    
    vec2 newUv = (vUv - vec2(1.))*resolution.zw + vec2(0.5);
    float m = mandelbrot(newUv);

    vec3 col = vec3(0.0);

    col += hash13(m);
    // col = pow(col, vec3(0.45));

    gl_FragColor = vec4(col, 1.);
}