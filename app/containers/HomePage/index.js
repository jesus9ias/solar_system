
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
//  import Input from './Input';
import Section from './Section';
//  import messages from './messages';

//  import { loadRepos } from '../App/actions';
import { setCelestialData, updatePlanetPosition } from './actions';
//  import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.setScale = this.setScale.bind(this);
    this.state = { scale: 1 };
  }

  setScale() {
    this.setState({ scale: this.scaleSelector.value });
  }

  render() {
    const {
      setPlanetData,
      planetPosition,
      celestialData,
      context,
      positions,
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
          />
        </Section>
        <div>
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
        </div>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
