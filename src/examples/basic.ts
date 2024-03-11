import { Particle, Simulation, Vec2 } from '../../lib/main';
import { Sketch, drawParticle, drawSimulation } from '../utils/drawing';
import { createLineSegments } from '../utils/objects';

class BasicExample extends Sketch {
  simulation: Simulation;
  draggedParticle: Particle | null = null;
  hoveredParticle: Particle | null = null;
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

  draw() {
    super.draw()
    this.simulation.update(50);
    drawSimulation(this.simulation, this.ctx);

    this.ctx.lineWidth = 1;

    if (this.hoveredParticle) {
      drawParticle(this.hoveredParticle, this.ctx, 5, "none", "grey");
    }
    if (this.draggedParticle) {
      this.draggedParticle.pos.x = this.mouseX;
      this.draggedParticle.pos.y = this.mouseY;
      drawParticle(this.draggedParticle, this.ctx, 5, "none", "blue");
    }
  }

  onMouseMove(e: MouseEvent): void {
    super.onMouseMove(e);
    this.hoveredParticle = this.simulation.getNearestParticle(this.mouseX, this.mouseY, 100);
  }

  onMouseDown(e: MouseEvent) {
    super.onMouseDown(e);
    this.draggedParticle = this.simulation.getNearestParticle(this.mouseX, this.mouseY, 100);
    if (this.draggedParticle?.pinned) {
      this.draggedParticle = null;
    }
  }

  onMouseUp(): void {
    super.onMouseUp();
    this.draggedParticle = null;
    this.hoveredParticle = null;
  }
}

customElements.define('basic-example', BasicExample);