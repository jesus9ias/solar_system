/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
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
//  import { changeUsername } from './actions';
//  import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

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
          <SolarSystem />
        </Section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({

});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
