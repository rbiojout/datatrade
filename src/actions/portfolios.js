import fetch from 'cross-fetch'

import { API_ROOT } from '../api-config.js'

export const REQUEST_PORTFOLIOS = 'REQUEST_PORTFOLIOS'
export const RECEIVE_PORTFOLIOS = 'RECEIVE_PORTFOLIOS'
export const SELECT_PORTFOLIO = 'SELECT_PORTFOLIO'
export const ADD_PORTFOLIO = 'CREATE_PORTFOLIO'
export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO'
export const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO'
export const ADD_WEIGTH = 'ADD_WEIGTH'
export const DELETE_WEIGHT = 'DELETE_WEIGHT'

// Portfolios
export function requestPortfolios() {
  return {
    type: REQUEST_PORTFOLIOS,
  }
}

function receivePortfolios(json) {
  return {
    type: RECEIVE_PORTFOLIOS,
    portfolios: json,
    receivedAt: Date.now()
  }
}


function fetchPortfolios() {
  return dispatch => {
    dispatch(requestPortfolios())
    return fetch(`${API_ROOT}/portfolios/`)
      .then(response => response.json())
      .then(json => dispatch(receivePortfolios(json)))
  }
}

function shouldFetchPortfolios(state) {
  const portfolios = state.portfolios
  if (!portfolios) {
    return true
  } else if (portfolios.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchportfoliosIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchPortfolios(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPortfolios())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export function selectPortfolio(id) {
  console.log(' in SELECT_PORTFOLIO ', id)
  return {
    type: SELECT_PORTFOLIO,
    id
  }
}


// Create, Update and Delete
const createPortfolio = (item) => {
  return {
    type: ADD_PORTFOLIO,
    item,
  }
}

export const addPortfolio = (name, weight_portfolio) =>{
  return dispatch => {
    return fetch(`${API_ROOT}/portfolios/`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    })
    .then(response => response.json())
    .then(item => dispatch(createPortfolio(item)))
    .catch((error) => {
      console.error(error);
    });
  }
}

  
export const updatePortfolio = (id, name, weight_portfolio) => {
  return {
    type: UPDATE_PORTFOLIO,
    id,
    name,
    weight_portfolio,
  }
}

const deletePortfolio = id => {
  return {
    type: DELETE_PORTFOLIO,
    id
  }
}

export const destroyPortfolio = (id) =>{
  return dispatch => {
    fetch(`${API_ROOT}/portfolios/${id}/`,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({
      //  id: id,
      //}),
    })
    .catch((error) => {
      console.error(error);
    });
    return dispatch(deletePortfolio(id));
  }
}

// add and delete weights
const addWeight = (item)=> {
  return {
    type: ADD_WEIGTH,
    item: item
  }
}

export const createWeight = (portfolio, ticker, weight) =>{
  console.log(" create ", portfolio, ticker, weight)
  return dispatch => {
    return fetch(`${API_ROOT}/portfolios/${portfolio}/add_ticker/`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticker: ticker,
        weight: weight,
      }),
    })
    .then(response => response.json())
    .then(item => dispatch(addWeight(item)))
    .catch((error) => {
      console.error(error);
    });
  }
}
