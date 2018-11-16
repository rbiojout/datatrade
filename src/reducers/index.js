import { combineReducers } from 'redux';
import experiments from "./experiments";
import templates from './templates';
import {ticksByTicker, tickers, selectedTicker} from './tickers';

const rootReducer = combineReducers({
  experiments,
  templates,
  tickers, 
  ticksByTicker,
  selectedTicker
})

export default rootReducer ;
