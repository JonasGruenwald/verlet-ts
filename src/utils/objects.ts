import { Constraint, DistanceConstraint } from "../../lib/constraint";
import { Particle } from "../../lib/particle";
import { Vec2 } from "../../lib/vec2";

export const createLineSegments = (points: Vec2[], stiffness: number) => {
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

export const tire = (origin: Vec2, radius: number, segments: number, spokeStiffness: number, treadStiffness: number) => {
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