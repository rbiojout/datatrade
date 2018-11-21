import { combineReducers } from 'redux'
import {
  REQUEST_TICKS,
  RECEIVE_TICKS,
  REQUEST_TICKERS,
  RECEIVE_TICKERS,
  SELECT_TICKER,
  INVALIDATE_TICKER
} from '../actions/tickers'

function selectedTicker(state = null, action) {
  switch (action.type) {
    case SELECT_TICKER:
      return action.tickerSymbol
    default:
      return state
  }
}

function tickers(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_TICKERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_TICKERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.tickers,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

// Utility function to update the state, not exposed
function ticks(
  state = {
    isFetching: false,
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
        items: action.items,
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
        [action.tickerSymbol]: ticks(state[action.tickerSymbol], action)
      })
    default:
      return state
  }
}

const tickerReducers = combineReducers({
  tickers,
  selectedTicker,
  ticksByTicker
})

export {tickers, selectedTicker, ticksByTicker};
