export const vertexShader = `
  attribute vec3 color;
  attribute float size;
  attribute float angle;
  attribute float opacity;
  attribute float visible;
  varying vec4 vColor;
  varying float vAngle;
  
  void main() {
    if(visible > 0.5) {
      vColor = vec4(color, opacity);
    } else {
      vColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
    vAngle = angle;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
  }
` 

export const fragmentShader = `
  uniform sampler2D texture;
  varying vec4 vColor;
  varying float vAngle;
  void main() {
    gl_FragColor = vColor;
    float u = cos(vAngle);
    float v = sin(vAngle);
    vec2 uv = vec2(
      u * (gl_PointCoord.x - 0.5) + v * (gl_PointCoord.y - 0.5) + 0.5, 
      u * (gl_PointCoord.y - 0.5) - v * (gl_PointCoord.x - 0.5) + 0.5
    );
    vec4 texture = texture2D(texture, uv);
    gl_FragColor = gl_FragColor * texture;
  }
`