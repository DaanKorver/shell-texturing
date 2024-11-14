varying vec2 vUv;
varying float shellId;

uniform float uDistance;

void main() {
  vec4 pos = vec4(position, 1.0);

  pos.z += float(gl_InstanceID) * uDistance;

  gl_Position = projectionMatrix * modelViewMatrix * pos;

  vUv = uv;
  shellId = float(gl_InstanceID);
}