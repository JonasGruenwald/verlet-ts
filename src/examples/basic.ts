import { Constraint, DistanceConstraint, Particle, Vec2 } from '../../lib/main';
import { Sketch } from '../utils/drawing';

const lineSegments = (points: Vec2[], stiffness: number) => {
  const constraints: Constraint[] = [];
  const particles: Particle[] = [];
  points.forEach((point, i) => {
    particles.push(new Particle(point));
    if (i > 0) {
      constraints.push(new DistanceConstraint(particles[i], particles[i - 1], stiffness));
    }
  })
  return { particles, constraints };
}

const tire = (origin: Vec2, radius: number, segments: number, spokeStiffness: number, treadStiffness: number) => {
  const constraints: Constraint[] = [];
  const particles: Particle[] = [];
  const stride = (2 * Math.PI) / segments;
  for (let i = 0; i < segments; ++i) {
    const theta = i * stride;
    particles.push(new Particle(new Vec2(origin.x + Math.cos(theta) * radius, origin.y + Math.sin(theta) * radius)));
  }

  const center = new Particle(origin);
  particles.push(center);
  // constraints
  for (let i = 0; i < segments; ++i) {
    constraints.push(new DistanceConstraint(particles[i], particles[(i + 1) % segments], treadStiffness));
    constraints.push(new DistanceConstraint(particles[i], center, spokeStiffness))
    constraints.push(new DistanceConstraint(particles[i], particles[(i + 5) % segments], treadStiffness));
  }

  return { particles, constraints };
}

class BasicExample extends Sketch {
  constructor() {
    super(1000, 600, "Basic Example");

    // Simple line
    const shape = lineSegments([new Vec2(20, 10), new Vec2(40, 10), new Vec2(60, 10), new Vec2(80, 10), new Vec2(100, 10)], 0.02)
    shape.particles[0].pin();
    shape.particles[shape.particles.length - 1].pin();
    this.simulation.add(shape);

    // tires
    this.simulation.add(tire(new Vec2(200, 50), 50, 30, 0.3, 0.9))
    this.simulation.add(tire(new Vec2(400, 50), 70, 7, 0.1, 0.2))
    this.simulation.add(tire(new Vec2(600, 50), 70, 3, 1, 1))
  }
}

customElements.define('basic-example', BasicExample);