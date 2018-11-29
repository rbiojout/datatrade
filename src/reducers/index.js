import { combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';
import templates from './templates';


const portfolios = resourceReducer('portfolios');
const tickers = resourceReducer('tickers');
const ticks = resourceReducer('ticks');
const weightPortfolios = resourceReducer('weightPortfolios');


const rootReducer = combineReducers({
  portfolios,
  weightPortfolios,
  templates,
  tickers, 
  ticks,
})

export default rootReducer ;
