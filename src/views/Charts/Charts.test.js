import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../configureStore';

import { Provider } from "react-redux";
import Charts from './Charts';
import TickerChooser from '../../containers/TickerChooser';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    addTodo: jest.fn()
  }
  
  const enzymeWrapper = shallow(<TickerChooser {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

const store = configureStore();

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Polar: () => null,
  Pie: () => null,
  Radar: () => null,
  Bar: () => null,
  Doughnut: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Charts /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});