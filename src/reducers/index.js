import { combineReducers } from 'redux';
import experiments from "./experiments";
import templates from './templates';

const dataTradeApp = combineReducers({
  experiments,
  templates,
})

export default dataTradeApp;