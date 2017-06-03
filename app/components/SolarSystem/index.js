import React, { PropTypes } from 'react';
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
      scaleRate: 1,
      cycle: null,
      sun: null,
      mercury: null,
      mercuryOrbit: null,
      mercuryAngle: 0,
      venus: null,
      venusOrbit: null,
      venusAngle: 0,
      earth: null,
      earthOrbit: null,
      earthAngle: 0,
    };
  }

  componentDidMount() {
    this.canvasBase();
    const celestialData = new CelestialData(this.canvas);
    this.props.setCelestialData(this.canvas, this.canvas.getContext('2d'), celestialData);
    this.setState(() => ({
      celestialData,
      sun: celestialData.sun(),
      mercury: celestialData.mercury(),
      mercuryOrbit: celestialData.mercuryOrbit(),
      venus: celestialData.venus(),
      venusOrbit: celestialData.venusOrbit(),
      earth: celestialData.earth(),
      earthOrbit: celestialData.earthOrbit(),
    }));
  }

  componentDidUpdate(prevProps) {
    const { context } = this.props;
    if (prevProps.context !== context) {
      this.starting();
      this.moveSystem();
    }
    /* if (prevProps.scale !== scale) {
      const newScale = scale / prevProps.scale * this.state.scaleRate;
      context.scale(newScale, newScale);
    } */
  }

  drawCelestialBody(data) {
    const { celestialData } = this.state;
    const { context } = this.props;
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

  canvasBase() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = '500';
    this.canvas.style.background = 'black';
  }

  starting() {
    //  this.props.context.scale(1, 2);
    this.updateSystem();
  }

  clearCanvas() {
    this.props.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  moveSystem() {
    clearInterval(this.state.cycle);
    if (this.context !== null) {
      this.updateCelestialBody('mercury');
      this.updateCelestialBody('venus');
      this.updateCelestialBody('earth');
      this.updateSystem();
    }
    this.state.cycle = setInterval(this.moveSystem, 10);
  }

  drawOrbit(data) {
    const { celestialData } = this.state;
    const { context } = this.props;
    const properties = Object.assign(celestialData.baseOrbit(), data);
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.strokeStyle = properties.strokeStyle;
    context.lineWidth = properties.lineWidth;
    context.beginPath();
    context.arc(properties.x, properties.y, properties.radius, startAngle, endAngle, true);
    context.stroke();
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
    this.drawOrbit(this.state.earthOrbit);
    this.drawCelestialBody(this.state.earth);
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }}></canvas>
    );
  }
}

SolarSystem.propTypes = {
  setCelestialData: PropTypes.func.isRequired,
  context: PropTypes.object,
  /* scale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]), */
};

export default SolarSystem;
