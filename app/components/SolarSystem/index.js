import React from 'react';
//  import { FormattedMessage } from 'react-intl';

const baseOrbitData = () => {
  return {
    radius: 1,
    x: 0,
    y: 0,
    strokeStyle: 'white',
    lineWidth: 1,
  };
};

const mercuryBaseOribitData = () => {
  return {
    radius: 100,
    x: 100,
    y: 120,
    strokeStyle: 'red',
    lineWidth: 1,
  };
};

const baseBodyData = () => {
  return {
    radius: 1,
    x: 0,
    y: 0,
    fillStyle: 'white',
    lineWidth: 0,
    strokeStyle: 'white'
  };
};

const sunBaseData = () => {
  return {
    radius: 50,
    x: 100,
    y: 120,
    fillStyle: 'orange'
  };
};

const mercuryBaseData = () => {
  return {
    radius: 5,
    x: 100,
    y: 20,
    fillStyle: 'red'
  };
};

class SolarSystem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.starting = this.starting.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.canvasBase = this.canvasBase.bind(this);
    this.drawCelestialBody = this.drawCelestialBody.bind(this);
    this.moveSystem = this.moveSystem.bind(this);
    this.updateSystem = this.updateSystem.bind(this);
    this.state = {
      cycle: null,
      context: null,
      sun: sunBaseData(),
      mercury: mercuryBaseData(),
      mercuryOrbit: mercuryBaseOribitData(),
      mercuryAngle: 0
    };
  }

  componentDidMount() {
    this.setState({ context: this.canvas.getContext('2d') });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.context !== this.state.context) {
      this.starting();
      this.moveSystem();
    }
  }

  drawCelestialBody(data) {
    const { context } = this.state;
    const properties = Object.assign(baseBodyData(), data);
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
    const { context } = this.state;
    const properties = Object.assign(baseOrbitData(), data);
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
    //  this.canvas.style.height = '100vh';
    this.canvas.style.background = 'black';
  }

  starting() {
    this.canvasBase();
    this.updateSystem();
  }

  moveSystem() {
    clearInterval(this.state.cycle);
    if (this.context !== null) {
      this.setState((prevState, props) => {
        const angle = (prevState.mercuryAngle == 360) ? 0 : prevState.mercuryAngle + 1;
        const newMercury = {
          x: (prevState.mercuryOrbit.radius * Math.cos(angle * (Math.PI / 180))) + prevState.mercuryOrbit.x,
          y: (prevState.mercuryOrbit.radius * Math.sin(angle * (Math.PI / 180))) + prevState.mercuryOrbit.y
        };
        return {
          mercuryAngle: angle,
          mercury: Object.assign(prevState.mercury, newMercury)
        };
      });
      this.updateSystem();
    }
    this.state.cycle = setInterval(this.moveSystem, 10);
  }

  clearCanvas() {
    this.state.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateSystem() {
    this.clearCanvas();
    this.drawCelestialBody(this.state.sun);
    this.drawCelestialBody(this.state.mercury);
    this.drawOrbit(this.state.mercuryOrbit);
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }}></canvas>
    );
  }
}

export default SolarSystem;
