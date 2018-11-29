import { combineReducers } from 'redux'
import {
    REQUEST_PORTFOLIOS,
    RECEIVE_PORTFOLIOS,
    SELECT_PORTFOLIO,
    ADD_PORTFOLIO,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    ADD_WEIGTH,
    DELETE_WEIGHT,
} from '../actions/portfolios'


const initialState = {};
  
  
export default function portfolios(state = {
    isFetching: false,
    items: [],
    selected: null
  },
  action
 ) {
    var portfoliosList = state.items.slice();
    var selected = 0;
    var portfolioToUpdate = {};
    var newItems = [];
    var currentIndex = 0;
    var currentPortfolio = {};
    switch (action.type) {
        case REQUEST_PORTFOLIOS:
          return Object.assign({}, state, {
            isFetching: true,
          })
        case RECEIVE_PORTFOLIOS:
          console.log(" action.portfolios", action.portfolios)
          selected = action.portfolios.length>0?action.portfolios[0].id:0;
          return Object.assign({}, state, {
            isFetching: false,
            items: action.portfolios,
            lastUpdated: action.receivedAt,
            selected: selected
          })
          break;
        case ADD_PORTFOLIO:
          selected = action.item.id;
          return Object.assign({}, state, {
            selected: selected,
            items: [ action.item, ...state.items]
          })
        case SELECT_PORTFOLIO:
          return Object.assign({}, state, {
            selected: action.id
          })
        case UPDATE_PORTFOLIO:
          portfolioToUpdate = portfoliosList[action.id]
          portfolioToUpdate.name = action.name;
          portfolioToUpdate.weight_portfolio = action.weight_portfolio
          portfoliosList.splice(action.id, 1, portfolioToUpdate);
          return Object.assign({}, state, {
              selected: action.id,
            items: portfoliosList
          })
        case DELETE_PORTFOLIO:
          newItems = state.items.filter((item)=>item.id !== action.id);
          selected = (selected == action.item.id)?action.portfolios[0]:selected;
          return Object.assign({}, state, {
            items: newItems
          })
        case ADD_WEIGTH:
          // store the ids in an array
          // look for index
          currentIndex = state.items.map( (element) => (element.id)).indexOf(selected)
          currentPortfolio = Object.assign({}, state.items[currentIndex], {
            weight_portfolio: [action.item, ...state.items[currentIndex].weight_portfolio ]
          })
          newItems = [...state.items]
          newItems[selected] = currentPortfolio
          return Object.assign({}, state, {
            items: newItems
          })
        case DELETE_WEIGHT:
            
        default:
          return state

        }
}