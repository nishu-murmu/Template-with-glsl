//fragment shader
uniform float time;
uniform vec4 resolution;

varying vec2 vuv;

void main(){
    gl_FragColor = vec4(vuv, 0.0, 1.0);
}