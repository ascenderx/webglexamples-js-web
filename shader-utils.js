const usSource = `
#define PI 3.14159265359
#define SAT_RATIO 0.0625

const highp vec2 R = vec2(1.0, 0.0);
const highp vec2 I = vec2(0.0, 1.0);

uniform lowp vec2 uMouse;
uniform lowp vec2 uOffset;
uniform lowp float uZoom;
uniform highp float uTime;
uniform lowp vec2 uResolution;

// https://stackoverflow.com/a/17897228/9904700
mediump vec3 hsv2rgb(mediump vec3 c)
{
  mediump vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  mediump vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

highp vec3 getColor(highp vec2 point) {
  highp float x = point.x;
  highp float y = point.y;
  highp float r = sqrt(x*x + y*y);
  highp float a = atan(y, x) * 180.0 / PI;
  
  highp float h = a / 360.0;
  highp float s = 1.0 - pow(SAT_RATIO, r);
  highp float v = 1.0;
  
  return hsv2rgb(vec3(h, s, v));
}

highp float degToRad(highp float degrees) {
  return degrees * PI / 180.0;
}

highp float radToDeg(highp float radians) {
  return radians * 180.0 / PI;
}

highp vec2 cMul(highp vec2 a, highp vec2 b) {
  return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

highp vec2 cDiv(highp vec2 a, highp vec2 b) {
  highp float d = b.x*b.x + b.y*b.y;
  return vec2((a.x*b.x + a.y*b.y)/d, (a.y*b.x - a.x*b.y)/d);
}

highp float cLen(highp vec2 z) {
  return sqrt(z.x*z.x + z.y*z.y);
}

highp float cArg(highp vec2 z) {
  return atan(z.y, z.x);
}

highp vec2 cPolar(highp float r, highp float th) {
  return vec2(r*cos(th), r*sin(th));
}

highp vec2 cUnit(highp vec2 z) {
  highp float d = sqrt(z.x*z.x + z.y*z.y);
  return vec2(z.x/d, z.y/d);
}

highp vec2 cRotate(highp vec2 z, highp float degrees) {
  highp float r = cLen(z);
  highp float th = cArg(z);
  return cPolar(r, th + degToRad(degrees));
}
`;