import type { Constraint } from "./constraint";
import { Particle } from "./particle";
import { Vec2, sub } from "./vec2";

class Simulation {
  public width: number;
  public height: number;
  public particles: Particle[] = [];
  public constraints: Constraint[] = [];
  public gravity: Vec2;
  public friction: number;
  public groundFriction: number;
  public minX: number = 0;
  public minY: number = 0;
  public maxX: number;
  public maxY: number;
  public noBounds: boolean = false;

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
    this.maxX = width;
    this.maxY = height;
  }

  /**
   * Shorthand to instantiate a particle and immediately add it to the simulation.
   * The particle is returned.
   * @param x 
   * @param y 
   * @param pinned 
   * @returns Particle
   */
  addParticle(x: number, y: number, pinned: boolean = false) {
    const p = new Particle(new Vec2(x, y), pinned);
    this.particles.push(p);
    return p;
  }

  /**
   * Enforce the bounds of the simulation upon a particle
   * The particle position is mutated to stay within the bounds
   * @param particle 
   */
  enforceBounds(particle: Particle) {
    if (particle.pos.x < this.minX) {
      particle.pos.x = this.minX;
    } else if (particle.pos.x > this.maxX) {
      particle.pos.x = this.maxX;
    }

    if (particle.pos.y < this.minY) {
      particle.pos.y = this.minY;
    } else if (particle.pos.y > this.maxY) {
      particle.pos.y = this.maxY;
    }
  }

  /**
   * Enforce the bounds of the simulation upon all particles
   */
  enforceAllBounds() {
    for (let p = 0; p < this.particles.length; p++) {
      this.enforceBounds(this.particles[p]);
    }
  }

  /**
   * Update the simulation state,
   * The supplied number of steps is used to evaluate the constraints
   * @param steps 
   */
  update(steps: number = 1) {
    for (let p = 0; p < this.particles.length; p++) {
      if (this.particles[p].pinned) {
        continue;
      }

      const { pos, lastPos } = this.particles[p];
      console.log(pos, lastPos);

      const velocity = sub(this.particles[p].pos, this.particles[p].lastPos).scale(this.friction);

      // ground friction
      if (this.particles[p].pos.y >= this.height - 1 && velocity.lengthSquared() > 0.000001) {
        const m = velocity.length();
        velocity.x /= m;
        velocity.y /= m;
        velocity.scale(m * this.groundFriction);
      }

      // save last position
      this.particles[p].lastPos.x = this.particles[p].pos.x;
      this.particles[p].lastPos.y = this.particles[p].pos.y;

      // gravity
      this.particles[p].pos.add(this.gravity);

      // inertia
      this.particles[p].pos.add(velocity);
    }

    // evaluate constraints (relax)
    const speed = 1 / steps
    for (let i = 0; i < steps; i++) {
      for (let c = 0; c < this.constraints.length; c++) {
        // the constraints are responsible for updating the particles
        this.constraints[c].update(speed);
      }
    }

    if (!this.noBounds) {
      this.enforceAllBounds();
    }
  }

  /**
   * Get the nearest particle to a given position, within a maximum distance.
   * Convenience for implementing interaction with the simulation.
   * @param x 
   * @param y 
   * @param maxDistanceSquared 
   * @returns 
   */
  getNearestParticle(x: number, y: number, maxDistanceSquared: number = 100) {
    const target = new Vec2(x, y);
    let minDistSquared = maxDistanceSquared;
    let nearest = null;
    for (let p = 0; p < this.particles.length; p++) {
      const distanceSquared = this.particles[p].pos.distSquared(target);
      if (distanceSquared < minDistSquared) {
        minDistSquared = distanceSquared;
        nearest = this.particles[p];
      }
    }
    return nearest;
  }

  /**
   * Convenience method to bulk add particles and constraints to the simulation
   * @param data { particles: Particle[], constraints: Constraint[] }
   */
  add = ({ particles, constraints }: { particles: Particle[], constraints: Constraint[] }) => {
    this.particles.push(...particles);
    this.constraints.push(...constraints);
  }
}

export { Simulation }