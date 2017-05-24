import React from 'react';
//  import { FormattedMessage } from 'react-intl';

class SolarSystem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.starting = this.starting.bind(this);
    /* this.state = {
      context: null
    }; */
  }

  componentDidMount() {
    this.starting();
  }

  starting() {
    this.canvas.style.width = '100%';
    this.canvas.style.background = 'black';
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.rect(50, 70, 200, 50);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
    /* this.setState(() => {
      context: this.canvas.getContext('2d');
    }); */
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }}></canvas>
    );
  }
}

export default SolarSystem;
