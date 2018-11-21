import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import TickerChooser from '../../containers/TickerChooser.js';

const fixture = {
  tickers: [{"id":5572,"symbol":"A","company":8899,"exchange":3},{"id":5573,"symbol":"AA","company":8900,"exchange":3},{"id":5574,"symbol":"AABA","company":8901,"exchange":4},{"id":5575,"symbol":"AAC","company":8902,"exchange":3},{"id":5576,"symbol":"AAL","company":8903,"exchange":4},{"id":5577,"symbol":"AAMC","company":8904,"exchange":5}],
  ticks: [{
    "id": 54504,
    "date": "1980-12-12",
    "open": 0.513393,
    "high": 0.515625,
    "low": 0.513393,
    "close": 0.513393,
    "volume": 2093900
},
{
    "id": 54505,
    "date": "1980-12-15",
    "open": 0.488839,
    "high": 0.488839,
    "low": 0.486607,
    "close": 0.486607,
    "volume": 785200
},
{
    "id": 54506,
    "date": "1980-12-16",
    "open": 0.453125,
    "high": 0.453125,
    "low": 0.450893,
    "close": 0.450893,
    "volume": 472000
},
{
    "id": 54507,
    "date": "1980-12-17",
    "open": 0.462054,
    "high": 0.464286,
    "low": 0.462054,
    "close": 0.462054,
    "volume": 385900
}],
}

const initState = {
  text: "",
  updateExperimentId: null,
  validate: {
    textState: '',
  },
}

class Ticks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardHeader>
          Welcome to PonyNote!
        </CardHeader>
        <CardBody>
        <h3>Tickers</h3>
        <table>
          <tbody>
            {this.props.ticks.map((ticker, id) => (
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


class TickerSelector2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
              <option value={option['id']} key={option['id']}>
                {option['symbol']}
              </option>
            ))}   
        </select>
      </span>
    )
  }
}



class Data extends Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount() {
  //  this.props.fetchTickers();
  //}

  render(){
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Ticker
          </CardHeader>
          <CardBody>
            <Col >
              <TickerChooser />
            </Col>
          </CardBody>
        </Card>
        <Row>

          
        </Row>
      </div>
    )
  }

}


/*
class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedTickerId } = this.props
    dispatch(fetchTicksIfNeeded(selectedTickerId))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedTickerId !== prevProps.selectedTickerId) {
      const { dispatch, selectedTickerId } = this.props
      dispatch(fetchTicksIfNeeded(selectedTickerId))
    }
  }

  handleChange(nextTickerId) {
    this.props.dispatch(selectTicker(nextTickerId))
    this.props.dispatch(fetchTicksIfNeeded(nextTickerId))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedTickerId } = this.props
    dispatch(invalidateTicker(selectedTickerId))
    dispatch(fetchTicksIfNeeded(selectedTickerId))
  }

  render() {
    const { selectedTickerId, ticks, isFetching, lastUpdated } = this.props
    return (
      <div>
        <TickerSelector
          value={selectedTickerId}
          onChange={this.handleChange}
          options={[1, 2, 3]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && ticks.length === 0 && <h2>Loading...</h2>}
        {!isFetching && ticks.length === 0 && <h2>Empty.</h2>}
        {ticks.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Ticks ticks={ticks} />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}
*/
// export { TickerList };

export default Data;
