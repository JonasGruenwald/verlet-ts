import { Particle } from "./particle";
import { sub } from "./vec2";

interface Constraint {
  update: (speed: number) => void;
  p1: Particle;
  p2?: Particle;
}

class DistanceConstraint implements Constraint {
  public p1: Particle;
  public p2: Particle;
  public stiffness: number;
  public distance: number;

  constructor(p1: Particle, p2: Particle, stiffness: number, distance?: number) {
    this.p1 = p1;
    this.p2 = p2;
    this.stiffness = stiffness;
    this.distance = distance || sub(p1.pos, p2.pos).length();
  }

  update(speed: number) {
    const normal = sub(this.p1.pos, this.p2.pos);
    const m = normal.lengthSquared();
    normal.scale(((this.distance * this.distance - m) / m) * this.stiffness * speed);
    if (!this.p1.pinned) this.p1.pos.add(normal);
    if (!this.p2.pinned) this.p2.pos.sub(normal);
  }
}

export type { Constraint }
export { DistanceConstraint }