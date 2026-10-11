import { ATTRIB, createFixedFunction, LIGHTING } from './vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR, STRIDE_BYTES} from './shared';


function segmentacion(segments: number, radius = 1): Float32Array {

  if (segments > 64) segments = 64;
  if (segments < 3) segments = 3;

  const datos: number[] = [];
  datos.push(0, 0, 0);

  for (let i = 0; i <= segments; i++) {
    const angulo = (i / segments) * Math.PI * 2;
    datos.push(
      Math.cos(angulo) * radius,
      Math.sin(angulo) * radius,
      0
    );
  }

  return new Float32Array(datos);
}

// Step 1. Get the WebGL2 context.
function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 is not available.');
  return gl;
}

// Step 2. Shaders and program: FF creates and owns them.
// Step 3. Vertex specification: copy the vertex data to the GPU.
function createVertexBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

// Step 4. Describe how the vertex data is laid out, using FF's attribute slots.
function createVAO(gl: WebGL2RenderingContext, vbuffer: WebGLBuffer): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, STRIDE_BYTES, 0);
  gl.bindVertexArray(null);
  return vao;
}

// Step 5. Pipeline state: canvas size, viewport, clear color.
function setupState(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(...CLEAR_COLOR);
}

function draw(gl: WebGL2RenderingContext, ff: ReturnType<typeof createFixedFunction>, vao: WebGLVertexArrayObject,color: [number, number, number], count:number): void {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindVertexArray(vao);
  ff.setColor(color);
  ff.drawArrays(gl.TRIANGLE_FAN, 0, count);
}

export function run(canvas: HTMLCanvasElement,color: [number, number, number], segmentos=64): void {
  if (segmentos > 64) segmentos = 64;
  if (segmentos < 3) segmentos = 3;
  const gl = getContext(canvas);
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING); // unlit: the output is the per-vertex color
  const data = segmentacion(segmentos)
  console.log(data)
  const vBuffer = createVertexBuffer(gl, data);
  const vao = createVAO(gl, vBuffer);
  setupState(gl, canvas);
  draw(gl, ff, vao,color, segmentos+2);
}
