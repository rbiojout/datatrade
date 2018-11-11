import { combineReducers } from 'redux'
import {
  REQUEST_TICKS,
  RECEIVE_TICKS,
  SELECT_TICKER,
  INVALIDATE_TICKER
} from '../actions/tickers'

function selectedTicker(state = 1, action) {
  switch (action.type) {
    case SELECT_TICKER:
      return action.tickerId
    default:
      return state
  }
}

function tickers(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_TICKER:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TICKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TICKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.tickers,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function ticksByTicker(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_TICKER:
    case REQUEST_TICKS:
    case RECEIVE_TICKS:
      return Object.assign({}, state, {
        [action.tickerId]: tickers(state[action.tickerId], action)
      })
    default:
      return state
  }
}

const tickerReducers = combineReducers({
  ticksByTicker,
  selectedTicker
})

export {ticksByTicker, selectedTicker};
