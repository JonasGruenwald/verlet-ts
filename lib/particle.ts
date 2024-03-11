import { Vec2, clone } from "./vec2";

class Particle {
  pos: Vec2;
  lastPos: Vec2;
  pinned: boolean;
  constructor(pos: Vec2, pinned: boolean = false) {
    this.pos = pos;
    this.lastPos = clone(pos);
    this.pinned = pinned;
  }

  pin() {
    this.pinned = true;
    this.lastPos = this.pos;
  }

  unpin() {
    this.pinned = false;
  }
}

export { Particle }