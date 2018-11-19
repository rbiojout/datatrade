import fetch from 'cross-fetch'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeParse, timeFormat } from "d3-time-format";
import {
    selectTicker,
    fetchTickers,
    fetchTickersIfNeeded,
    fetchTicks,
    fetchTicksIfNeeded
} from '../actions/tickers';
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
  } from 'reactstrap';
  
import TickerSelector from '../components/TickerSelector';
import { ChartComponent } from '../views/Charts/ChartComponent';
// import { ChartTypeChooser} from '../views/Charts/ChartTypeChooser';
import { AreaChart } from '../views/Charts/stockcharts/AreaChart';
import SimpleAeraChart from '../views/Charts/stockcharts/SimpleAeraChart';
import { CandleStickChart } from '../views/Charts/stockcharts/CandleStickChart';
import TypeChooser  from '../views/Charts/stockcharts/TypeChooser';
import { getData } from '../views/Charts/utils';

import { ChartTypeChooser } from '../views/Charts/ChartTypeChooser';

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

class Ticks extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const timedTicks = parseData(parseDate)(this.props.ticks)
      return (
        <Card>
          <CardHeader>
            Welcome to PonyNote!
          </CardHeader>
          <CardBody>
          <h3>Tickers</h3>
          <table>
            <tbody>
              {timedTicks.map((ticker, id) => (
                <tr key={`ticker_${id}`}>
                  <td>{ticker.id}</td>
                  <td>{ticker.date}</td>
                  <td>{ticker.open}</td>
                  <td>{ticker.hight}</td>
                  <td>{ticker.low}</td>
                  <td>{ticker.close}</td>
                  <td>{ticker.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </CardBody>
        </Card>
      )
    }
  }

class TickerChooser extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.state = {
        tickers: [],
        isLoading: true,
        data: [],
      };
    
  }
  componentDidMount() {
    const { dispatch, selectedTicker } = this.props
    dispatch(fetchTickersIfNeeded())
    getData().then(data => {
        this.setState({ data })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectTicker !== prevProps.selectTicker) {
      const { dispatch, selectTicker } = this.props
      dispatch(fetchTickersIfNeeded())
    }
  }

  handleChange(nextTicker) {
    this.props.dispatch(selectTicker(nextTicker))
    this.props.dispatch(fetchTicks(nextTicker))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedTicker } = this.props
    dispatch(fetchTickersIfNeeded())
  }

  render() {
      const {selectedTicker, isFetching, tickers, ticks} = this.props
    //const { selectedTicker, items, isFetching, lastUpdated } = this.props
    //if (this.state.isLoading) {
    //    return <p>Loading ...</p>;
    //  }
    let graph;

    if (this.props.ticks.length >0 )
        {
            //const ticksOK = this.props.ticks.map(parseData(parseDate));
            //this.setState({tickers: ticksOK})
            graph = (<SimpleAeraChart style='hybrid' width={100} ratio={1.0} data={this.props.ticks}/>)
        }
        /*{
           <TypeChooser>
           {type => <SimpleAeraChart style='hybrid' width={100} ratio={1.0} data={this.props.ticks}/>}
       </TypeChooser>
        }*/
        else {
            graph = <h4>HH</h4>
        }
    return (
      <div>
          <h2>Tickers</h2>
        {isFetching?<h2>Loading...</h2>:<TickerSelector options={tickers} value={selectedTicker} onChange={this.handleChange}/>}
        {/*<ChartTypeChooser data={ticks}/>*/}
        <ChartTypeChooser tickerSymbol={selectedTicker} /> 

        
        
        
        {/*<Ticks ticks={ticks} />*/}
        
      </div>
    )
  }
}

/*
TickerChooser.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}
​*/

function mapStateToProps(state) {
    const { selectedTicker, tickers, ticksByTicker } = state
    const { isFetching, lastUpdated, items } = ticksByTicker[
    selectedTicker
  ] || {
    isFetching: true,
    items: []
  }
   
    return {
        selectedTicker: selectedTicker,
        tickers: state.tickers.items,
        isFetching: state.tickers.isFetching,
        ticks: items
    }
  }
// export default TickerChooser

export default connect(mapStateToProps)(TickerChooser)