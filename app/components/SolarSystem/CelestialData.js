
class CelestialData {

  constructor(canvas) {
    this.canvas = canvas;
  }

  baseBody() {
    return {
      radius: 1,
      x: 0,
      y: 0,
      fillStyle: 'white',
      lineWidth: 0,
      strokeStyle: 'white',
    };
  }

  baseOrbit() {
    return {
      radius: 1,
      x: 0,
      y: 0,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }

  sun() {
    return {
      radius: 50,
      x: 100,
      y: 120,
      fillStyle: 'orange',
    };
  }

  mercury() {
    return {
      radius: 5,
      x: 100,
      y: 20,
      fillStyle: 'red',
      rotationRatio: 1,
    };
  }

  mercuryOrbit() {
    return {
      radius: 100,
      x: 100,
      y: 120,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }

  venus() {
    return {
      radius: 10,
      x: 100,
      y: 20,
      fillStyle: 'purple',
      rotationRatio: 0.5,
    };
  }

  venusOrbit() {
    return {
      radius: 120,
      x: 100,
      y: 120,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }
}

export default CelestialData;
