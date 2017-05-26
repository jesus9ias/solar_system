
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
//  import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import { getCelestialData } from './actions';
//  import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.getCelestialData({ });
  }

  render() {
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
            getCelestialData={this.props.getCelestialData}
            canvas={this.props.canvas}
            context={this.props.context}
          />
        </Section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  getCelestialData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getCelestialData: (canvas, context) => dispatch(getCelestialData(canvas, context)),
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    canvas: state.get('canvas'),
    context: state.get('context'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
