import { combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';
import templates from './templates';


const portfolios = resourceReducer('portfolios');
const weightPortfolios = resourceReducer('weightPortfolios');

const tickers = resourceReducer('tickers');
const ticks = resourceReducer('ticks');


const rootReducer = combineReducers({
  portfolios,
  weightPortfolios,
  templates,
  tickers, 
  ticks,
})

export default rootReducer ;
