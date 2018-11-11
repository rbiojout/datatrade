import { combineReducers } from 'redux';
import experiments from "./experiments";
import templates from './templates';
import {ticksByTicker, selectedTicker} from './tickers';

const dataTradeApp = combineReducers({
  experiments,
  templates,
  ticksByTicker,
  selectedTicker
})

export default dataTradeApp;
