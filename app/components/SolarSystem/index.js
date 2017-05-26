import React from 'react';
import CelestialData from './CelestialData';
//  import { FormattedMessage } from 'react-intl';

class SolarSystem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.celestialData = null;
    this.starting = this.starting.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.canvasBase = this.canvasBase.bind(this);
    this.drawCelestialBody = this.drawCelestialBody.bind(this);
    this.updateCelestialBody = this.updateCelestialBody.bind(this);
    this.moveSystem = this.moveSystem.bind(this);
    this.updateSystem = this.updateSystem.bind(this);
    this.state = {
      cycle: null,
      context: null,
      sun: null,
      mercury: null,
      mercuryOrbit: null,
      mercuryAngle: 0,
      venus: null,
      venusOrbit: null,
      venusAngle: 0,
    };
  }

  componentDidMount() {
    const celestialData = new CelestialData(this.canvas);
    this.setState(() => ({
      context: this.canvas.getContext('2d'),
      celestialData,
      sun: celestialData.sun(),
      mercury: celestialData.mercury(),
      mercuryOrbit: celestialData.mercuryOrbit(),
      venus: celestialData.venus(),
      venusOrbit: celestialData.venusOrbit(),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.context !== this.state.context) {
      this.starting();
      this.moveSystem();
    }
  }

  drawCelestialBody(data) {
    const { context, celestialData } = this.state;
    const properties = Object.assign(celestialData.baseBody(), data);
    context.beginPath();
    context.arc(properties.x, properties.y, properties.radius, 0, 2 * Math.PI, false);
    context.fillStyle = properties.fillStyle;
    context.fill();
    if (properties.lineWidth > 0) {
      context.lineWidth = properties.lineWidth;
      context.strokeStyle = properties.strokeStyle;
      context.stroke();
    }
  }

  drawOrbit(data) {
    const { context, celestialData } = this.state;
    const properties = Object.assign(celestialData.baseOrbit(), data);
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.strokeStyle = properties.strokeStyle;
    context.lineWidth = properties.lineWidth;
    context.beginPath();
    context.arc(properties.x, properties.y, properties.radius, startAngle, endAngle, true);
    context.stroke();
  }

  canvasBase() {
    this.canvas.style.width = '100%';
    this.canvas.style.background = 'black';
  }

  starting() {
    this.canvasBase();
    this.updateSystem();
  }

  moveSystem() {
    clearInterval(this.state.cycle);
    if (this.context !== null) {
      this.updateCelestialBody('mercury');
      this.updateCelestialBody('venus');
      this.updateSystem();
    }
    this.state.cycle = setInterval(this.moveSystem, 10);
  }

  clearCanvas() {
    this.state.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateCelestialBody(planet) {
    this.setState((prevState) => {
      const angle = (prevState[`${planet}Angle`] >= 360) ? 0 : prevState[`${planet}Angle`] + prevState[planet].rotationRatio;
      const newBody = {
        x: (prevState[`${planet}Orbit`].radius * Math.cos(angle * (Math.PI / 180))) + prevState[`${planet}Orbit`].x,
        y: (prevState[`${planet}Orbit`].radius * Math.sin(angle * (Math.PI / 180))) + prevState[`${planet}Orbit`].y,
      };
      return {
        [`${planet}Angle`]: angle,
        [planet]: Object.assign(prevState[planet], newBody),
      };
    });
  }

  updateSystem() {
    this.clearCanvas();
    this.drawCelestialBody(this.state.sun);
    this.drawOrbit(this.state.mercuryOrbit);
    this.drawCelestialBody(this.state.mercury);
    this.drawOrbit(this.state.venusOrbit);
    this.drawCelestialBody(this.state.venus);
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }}></canvas>
    );
  }
}

export default SolarSystem;
