import React from 'react';
import ReactDOM from 'react-dom';
import Colors from './Colors';
import { shallow } from 'enzyme'

// it('renders without crashing', () => {
//   shallow(<Colors />);
// });
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Colors />, div);
  ReactDOM.unmountComponentAtNode(div);
});