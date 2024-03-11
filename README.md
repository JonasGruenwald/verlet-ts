# Verlet TS

[![npm version](https://badge.fury.io/js/verlet-ts.svg)](https://badge.fury.io/js/verlet-ts)

This is a typescript adaptation of [verlet-js](https://github.com/subprotocol/verlet-js), with some modifications.

The goal is to provide a simple Verlet physics simulation that can be easily imported into various projects, without much overhead.

👉 [**Demo / Examples**](https://verlet-ts-demo.pages.dev/) 

## Features

* Built-in 2D Vector class
* Particles and Constraints for building a Simulation
* Can be used with any graphics library
* No dependencies

## Usage

```ts
import { Simulation, Vec2, Particle, DistanceConstraint } from 'verlet-ts';

// Create simulation
const simulation = new Simulation(500, 500);

// Create and add Particle
const p1 = new Particle(new Vec2(20, 10));
p1.pin() // freeze particle
simulation.particles.push(p1);

// Shorthand 
const p2 = simulation.addParticle(100, 10);

// Create and add constraint
const constraint = new DistanceConstraint(p1, p2, 0.05);
simulation.constraints.push(constraint);

// [..]
// In your update / drawing loop
simulation.update(25);

// Implement drawing logic by looping over simulation.particles
// Or keep track of particles in your own datastructures and draw from there.
```

## Architecture

Compared to verlet-js, this library has been reduced to include only the necessary functions for the physics simulation itself, there are no built-in drawing functions, no built-in helpers to construct objects and no built-in facilities to compose shapes. Some of these features have instead been moved to the examples as a reference.

### Project structure
* `/lib` – Library core
* `/src` – Entrypoint for **examples**
  * `/utils/objects.ts` – Object construction examples
  * `/utils/drawing.ts` – Drawing logic examples
  * `/examples/` – Example sketches