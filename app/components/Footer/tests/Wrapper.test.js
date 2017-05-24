import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('should render an <footer> tag', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.type()).toEqual('footer');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Footer id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Footer attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
