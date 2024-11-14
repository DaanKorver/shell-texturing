#include ../../../../../lygia/generative/random.glsl

varying vec2 vUv;
varying float shellId;

uniform float uShells;

vec3 green = vec3(0.0, 1.0, 0.0);
vec3 black = vec3(0.0);
// float GRID_SIZE = 256.0;
float GRID_SIZE = 128.0;
float thickness = 4.0;

void main() {
  vec2 localUV = fract(vUv * GRID_SIZE) * 2.0 - 1.0;
  float l = length(localUV);

  vec2 cell = floor(vUv * GRID_SIZE);

  float n = random(cell);
  float height = shellId / uShells;

  float stepper = mix(0.1, 0.99, height);
  float isGrass = step(stepper, n);
  vec3 col = mix(black, green * max(0.2, height), isGrass);

  if(col.g <= 0.0 || l > thickness * (n - height)) {
    discard;
  }

  gl_FragColor = vec4(col, 1.0);
}