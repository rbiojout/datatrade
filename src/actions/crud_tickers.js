import { actionTypes } from 'redux-resource';
import { getResources, getStatus } from 'redux-resource';
import { crudRequest } from 'redux-resource-xhr';
import { timeParse } from "d3-time-format";
import { API_ROOT } from '../api-config.js'
//import headers from '../../utils/headers';

// This file heavily leverages the Redux Resource XHR library. To learn
// more about its API, refer to the documentation:
// https://redux-resource.js.org/docs/extras/redux-resource-xhr.html

// need to parse the data for later treatments of the ticks
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


// The Redux Resource XHR library only exports bulk actions, so we use this
// function to turn single-resource responses from the server into arrays.
function singleResourceToArray(body) {
  return [body];
}


export function selectTicker(tickerId) {
  return {
    type: actionTypes.UPDATE_RESOURCES,
    lists: {
      tickers: {
        selected: [tickerId]
      }
    }
  };
}

function readAllTickers() {
  const xhrOptions = {
    method: 'GET',
    url: `${API_ROOT}/tickers/`,
    json: true,
    //headers
  };

  return dispatch =>
    crudRequest('read', {
      actionDefaults: {
        resourceType: 'tickers',
        requestKey: 'getAllTickers',
        list: 'allTickers',
        mergeListIds: false
      },
      xhrOptions,
      dispatch
    });
}

function shouldFetchTickers(state) {
    if (!state.tickers){
      return true
    }
    const tickers = getResources(state.tickers, 'allTickers');
    const tickersStatus = getStatus(state,`tickers.requests.getAllTickers.status`,true);
    if (tickers.length == 0) {
      return true
    } else if (tickersStatus.pending) {
      return false
    } else {
      return !tickersStatus.succeeded
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
        return dispatch(readAllTickers())
      } else {
        // Let the calling code know there's nothing to wait for.
        return Promise.resolve()
      }
    }
  }

function readTicks(tickerSymbol) {
    const xhrOptions = {
      method: 'GET',
      url: `${API_ROOT}/tickers/${tickerSymbol}/ticks/`,
      json: true,
      //headers
    };
  
    return dispatch =>
      crudRequest('read', {
        actionDefaults: {
          resourceType: 'ticks',
          requestKey: `getTicks_${tickerSymbol}`,
          list: `ticks_${tickerSymbol}`,
          mergeListIds: false
        },
        xhrOptions,
        transformData: (data => data.map(parseData(parseDate))),
        dispatch
      });
  }
  
  
  function shouldFetchTicks(state, tickerSymbol) {
    if (!state.ticks){
      return true
    }
    const ticks = getResources(state.ticks, `ticks_${tickerSymbol}`);
    const ticksStatus = getStatus(state,`ticks.requests.getTicks_${tickerSymbol}.status`,true);
    if (ticks.length == 0) {
      return true
    } else if (ticksStatus.pending) {
      return false
    } else {
      return !ticksStatus.succeeded
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
        return dispatch(readTicks(tickerSymbol))
      } else {
        // Let the calling code know there's nothing to wait for.
        return Promise.resolve()
      }
    }
  }