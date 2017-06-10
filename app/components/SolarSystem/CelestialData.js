
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
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'pluto',
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
      lineWidth: 0.8,
    };
  }

  sun() {
    return {
      radius: 139,
      x: this.centerWidth,
      y: this.centerHeight,
      fillStyle: 'orange',
    };
  }

  mercury() {
    return {
      radius: 4.880 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 196,
      fillStyle: '#faf6f3',
      rotationRatio: 4.15283,
    };
  }

  mercuryOrbit() {
    return {
      radius: 196,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  venus() {
    return {
      radius: 12.104 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 247,
      fillStyle: '#d05301',
      rotationRatio: 1.62549,
    };
  }

  venusOrbit() {
    return {
      radius: 247,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  earth() {
    return {
      radius: 12.756 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 285,
      fillStyle: '#5dce36',
      rotationRatio: 1,
    };
  }

  earthOrbit() {
    return {
      radius: 285,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  mars() {
    return {
      radius: 6.794 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 366,
      fillStyle: '#d21102',
      rotationRatio: 0.53167,
    };
  }

  marsOrbit() {
    return {
      radius: 366,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  jupiter() {
    return {
      radius: 142.984 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 917,
      fillStyle: '#944332',
      rotationRatio: 0.08432,
    };
  }

  jupiterOrbit() {
    return {
      radius: 917,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  saturn() {
    return {
      radius: 108.728 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 1568,
      fillStyle: '#fee4c1',
      rotationRatio: 0.03395,
    };
  }

  saturnOrbit() {
    return {
      radius: 1568,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  uranus() {
    return {
      radius: 51.118 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 3009,
      fillStyle: '#a3fbff',
      rotationRatio: 0.01191,
    };
  }

  uranusOrbit() {
    return {
      radius: 3009,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  neptune() {
    return {
      radius: 49.532 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 4644,
      fillStyle: '#3ba1e3',
      rotationRatio: 0.00601,
    };
  }

  neptuneOrbit() {
    return {
      radius: 4644,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }

  pluto() {
    return {
      radius: 2.320 / 2,
      x: this.centerWidth,
      y: this.centerHeight - 6073,
      fillStyle: '#ffffff',
      rotationRatio: 0.00403,
    };
  }

  plutoOrbit() {
    return {
      radius: 6073,
      x: this.centerWidth,
      y: this.centerHeight,
      strokeStyle: 'white',
      lineWidth: 0.8,
    };
  }
}

export default CelestialData;
