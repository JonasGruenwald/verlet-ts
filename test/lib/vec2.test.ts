import { expect, describe, it } from 'vitest';
import { Vec2, add, sub, mul, div, scale, normalize, relativeAngle, rotate } from '../../lib/vec2';

describe('Vec2', () => {
  it('Vec2 constructor should construct a vector with the given x and y values', () => {
    const v = new Vec2(1, 2);
    expect(v.x).to.equal(1);
    expect(v.y).to.equal(2);
  });

  it('Vec2.add should add another vector', () => {
    const v = new Vec2(1, 2);
    v.add(new Vec2(3, 4));
    expect(v.x).to.equal(4);
    expect(v.y).to.equal(6);
  });

  it('Vec2.sub should subtract another vector', () => {
    const v = new Vec2(1, 2);
    v.sub(new Vec2(3, 4));
    expect(v.x).to.equal(-2);
    expect(v.y).to.equal(-2);
  });

  it('Vec2.mul should multiply by another vector', () => {
    const v = new Vec2(1, 2);
    v.mul(new Vec2(3, 4));
    expect(v.x).to.equal(3);
    expect(v.y).to.equal(8);
  });

  it('Vec2.div should divide by another vector', () => {
    const v = new Vec2(1, 2);
    v.div(new Vec2(3, 4));
    expect(v.x).to.equal(1 / 3);
    expect(v.y).to.equal(0.5);
  });

  it('Vec2.scale should scale by a scalar', () => {
    const v = new Vec2(1, 2);
    v.scale(3);
    expect(v.x).to.equal(3);
    expect(v.y).to.equal(6);
  });

  it('Vec2.equals should check for equality with another vector', () => {
    const v = new Vec2(1, 2);
    expect(v.equals(new Vec2(1, 2))).to.be.true;
    expect(v.equals(new Vec2(2, 1))).to.be.false;
  });

  it('Vec2.equalsRoughly should check for rough equality with another vector', () => {
    const v = new Vec2(1, 2);
    expect(v.equalsRoughly(new Vec2(1.01, 2.01), 0.02)).to.be.true;
    expect(v.equalsRoughly(new Vec2(1.1, 2.1), 0.02)).to.be.false;
  });

  it('Vec2.length should calculate its length', () => {
    const v = new Vec2(3, 4);
    expect(v.length()).to.equal(5);
  });

  it('Vec2.lengthSquared should calculate its length squared', () => {
    const v = new Vec2(3, 4);
    expect(v.lengthSquared()).to.equal(25);
  });

  it('Vec2.normalize should normalize the vector', () => {
    const v = new Vec2(3, 4);
    v.normalize();
    expect(Math.abs(v.length() - 1.0) <= 0.00001).to.be.true;
  });

  it('Vec2.dist should calculate the distance to another vector', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(4, 6);
    expect(v1.dist(v2)).to.equal(5);
  });

  it('Vec2.distSquared should calculate the squared distance to another vector', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(4, 6);
    expect(v1.distSquared(v2)).to.equal(25);
  });

  it('Vec2.dot should calculate the dot product with another vector', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 4);
    expect(v1.dot(v2)).to.equal(11);
  });

  it('Vec2.angle should calculate the angle with another vector', () => {
    const v1 = new Vec2(1, 0);
    const v2 = new Vec2(0, 1);
    expect(v1.angle(v2)).to.equal(Math.PI / 2);
  });

  it('Vec2.toString should return a string representation of the vector', () => {
    const v = new Vec2(1, 2);
    expect(v.toString()).to.equal('(1, 2)');
  });
});

describe('Vector functions', () => {
  it('add should add two vectors', () => {
    const v = add(new Vec2(1, 2), new Vec2(3, 4));
    expect(v.x).to.equal(4);
    expect(v.y).to.equal(6);
  });

  it('sub should subtract two vectors', () => {
    const v = sub(new Vec2(1, 2), new Vec2(3, 4));
    expect(v.x).to.equal(-2);
    expect(v.y).to.equal(-2);
  });

  it('mul should multiply two vectors', () => {
    const v = mul(new Vec2(1, 2), new Vec2(3, 4));
    expect(v.x).to.equal(3);
    expect(v.y).to.equal(8);
  });

  it('div should divide two vectors', () => {
    const v = div(new Vec2(1, 2), new Vec2(3, 4));
    expect(v.x).to.equal(1 / 3);
    expect(v.y).to.equal(0.5);
  });

  it('scale should scale a vector by a scalar', () => {
    const v = scale(new Vec2(1, 2), 3);
    expect(v.x).to.equal(3);
    expect(v.y).to.equal(6);
  });

  it('normalize should normalize a vector', () => {
    const normal = normalize(new Vec2(2, 4));
    expect(Math.abs(normal.length() - 1.0) <= 0.00001).to.be.true;
    expect(normal.equalsRoughly(new Vec2(0.4472, 0.89443), 0.0001))
  })

  it('relativeAngle should calculate the angle between two vectors relative to a third', () => {
    const a = new Vec2(1, 1);
    const b = new Vec2(1, 0);
    const c = new Vec2(2, 1);
    const result = relativeAngle(a, b, c);
    expect(result * (180 / Math.PI)).to.equal(90);
  })

  it('rotate should rotate a vector around an origin', () => {
    const v = rotate(new Vec2(2, 0), new Vec2(1, 0), Math.PI / 2);
    expect(v.equals(new Vec2(1, 1))).to.be.true;
  })
});