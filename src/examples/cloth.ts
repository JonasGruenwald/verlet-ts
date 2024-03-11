import { DistanceConstraint, Particle, Vec2, Constraint } from '../../lib/main';
import { Sketch } from '../utils/drawing';

const cloth = (origin: Vec2, width: number, height: number, segments: number, pinMod: number, stiffness: number) => {
  const particles: Particle[] = []
  const constraints: Constraint[] = []
  const xStride = width / segments;
  const yStride = height / segments;
  for (let y = 0; y < segments; ++y) {
    for (let x = 0; x < segments; ++x) {
      var px = origin.x + x * xStride - width / 2 + xStride / 2;
      var py = origin.y + y * yStride - height / 2 + yStride / 2;
      const particle = new Particle(new Vec2(px, py))
      particles.push(particle);
      if (y === 0 &&  x % pinMod == 0) particle.pin();
      if (x > 0)
        constraints.push(new DistanceConstraint(particles[y * segments + x], particles[y * segments + x - 1], stiffness));
      if (y > 0)
        constraints.push(new DistanceConstraint(particles[y * segments + x], particles[(y - 1) * segments + x], stiffness));
    }
  }
  return { particles, constraints };
}

class ClothExample extends Sketch {
  draggedParticle: Particle | null = null;
  hoveredParticle: Particle | null = null;
  constructor() {
    const width = 1000;
    const height = 600;
    super(width, height, "Cloth Example");
    const min = Math.min(width, height) * 0.5;
    const segments = 20;
    this.simulation.add(cloth(new Vec2(width / 2, height / 3), min, min, segments, 6, 0.9));
  }
}

customElements.define('cloth-example', ClothExample);