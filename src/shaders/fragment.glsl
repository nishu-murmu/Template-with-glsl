//fragment shader
varying vec2 vuv;

void main(){
    gl_FragColor = vec4(vuv, 0.0, 1.0);
}