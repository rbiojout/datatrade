import fetch from 'cross-fetch'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeParse, timeFormat } from "d3-time-format";
import {
    tickers
} from '../actions';
  
import TickerSelector from '../components/TickerSelector';

import { ChartTypeChooser } from '../components/stockcharts/ChartTypeChooser';

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

const parseDate = timeParse("%Y-%m-%d");


class TickerChooser extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  /*
  componentDidMount() {
    const { dispatch, selectedTicker } = this.props
    this.props.dispatch(fetchTickersIfNeeded())
    this.props.dispatch(fetchTicksIfNeeded(this.props.selectedTicker))
  }
  */

  componentDidMount() {
      this.props.fetchTickersIfNeeded();
  }

  handleChange = (nextTicker) => {
    if (!nextTicker){return;}
    if (typeof nextTicker == 'object') {
      // if we have an array we take the first
      if (nextTicker[0]){
        nextTicker = nextTicker[0]
      }
      // if this is a plain object we select 'symbol'
      if (nextTicker['symbol']) {
        nextTicker = nextTicker['symbol']
      }
    }
    this.props.selectTicker(nextTicker)
    this.props.fetchTicksIfNeeded(nextTicker)
  }
  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedTicker } = this.props
    this.props.fetchTickersIfNeeded()
  }

  render() {
    const {selectedTicker, isFetching, tickers, ticks, fetchTickersIfNeeded, selectTicker, fetchTicksIfNeeded} = this.props
    if (ticks.length ==0 ) {
      return (
      <div>
        <h2> </h2>
        <TickerSelector options={tickers} selectedTicker={selectedTicker} onChange={this.handleChange}/>
      </div>
      );
    }
    return (
      <div>
          <h2>{selectedTicker}</h2>
        {isFetching?<h2>Loading...</h2>:<TickerSelector options={tickers} selectedTicker={selectedTicker} onChange={this.handleChange}/>}
        <ChartTypeChooser tickerSymbol={selectedTicker} data={ticks} /> 

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTickersIfNeeded: () => {
      dispatch(tickers.fetchTickersIfNeeded())
    },
    selectTicker: (tickerSymbol) => {
      dispatch(tickers.selectTicker(tickerSymbol))
    },
    fetchTicksIfNeeded: (tickerSymbol) => {
      dispatch(tickers.fetchTicksIfNeeded(tickerSymbol))
    }
  }
}


const mapStateToProps = state => {
  const { tickers, ticksByTicker } = state;
  const selectedTicker = tickers.selected;
  const { isFetching, lastUpdated, items } = ticksByTicker[selectedTicker] || {
                                                                                isFetching: true,
                                                                                items: [],
                                                                              }
  return {
      selectedTicker: state.tickers.selected,
      tickers: state.tickers.items,
      isFetching: state.tickers.isFetching,
      ticks: items
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(TickerChooser)