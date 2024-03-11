/**
 * A 2D vector class and a set of functions for working with 2D vectors.
 * Class methods allow mutation of the vector and are chainable, while the functions return new vectors.
 */

class Vec2 {
  public x: number;
  public y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  // Mutable setters
  public add(v: Vec2): Vec2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public sub(v: Vec2): Vec2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public mul(v: Vec2): Vec2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public div(v: Vec2): Vec2 {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  public normalize(): Vec2 {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }

  // Getters
  public scale(s: number): Vec2 {
    this.x *= s;
    this.y *= s;
    return this;
  }

  public equals(v: Vec2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  public equalsRoughly(v: Vec2, tolerance: number): boolean {
    return Math.abs(this.x - v.x) < tolerance && Math.abs(this.y - v.y) < tolerance;
  }

  public length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public dist(v: Vec2): number {
    return Math.sqrt(this.distSquared(v));
  }

  public distSquared(v: Vec2): number {
    return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
  }

  public dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }

  public angle(v: Vec2): number {
    return Math.atan2(this.x * v.y - this.y * v.x, this.x * v.x + this.y * v.y);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

// Immutable operations that return new vectors or create vectors in intermediate calculations
const add = (a: Vec2, b: Vec2): Vec2 => new Vec2(a.x + b.x, a.y + b.y);
const sub = (a: Vec2, b: Vec2): Vec2 => new Vec2(a.x - b.x, a.y - b.y);
const mul = (a: Vec2, b: Vec2): Vec2 => new Vec2(a.x * b.x, a.y * b.y);
const div = (a: Vec2, b: Vec2): Vec2 => new Vec2(a.x / b.x, a.y / b.y);
const scale = (v: Vec2, s: number): Vec2 => new Vec2(v.x * s, v.y * s);
const normalize = (v: Vec2): Vec2 => {
  const length = v.length();
  return new Vec2(v.x / length, v.y / length);
}
const relativeAngle = (target: Vec2, left: Vec2, right: Vec2): number => sub(left, target).angle(sub(right, target));
const rotate = (v: Vec2, origin: Vec2, angle: number): Vec2 => {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const x = v.x - origin.x;
  const y = v.y - origin.y;
  return new Vec2(x * c - y * s + origin.x, x * s + y * c + origin.y);
}
const clone = (v: Vec2): Vec2 => new Vec2(v.x, v.y);
export { Vec2, add, sub, mul, div, scale, normalize, relativeAngle, rotate, clone };