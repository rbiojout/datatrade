import fetch from 'cross-fetch'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getResources, getStatus } from 'redux-resource';

import { selectTicker, fetchTickersIfNeeded, fetchTicksIfNeeded } from '../actions/crud_tickers';
  
import TickerSelector from '../components/TickerSelector';

import { ChartTypeChooser } from '../components/stockcharts/ChartTypeChooser';



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
    }
    // if this is a plain object we select 'id' which is necessary for redux-resource
    this.props.selectTicker(nextTicker.id);
    this.props.fetchTicksIfNeeded(nextTicker.symbol);
  }
  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedTicker } = this.props
    this.props.fetchTickersIfNeeded()
  }

  render() {
    const {tickers, allTickersStatus, ticks, ticksStatus, selectedSymbol, selectedTickerId} = this.props;
    const {selectTicker, fetchTickersIfNeeded } = this.props;
    console.log("props TickerChooser ", this.props);
    return (
      <div>
    {allTickersStatus.pending && 'Loading ...'}
    {allTickersStatus.failed && (
      <span>
        There was an error loading .{' '}
        <button onClick={this.fetchTickersIfNeeded}>Try again.</button>
      </span>
    )}
    {allTickersStatus.succeeded && 
    <div>
    <h2>{selectedSymbol}</h2>
      <TickerSelector options={tickers} selectedTicker={selectedSymbol} onChange={this.handleChange}/>
      { ticks.length >0 &&
      <ChartTypeChooser tickerSymbol={selectedSymbol} data={ticks} /> 
    }

      </div>
    }
    
  </div>
    )
  }
}

const mapDispatchToProps =  {
  selectTicker, 
  fetchTickersIfNeeded, 
  fetchTicksIfNeeded, 
}


const mapStateToProps = state => {
  const selectedTicker = getResources(state.tickers, 'selected');
  let selectedSymbol = null;
  let selectedTickerId = null;
  if (selectedTicker && selectedTicker.length >0 ){
    selectedSymbol = selectedTicker[0].symbol;
    selectedTickerId = selectedTicker[0].id;
  }

  const tickers = getResources(state.tickers, 'allTickers');
  const allTickersStatus = getStatus(
    state,
    'tickers.requests.getAllTickers.status',
    true
  );
  
  const ticks = getResources(state.ticks, `ticks_${selectedSymbol}`);
  const ticksStatus = getStatus(
    state,
    `tickers.requests.getTicks_${selectedSymbol}.status`,
    true
  );


  return {
      tickers,
      allTickersStatus,
      ticks,
      ticksStatus,
      selectedSymbol,
      selectedTickerId,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(TickerChooser)