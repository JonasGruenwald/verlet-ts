import { Simulation } from "../../lib/simulation";

const fps = 60;
const interval = Math.floor(1000 / fps);

class Sketch extends HTMLElement {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scale: number;
  startTime: number;
  previousTime: number;
  currentTime: number;
  deltaTime: number;
  constructor(width: number, height: number, caption: string, scale: number = window.devicePixelRatio || 1) {
    super();
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
    <style>
      canvas {
        border: 1px solid black;
      }
      .caption{
        margin: 10px 0;
      }
    </style>
    <div class="caption">${caption}</div>
    <canvas width="${width}" height="${height}"></canvas>
  `;
    // canvas 
    this.scale = scale;
    this.canvas = root.querySelector('canvas')!;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.width = width * scale;
    this.canvas.height = height * scale;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(scale, scale);
    // timing
    this.startTime = performance.now();
    this.previousTime = this.startTime;
    this.currentTime = 0;
    this.deltaTime = 0;
  }

  connectedCallback() {
    requestAnimationFrame(this.update)
  }

  update = (timestamp: number) => {
    this.currentTime = timestamp;
    this.deltaTime = this.currentTime - this.previousTime;
    if (this.deltaTime > interval) {
      this.draw();
      this.previousTime = this.currentTime - (this.deltaTime % interval);
    }
    requestAnimationFrame(this.update);
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const drawSimulation = (simulation: Simulation, ctx: CanvasRenderingContext2D) => {
  // constraints
  ctx.strokeStyle = "grey";
  for (let i = 0; i < simulation.constraints.length; i++) {
    if (simulation.constraints[i].p1 !== undefined && simulation.constraints[i].p2 !== undefined) {
      ctx.beginPath();
      ctx.moveTo(simulation.constraints[i].p1.pos.x, simulation.constraints[i].p1.pos.y);
      ctx.lineTo(simulation.constraints[i].p2!.pos.x, simulation.constraints[i].p2!.pos.y);
      ctx.stroke();
    }
  }
  // particles
  ctx.fillStyle = "black";
  for (let i = 0; i < simulation.particles.length; i++) {
    ctx.beginPath();
    ctx.arc(simulation.particles[i].pos.x, simulation.particles[i].pos.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export { Sketch, drawSimulation }