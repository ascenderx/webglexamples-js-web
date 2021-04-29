const fsSource = usSource + `
#define FUNC2

#ifdef FUNC1
highp vec2 func(highp vec2 z) {
  highp float x = uTime/40.0;
  highp float y = uTime/20.0;
  highp float c = 1.0 / (PI * 10.0);
  highp float a = 100.0;
  return a*sin((z - x*R + y*I)*c);
}
#endif

#ifdef FUNC2
highp vec2 func(highp vec2 z) {
  highp vec2 a = cMul(z, z) - R;
  highp vec2 b = z - 2.0*R - I;
  highp vec2 b2 = cMul(b, b);
  highp vec2 d = cMul(z, z) + 2.0*R + 2.0*I;
  highp vec2 o = cDiv(cMul(a, b2), d);
  highp float angle = mod(uTime / 20.0, 360.0);
  return cRotate(o, angle);
}
#endif

#ifdef FUNC3
highp vec2 func(highp vec2 z) {
  highp vec2 o = cMul(cMul(z, z), z) - R;
  highp float angle = mod(uTime / 20.0, 360.0);
  return cRotate(o, angle);
}
#endif

void main(void) {
  highp vec2 z = uResolution*0.5 - gl_FragCoord.xy;
  highp vec2 o = func(adjustToResolution(z));
  gl_FragColor = vec4(getColor(o), 1.0);
}
`;

