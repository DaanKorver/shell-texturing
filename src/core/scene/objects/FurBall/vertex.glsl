varying vec2 vUv;
varying float shellId;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uDistance;
uniform float uShells;
uniform vec3 uDirection;
uniform vec3 uPosition;

void main() {
  vec3 pos = position;
  float shellIndex = float(gl_InstanceID);
  float height = shellIndex / uShells;
  height = pow(height, 3.0);

  float dist = shellIndex * uDistance;
  pos += normal * dist;

  float k = pow(shellIndex / uShells, 5.);
  vec3 direction = vec3(0.0, -0.2, 0.0);
  pos += (direction + uDirection) * k * 0.3;
  pos += uPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  vUv = uv;
  shellId = float(gl_InstanceID);
  vNormal = normal;
  vPosition = position;
}