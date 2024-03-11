import { Sketch, drawSimulation } from '../utils/drawing';
import { Simulation, createLineSegments, Vec2 } from '../../lib/main';

class BasicExample extends Sketch {
  simulation: Simulation;
  constructor() {
    super(400, 400, "Basic Example");
    this.simulation = new Simulation(400, 400);
    const { particles, constraints } = createLineSegments([new Vec2(20, 10), new Vec2(40, 10), new Vec2(60, 10), new Vec2(80, 10), new Vec2(100, 10)], 0.02)
    particles[0].pin();
    particles[particles.length - 1].pin();
    this.simulation.particles.push(...particles);
    this.simulation.constraints.push(...constraints);
    this.simulation.friction = 1
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.simulation.update(50);
    drawSimulation(this.simulation, this.ctx);
  }
}

customElements.define('basic-example', BasicExample);