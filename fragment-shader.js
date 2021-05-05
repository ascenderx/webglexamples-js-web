const fsSource = usSource + `
#define FUNC2

#ifdef FUNC1
highp vec2 func(highp vec2 z) {
  highp float angle = mod(uTime / 20.0, 360.0);
  return cRotate(z, -angle);
}
#endif

#ifdef FUNC2
highp vec2 func(highp vec2 z) {
  highp vec2 a = cMul(z, z) - R;
  highp vec2 b = z - 2.0*R - I;
  highp vec2 b2 = cMul(b, b);
  highp vec2 d = cMul(z, z) + 2.0*R + 2.0*I;
  highp vec2 o = cDiv(cMul(a, b2), d);
  // highp float angle = mod(uTime / 20.0, 360.0);
  return o;
}
#endif

#ifdef FUNC3
highp vec2 func(highp vec2 z) {
  highp vec2 o = cMul(cMul(z, z), z) - R;
  // highp float angle = mod(uTime / 20.0, 360.0);
  return o;
}
#endif

void main(void) {
  highp vec2 center = uResolution*0.5;
  highp vec2 z = gl_FragCoord.xy - center;
  highp float computedZoom = pow(2.0, uZoom);
  highp float ratio = 0.1 * min(uResolution.x, uResolution.y);
  highp vec2 z1 = z*computedZoom/ratio + uOffset/ratio;
  highp vec2 o = func(z1);
  gl_FragColor = vec4(getColor(o), 1.0);
}
`;
