import React, { PropTypes } from 'react';
//  import { FormattedMessage } from 'react-intl';

class SolarSystem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.starting = this.starting.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.canvasBase = this.canvasBase.bind(this);
    this.drawCelestialBody = this.drawCelestialBody.bind(this);
    this.moveSystem = this.moveSystem.bind(this);
    this.updateSystem = this.updateSystem.bind(this);
    this.resize = this.resize.bind(this);
    this.state = {
      cycle: null,
    };
  }

  componentDidMount() {
    this.canvasBase();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate(prevProps) {
    const { context, scale } = this.props;
    if (prevProps.context !== context) {
      this.starting();
      this.moveSystem();
    }
    if (prevProps.scale !== scale) {
      const newScale = prevProps.scale / scale;
      context.scale(newScale, newScale);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.props.setCelestialData(this.canvas, this.canvas.getContext('2d'));
  }

  canvasBase() {
    this.resize();
    this.canvas.style.background = 'black';
  }

  starting() {
    this.props.context.scale(1 / this.props.scale, 1 / this.props.scale);
    this.updateSystem();
  }

  clearCanvas() {
    this.props.context.clearRect(0, 0, this.canvas.width * this.props.scale, this.canvas.height * this.props.scale);
  }

  moveSystem() {
    clearInterval(this.state.cycle);
    if (this.context !== null) {
      const planets = this.props.celestialData.getPlanets();
      planets.map((planet) => this.props.updatePlanetPosition(planet));
      this.updateSystem();
    }
    this.props.yearsElapsed();
    this.state.cycle = setInterval(this.moveSystem, 10);
  }

  drawCelestialBody(data) {
    const {
      context,
      celestialData,
      hPosition,
      vPosition,
    } = this.props;
    const properties = Object.assign(celestialData.baseBody(), data);
    context.beginPath();
    context.arc(properties.x + hPosition, properties.y + vPosition, properties.radius, 0, 2 * Math.PI, false);
    context.fillStyle = properties.fillStyle;
    context.fill();
    if (properties.lineWidth > 0) {
      context.lineWidth = properties.lineWidth;
      context.strokeStyle = properties.strokeStyle;
      context.stroke();
    }
  }

  drawOrbit(data) {
    const {
      context,
      celestialData,
      hPosition,
      vPosition,
    } = this.props;
    const properties = Object.assign(celestialData.baseOrbit(), data);
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.strokeStyle = properties.strokeStyle;
    context.lineWidth = properties.lineWidth;
    context.beginPath();
    context.arc(properties.x + hPosition, properties.y + vPosition, properties.radius, startAngle, endAngle, true);
    context.stroke();
  }

  updateSystem() {
    const { positions } = this.props;
    this.clearCanvas();
    this.drawCelestialBody(positions.sun);
    const planets = this.props.celestialData.getPlanets();
    planets.map((planet) => {
      this.drawOrbit(positions[`${planet}Orbit`]);
      return this.drawCelestialBody(positions[planet]);
    });
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }}></canvas>
    );
  }
}

SolarSystem.propTypes = {
  setCelestialData: PropTypes.func.isRequired,
  updatePlanetPosition: PropTypes.func.isRequired,
  context: PropTypes.object,
  celestialData: PropTypes.object,
  positions: PropTypes.object,
  yearsElapsed: PropTypes.func,
  vPosition: PropTypes.number,
  hPosition: PropTypes.number,
  scale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SolarSystem;
