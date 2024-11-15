#include ../../../../../lygia/generative/random.glsl

varying vec2 vUv;
varying float shellId;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uShells;
uniform vec3 uColor;

vec3 black = vec3(0.0);
float GRID_SIZE = 512.0;
float thickness = 50.;

float halfLambert(vec3 normal, vec3 lightDir) {
  float dp = dot(normal, lightDir);
  float nDot = clamp(dp, 0.0, 1.0);
  return nDot * 0.5 + 0.5;
}

void main() {
  vec2 localUV = fract(vUv * GRID_SIZE) * 2.0 - 1.0;
  float l = length(localUV);

  vec2 cell = floor(vUv * GRID_SIZE);

  float noise = random(cell);
  float n = mix(0.6, 1.0, noise);

  float height = shellId / uShells;

  float stepper = mix(0.0, 0.99, height);
  float isGrass = step(stepper, n);
  vec3 col = mix(black, uColor * max(0.2, height), isGrass);

  if(col.g <= 0.0 || l > thickness * (n - height)) {
    discard;
  }

  vec3 light = vec3(1.0, 1.0, 2.0);
  float power = halfLambert(normalize(vNormal), normalize(light));
  col *= power * power;

  gl_FragColor = vec4(col, 1.0);
}
