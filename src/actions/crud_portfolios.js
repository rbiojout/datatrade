import { actionTypes } from 'redux-resource';
import { crudRequest } from 'redux-resource-xhr';
import { API_ROOT } from '../api-config.js'
//import headers from '../../utils/headers';

// This file heavily leverages the Redux Resource XHR library. To learn
// more about its API, refer to the documentation:
// https://redux-resource.js.org/docs/extras/redux-resource-xhr.html

// The Redux Resource XHR library only exports bulk actions, so we use this
// function to turn single-resource responses from the server into arrays.
function singleResourceToArray(body) {
  return [body];
}

export function createPortfolio(portfolio) {
  const xhrOptions = {
    method: 'POST',
    url: `${API_ROOT}/portfolios/`,
    json: true,
    body: portfolio,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return dispatch =>
    crudRequest('create', {
      actionDefaults: {
        resourceType: 'portfolios',
        requestKey: 'createPortfolio',
        list: 'userPortfolios'
      },
      transformData: singleResourceToArray,
      xhrOptions,
      dispatch
    })
}

export function resetCreatePortfolioStatus() {
  return {
    type: actionTypes.CREATE_RESOURCES_IDLE,
    resourceType: 'portfolios',
    requestKey: 'createPortfolio'
  };
}

export function selectPortfolio(portfolioId) {
  return {
    type: actionTypes.UPDATE_RESOURCES,
    lists: {
      portfolios: {
        selected: [portfolioId,]
      }
    }
  };
}

export function readPortfolio(portfolioId) {
  const xhrOptions = {
    method: 'GET',
    url: `${API_ROOT}/portfolios/${portfolioId}`,
    json: true,
    //headers
  };

  return dispatch =>
    crudRequest('read', {
      actionDefaults: {
        requestKey: 'readPortfolio',
        resourceType: 'portfolios',
        resources: [portfolioId]
      },
      transformData: singleResourceToArray,
      xhrOptions,
      dispatch
    });
}

export function readManyUserPortfolios(userId) {
  const xhrOptions = {
    method: 'GET',
    url: `${API_ROOT}/portfolios`,
    json: true,
    //headers
  };

  return dispatch =>
    crudRequest('read', {
      actionDefaults: {
        resourceType: 'portfolios',
        requestKey: 'getUserPortfolios',
        list: 'userPortfolios',
        mergeListIds: false
      },
      xhrOptions,
      dispatch
    });
}

export function updatePortfolio(portfolioId, portfolio) {
  const xhrOptions = {
    method: 'PATCH',
    url: `${API_ROOT}/portfolios/${portfolioId}`,
    json: true,
    body: portfolio,
    //headers
  };

  return dispatch =>
    crudRequest('update', {
      actionDefaults: {
        resourceType: 'portfolios',
        resources: [portfolioId]
      },
      transformData: singleResourceToArray,
      xhrOptions,
      dispatch
    });
}

export function resetUpdatePortfolioStatus(portfolioId) {
  return {
    type: actionTypes.UPDATE_RESOURCES_IDLE,
    resourceType: 'portfolios',
    resources: [portfolioId]
  };
}

export function deletePortfolio(portfolioId) {
  const xhrOptions = {
    method: 'DELETE',
    url: `${API_ROOT}/portfolios/${portfolioId}`,
    //headers
  };

  return dispatch =>
    crudRequest('delete', {
      actionDefaults: {
        resourceType: 'portfolios',
        resources: [portfolioId]
      },
      xhrOptions,
      dispatch
    });
}


//////////////////////////
/// WEIGHTS
//////////////////////////

export function createWeightPortfolio(portfolioId, weightPortfolio) {
  const xhrOptions = {
    method: 'POST',
    url: `${API_ROOT}/portfolios/${portfolioId}/add_ticker/`,
    json: true,
    body: weightPortfolio,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return dispatch =>
    crudRequest('create', {
      actionDefaults: {
        resourceType: 'weightPortfolios',
        requestKey: 'createWeightPortfolio',
        list: 'portfolioWeights'
      },
      transformData: singleResourceToArray,
      xhrOptions,
      dispatch
    })
}

export function resetCreateWeightPortfolioStatus() {
  return {
    type: actionTypes.CREATE_RESOURCES_IDLE,
    resourceType: 'weightPortfolios',
    requestKey: 'createWeightPortfolio'
  };
}

export function selectWeightPortfolio(weightPortfolioId) {
  return {
    type: actionTypes.UPDATE_RESOURCES,
    lists: {
        weightPortfolios: {
        selected: [weightPortfolioId,]
      }
    }
  };
}

export function readWeightPortfolio(portfolioId) {
  const xhrOptions = {
    method: 'GET',
    url: `${API_ROOT}/portfolios/${portfolioId}`,
    json: true,
    //headers
  };

  return dispatch =>
    crudRequest('read', {
      actionDefaults: {
        requestKey: 'readPortfolio',
        resourceType: 'weightPortfolios',
        resources: [portfolioId]
      },
      transformData: singleResourceToArray,
      xhrOptions,
      dispatch
    });
}

export function readManyPortfolioPortfolioWeights(portfolioId) {
  const xhrOptions = {
    method: 'GET',
    url: `${API_ROOT}/portfolios/${portfolioId}/weight_portfolios/`,
    json: true,
    //headers
  };

  return dispatch =>
    crudRequest('read', {
      actionDefaults: {
        resourceType: 'weightPortfolios',
        requestKey: 'getPortfolioWeightPortfolios',
        list: 'portfolioWeights',
        mergeListIds: false
      },
      xhrOptions,
      dispatch
    });
}

export function deleteWeightPortfolio(portfolioId, weightPortfolioId) {
  const xhrOptions = {
    method: 'DELETE',
    url: `${API_ROOT}/portfolios/${portfolioId}/del_ticker/`,
    json: true,
    body: { id: weightPortfolioId},
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return dispatch =>
    crudRequest('delete', {
      actionDefaults: {
        resourceType: 'weightPortfolios',
        resources: [weightPortfolioId]
      },
      xhrOptions,
      dispatch
    });
}