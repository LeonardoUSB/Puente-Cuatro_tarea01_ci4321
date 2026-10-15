// Data shared by both implementations, so the two files differ only in how they drive WebGL.

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Canvas size in device pixels. Fixed so both versions render the same pixels. */
export const CANVAS_SIZE = 480;

/** Interleaved vertex data: x, y, z per vertex. Clip space, counter-clockwise. */
export const TRIANGLE = new Float32Array([
  //x      y     z
   0.0,   0.7,  0.0, // top: red
  -0.7,  -0.6,  0.0, // bottom left: green
   0.7,  -0.6,  0.0  // bottom right: blue
]);

/** Interleaved vertex data: x, y, z per vertex. Clip space, counter-clockwise. */
export const SQUARE = new Float32Array([
  //x      y     z
  -0.7,  -0.7,  0.0,   // 0  esquina inferior-izquierda
   0.7,  -0.7,  0.0,   // 1  esquina inferior-derecha
   0.7,   0.7,  0.0,   // 2  esquina superior-derecha
  -0.7,   0.7,  0.0,   // 3  esquina superior-izquierda
]);

export const SQUARE_IND = new Uint16Array([
  0, 1, 2,   // triangulo 1
  0, 2, 3,   // triangulo 2
]);

/** Interleaved vertex data: x, y, z per vertex. Clip space, counter-clockwise. */
export const HEXAGON = new Float32Array([
  //x     y     z
   0.0,  0.0,  0.0, // 0 El centro
   0.6,  0.0,  0.0, // 1 Vértice 0°
   0.3,  0.52, 0.0, // 2 Vértice 60°
  -0.3,  0.52, 0.0, // 3 Vértice 120°
  -0.6,  0.0,  0.0, // 4 Vértice 180°
  -0.3, -0.52, 0.0, // 5 Vértice 240°
   0.3, -0.52, 0.0, // 6 Vértice 300°
   0.6,  0.0,  0.0  // 7 Vértice 0° que cierra la figura
]);

export const STRIDE_BYTES = 3 * 4; //4 bytes per float (Float32)
export const COLOR_OFFSET_BYTES = 3 * 4;
