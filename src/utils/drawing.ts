import { Particle } from "../../lib/main";
import { Simulation } from "../../lib/simulation";

const fps = 60;
const interval = Math.floor(1000 / fps);

class Sketch extends HTMLElement {
  // canvas
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  // timing
  scale: number;
  startTime: number;
  previousTime: number;
  currentTime: number;
  deltaTime: number;
  // interaction
  mouseDown: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
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
    this.scale = scale;
    this.canvas = root.querySelector('canvas')!;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.width = width * scale;
    this.canvas.height = height * scale;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(scale, scale);

    this.startTime = performance.now();
    this.previousTime = this.startTime;
    this.currentTime = 0;
    this.deltaTime = 0;

    this.mouseDown = false;
  }

  connectedCallback() {
    this.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.canvas.addEventListener('pointermove', this.onPointerMove.bind(this));
    this.canvas.addEventListener('pointerup', this.onPointerUp.bind(this));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    requestAnimationFrame(this.update)
  }

  onPointerDown(e: PointerEvent) {
    this.mouseDown = true;
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
    this.canvas.setPointerCapture(e.pointerId);
  }

  onPointerMove(e: PointerEvent) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  }

  onPointerUp(e: PointerEvent) {
    this.mouseDown = false;
    this.canvas.releasePointerCapture(e.pointerId);
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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const drawParticle = (
  particle: Particle,
  ctx: CanvasRenderingContext2D,
  radius: number = 2,
  fill: string = "black",
  stroke: string = "none"
) => {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.arc(particle.pos.x, particle.pos.y, radius, 0, 2 * Math.PI);
  if (fill !== "none") ctx.fill();
  if (stroke !== "none") ctx.stroke();
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
    if (simulation.particles[i].pinned) {
      drawParticle(simulation.particles[i], ctx, 4, "red");
    } else {
      drawParticle(simulation.particles[i], ctx);
    }

  }
}

export { Sketch, drawSimulation, drawParticle }