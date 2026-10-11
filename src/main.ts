//import { run as runTriangulo } from './triangulo';
import { run as runCuadrado }  from './cuadrado';
//import { run as runHexagono }  from './hexagono';
import { run as runCirculo }   from './circulo';

// Las 4 funciones run(agregar despues)
const runs = [ runCuadrado, runCirculo];


const colores: [number, number, number][] = [
  [1.0, 0.3, 0.3],   // rojo
  [0.3, 1.0, 0.4],   // verde
  [0.4, 0.6, 1.0],   // azul
];

const stage       = document.getElementById('estado')!;
const botonFigura = document.getElementById('Figura')!;
const botonColor  = document.getElementById('Color')!;

//Dos contadores modulares
let idxFigura = 0;
let idxColor  = 0;


function mostrar(): void {
  const canvas = document.createElement('canvas');
  stage.replaceChildren(canvas);
  runs[idxFigura](canvas, colores[idxColor]);
}

// Boton Figura
botonFigura.addEventListener('click', () => {
  idxFigura = (idxFigura + 1) % runs.length;
  mostrar();
});

// Boton Color
botonColor.addEventListener('click', () => {
  idxColor = (idxColor + 1) % colores.length;
  mostrar();
});

// Primer dibujo al arrancar
mostrar();