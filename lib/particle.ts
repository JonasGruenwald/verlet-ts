import { Vec2 } from "./vec2";

class Particle {
  pos: Vec2;
  lastPos: Vec2;
  pinned: boolean;
  constructor(pos: Vec2, pinned: boolean = false) {
    this.pos = pos;
    this.lastPos = pos;
    this.pinned = pinned;
  }    
}

export { Particle }