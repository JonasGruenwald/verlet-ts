import { Constraint, DistanceConstraint } from "./constraint";
import { Particle } from "./particle";
import { Vec2 } from "./vec2";

export const createLineSegments = (points: Vec2[], stiffness: number) => {
  const constraints : Constraint[] = [];
  const particles : Particle[] = [];
  points.forEach((point, i) => {
    particles.push(new Particle(point));
    if (i > 0) {
      constraints.push(new DistanceConstraint(particles[i], particles[i - 1], stiffness));
    }
  })
  return { particles, constraints };
}