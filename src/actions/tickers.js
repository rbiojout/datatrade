import fetch from 'cross-fetch'

import { timeParse } from "d3-time-format";

import { API_ROOT } from '../api-config.js'

export const REQUEST_TICKS = 'REQUEST_TICKS'
export const RECEIVE_TICKS = 'RECEIVE_TICKS'
export const REQUEST_TICKERS = 'REQUEST_TICKERS'
export const RECEIVE_TICKERS = 'RECEIVE_TICKERS'
export const SELECT_TICKER = 'SELECT_TICKER'


const parseDate = timeParse("%Y-%m-%d");

function parseData(parse) {
  return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}



// Tickers
export function requestTickers() {
  return {
    type: REQUEST_TICKERS,
  }
}

function receiveTickers(json) {
  return {
    type: RECEIVE_TICKERS,
    tickers: json,
    //tickers: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function selectTicker(tickerSymbol) {
  return {
    type: SELECT_TICKER,
    tickerSymbol
  }
}


function fetchTickers() {
  return dispatch => {
    dispatch(requestTickers())
    return fetch(`${API_ROOT}/tickers/`)
      .then(response => response.json())
      .then(json => dispatch(receiveTickers(json)))
  }
}

function shouldFetchTickers(state) {
  const tickers = state.tickers
  if (!tickers) {
    return true
  } else if (tickers.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchTickersIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchTickers(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTickers())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}


// Ticks
function requestTicks(tickerSymbol) {
  return {
    type: REQUEST_TICKS,
    tickerSymbol
  }
}

function receiveTicks(tickerSymbol, json) {
  return {
    type: RECEIVE_TICKS,
    tickerSymbol,
    items: json,
    receivedAt: Date.now()
  }
}


function fetchTicks(tickerSymbol) {
  return dispatch => {
    dispatch(requestTicks(tickerSymbol))
    return fetch(`${API_ROOT}/tickers/${tickerSymbol}/ticks/`)
      .then(response => response.json())
      .then(data => data.map(parseData(parseDate)))
      .then(json => dispatch(receiveTicks(tickerSymbol, json)))

  }
}


function shouldFetchTicks(state, tickerSymbol) {
  if (!state.ticksByTicker){
    return true
  }
  const ticks = state.ticksByTicker[tickerSymbol]
  if (!ticks) {
    return true
  } else if (ticks.isFetching) {
    return false
  } else {
    return ticks.didInvalidate
  }
}

export function fetchTicksIfNeeded(tickerSymbol) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchTicks(getState(), tickerSymbol)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTicks(tickerSymbol))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}
