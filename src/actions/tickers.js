import fetch from 'cross-fetch'


export const REQUEST_TICKS = 'REQUEST_TICKS'
export const RECEIVE_TICKS = 'RECEIVE_TICKS'
export const REQUEST_TICKERS = 'REQUEST_TICKERS'
export const RECEIVE_TICKERS = 'RECEIVE_TICKERS'
export const SELECT_TICKER = 'SELECT_TICKER'
export const INVALIDATE_TICKER = 'INVALIDATE_TICKER'


export function requestTickers() {
  return {
    type: REQUEST_TICKERS,
  }
}

function receiveTickers(json) {
  return {
    type: RECEIVE_TICKERS,
    tickers: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function selectTicker(tickerId) {
  return {
    type: SELECT_TICKER,
    tickerId
  }
}

export function invalidateTicker(tickerId) {
  return {
    type: INVALIDATE_TICKER,
    tickerId
  }
}

// Tickers
function fetchTickers() {
  return dispatch => {
    dispatch(requestTicks())
    return fetch('http://localhost:8000/api/v1/tickers.json')
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
    return tickers.didInvalidate
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


function requestTicks(tickerId) {
  return {
    type: REQUEST_TICKS,
    tickerId
  }
}

function receiveTicks(tickerId, json) {
  return {
    type: RECEIVE_TICKS,
    tickerId,
    items: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


// Ticks
function fetchTicks(tickerId) {
  return dispatch => {
    dispatch(requestTicks())
    return fetch('http://localhost:8000/api/v1/${tickerId}/tickers.json')
      .then(response => response.json())
      .then(json => dispatch(receiveTicks(tickerId, json)))
  }
}


function shouldFetchTicks(state, tickerId) {
  const ticks = state.ticksBytickerId[tickerId]
  if (!ticks) {
    return true
  } else if (ticks.isFetching) {
    return false
  } else {
    return ticks.didInvalidate
  }
}

export function fetchTicksIfNeeded(tickerId) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchTicks(getState(), tickerId)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTicks(tickerId))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const fetchTickers2 = () => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/v1/tickers/", {headers, })
      .then(res => res.json())
      .then(tickers => {
        return dispatch({
          type: 'FETCH_TICKERS',
          tickers
        })
      })
  }
}
