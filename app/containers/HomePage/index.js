
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
//  import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//  import { createStructuredSelector } from 'reselect';

//  import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
//  import H2 from 'components/H2';
import SolarSystem from 'components/SolarSystem';
//  import AtPrefix from './AtPrefix';
//  import CenteredSection from './CenteredSection';

//  import Form from './Form';
import BottomBar from '../../components/BottomBar';
import Section from './Section';
//  import messages from './messages';

//  import { loadRepos } from '../App/actions';
import { setCelestialData, updatePlanetPosition } from './actions';
//  import { makeSelectUsername } from './selectors';

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
          <select onChange={this.setScale} ref={(ref) => { this.scaleSelector = ref; }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <p>Year: {this.state.year}</p>
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
};

export function mapDispatchToProps(dispatch) {
  return {
    setPlanetData: (canvas, context, celestialData) => dispatch(setCelestialData(canvas, context, celestialData)),
    planetPosition: (planet) => dispatch(updatePlanetPosition(planet)),
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
