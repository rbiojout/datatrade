import { combineReducers } from 'redux';
import portfolios from "./portfolios";
import templates from './templates';
import {ticksByTicker, tickers} from './tickers';

const rootReducer = combineReducers({
  portfolios,
  templates,
  tickers, 
  ticksByTicker,
})

export default rootReducer ;
