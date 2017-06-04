
class CelestialData {

  constructor(canvas) {
    this.canvas = canvas;
    this.centerWidth = canvas.width / 2;
    this.centerHeight = canvas.height / 2;
    this.planets = [
      'mercury',
      'venus',
      'earth',
      'mars',
    ];
  }

  getPlanets() {
    return this.planets;
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
      x: this.centerWidth,
      y: this.centerHeight,
      fillStyle: 'orange',
    };
  }

  mercury() {
    return {
      radius: 4.880,
      x: this.centerWidth,
      y: this.centerHeight - 70,
      fillStyle: '#faf6f3',
      rotationRatio: 4.15283,
    };
  }

  mercuryOrbit() {
    return {
      radius: 100,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }

  venus() {
    return {
      radius: 12.104,
      x: this.centerWidth,
      y: this.centerHeight - 120,
      fillStyle: '#d05301',
      rotationRatio: 1.62549,
    };
  }

  venusOrbit() {
    return {
      radius: 120,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }

  earth() {
    return {
      radius: 12.756,
      x: this.centerWidth,
      y: this.centerHeight - 140,
      fillStyle: '#5dce36',
      rotationRatio: 1,
    };
  }

  earthOrbit() {
    return {
      radius: 140,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }

  mars() {
    return {
      radius: 6.794,
      x: this.centerWidth,
      y: this.centerHeight - 160,
      fillStyle: '#d21102',
      rotationRatio: 0.53167,
    };
  }

  marsOrbit() {
    return {
      radius: 160,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 1,
    };
  }
}

export default CelestialData;
