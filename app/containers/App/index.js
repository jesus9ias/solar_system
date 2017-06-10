/**
 * App
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const AppWrapper = styled.div`
  margin: 0px;
  display: flex;
  min-height: 100%;
  padding: 0px;
  flex-direction: column;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Solar System with React"
        defaultTitle="Solar System with React"
        meta={[
          { name: 'description', content: 'Solar System with React' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
