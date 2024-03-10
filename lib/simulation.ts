import type { Constraint } from "./constraint";
import { Particle } from "./particle";
import { Vec2 } from "./vec2";

class Simulation {
  public width: number;
  public height: number;
  public particles: Particle[] = [];
  public constraints: Constraint[] = [];
  public gravity: Vec2;
  public friction: number;
  public groundFriction: number;

  constructor(
    width: number,
    height: number,
    gravity: Vec2 = new Vec2(0, 0.2),
    friction: number = 0.99,
    groundFriction: number = 0.8
  ) {
    this.width = width;
    this.height = height;
    this.gravity = gravity;
    this.friction = friction;
    this.groundFriction = groundFriction;
  }

  /**
   * Enforce the bounds of the simulation upon a particle
   * The particle position is mutated to stay within the bounds
   * @param particle 
   */
  enforceBounds(particle: Particle) {
    if (particle.pos.x < 0) {
      particle.pos.x = 0;
    } else if (particle.pos.x > this.width) {
      particle.pos.x = this.width;
    }

    if (particle.pos.y < 0) {
      particle.pos.y = 0;
    } else if (particle.pos.y > this.height) {
      particle.pos.y = this.height;
    }
  }

  update(steps: number = 1) {

  }
}

export { Simulation }