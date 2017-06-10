
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SolarSystem from 'components/SolarSystem';
import BottomBar from '../../components/BottomBar';
import SpaceCursor from '../../components/SpaceCursor';
import Section from './Section';
import {
  setCelestialData,
  updatePlanetPosition,
  moveTo,
} from './actions';

const YearsElapsed = styled.p`
  margin: 23px 5px;
  font-size: 16px;
`;

const ScaleBlock = styled.div`
  display: flex;
  padding: 23px 0px;
`;


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.setScale = this.setScale.bind(this);
    this.yearsElapsed = this.yearsElapsed.bind(this);
    this.state = {
      scale: 1,
      cycle: 0,
      year: 0,
    };
  }

  setScale() {
    this.setState({ scale: this.scaleSelector.value });
  }

  yearsElapsed() {
    this.setState((prevState) => {
      const cycle = (prevState.cycle === 360) ? 1 : prevState.cycle + 1;
      const year = (prevState.cycle === 360) ? prevState.year + 1 : prevState.year;
      return {
        cycle,
        year,
      };
    });
  }

  render() {
    const {
      setPlanetData,
      planetPosition,
      celestialData,
      context,
      positions,
      vPosition,
      hPosition,
      move,
    } = this.props;
    return (
      <article>
        <Helmet
          title="Solar System"
          meta={[
            { name: 'description', content: 'Solar System with ReactJS' },
          ]}
        />
        <Section>
          <SolarSystem
            setCelestialData={setPlanetData}
            updatePlanetPosition={planetPosition}
            celestialData={celestialData}
            context={context}
            scale={this.state.scale}
            positions={positions}
            yearsElapsed={this.yearsElapsed}
            vPosition={vPosition}
            hPosition={hPosition}
          />
        </Section>
        <BottomBar>
          <ScaleBlock>
            <p style={{ margin: '0px' }}>Scale</p>
            <select
              onChange={this.setScale}
              ref={(ref) => { this.scaleSelector = ref; }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </ScaleBlock>
          <YearsElapsed>Year: {this.state.year}</YearsElapsed>
          <SpaceCursor moveTo={move} />
        </BottomBar>
      </article>
    );
  }
}

HomePage.propTypes = {
  setPlanetData: PropTypes.func,
  planetPosition: PropTypes.func,
  context: PropTypes.any,
  celestialData: PropTypes.object,
  positions: PropTypes.object,
  vPosition: PropTypes.number,
  hPosition: PropTypes.number,
  move: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setPlanetData: (canvas, context, celestialData) => dispatch(setCelestialData(canvas, context, celestialData)),
    planetPosition: (planet) => dispatch(updatePlanetPosition(planet)),
    move: (direction) => dispatch(moveTo(direction)),
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    context: state.getIn(['home', 'context']),
    celestialData: state.getIn(['home', 'celestialData']),
    positions: state.getIn(['home', 'planetPositions']),
    vPosition: state.getIn(['home', 'vPosition']),
    hPosition: state.getIn(['home', 'hPosition']),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
