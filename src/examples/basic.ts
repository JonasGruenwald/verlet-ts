import { Particle, Simulation, Vec2 } from '../../lib/main';
import { Sketch, drawParticle, drawSimulation } from '../utils/drawing';
import { createLineSegments, tire } from '../utils/objects';

class BasicExample extends Sketch {
  simulation: Simulation;
  draggedParticle: Particle | null = null;
  hoveredParticle: Particle | null = null;
  constructor() {
    super(1000, 600, "Basic Example");
    this.simulation = new Simulation(1000, 600);

    // Simple line
    const shape = createLineSegments([new Vec2(20, 10), new Vec2(40, 10), new Vec2(60, 10), new Vec2(80, 10), new Vec2(100, 10)], 0.02)
    shape.particles[0].pin();
    shape.particles[shape.particles.length - 1].pin();
    this.simulation.add(shape);

    // tires
    this.simulation.add(tire(new Vec2(200, 50), 50, 30, 0.3, 0.9))
    this.simulation.add(tire(new Vec2(400,50), 70, 7, 0.1, 0.2))
    this.simulation.add(tire(new Vec2(600,50), 70, 3, 1, 1))
  }

  draw() {
    super.draw()
    this.simulation.update(50);
    drawSimulation(this.simulation, this.ctx);
    this.ctx.lineWidth = 1;
    this.hoveredParticle = this.simulation.getNearestParticle(this.mouseX, this.mouseY, 100);
    if (this.hoveredParticle) {
      drawParticle(this.hoveredParticle, this.ctx, 5, "none", "grey");
    }
    if (this.draggedParticle) {
      this.draggedParticle.pos.x = this.mouseX;
      this.draggedParticle.pos.y = this.mouseY;
      drawParticle(this.draggedParticle, this.ctx, 5, "none", "blue");
    }
  }

  onPointerDown(e: PointerEvent) {
    super.onPointerDown(e);
    this.draggedParticle = this.simulation.getNearestParticle(this.mouseX, this.mouseY, 100);
    if (this.draggedParticle?.pinned) {
      this.draggedParticle = null;
    }
  }

  onPointerUp(e: PointerEvent): void {
    super.onPointerUp(e);
    this.draggedParticle = null;
    this.hoveredParticle = null;
  }
}

customElements.define('basic-example', BasicExample);