import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import { getResources, getStatus } from 'redux-resource';
import { 
  createWeightPortfolio, 
  readManyPortfolioPortfolioWeights, 
  deleteWeightPortfolio,
 } from '../actions/crud_portfolios';

import { fetchTickersIfNeeded } from '../actions/crud_tickers';

import {
  Button,
  Form,
  Input,
  Table,
} from 'reactstrap';

import TickerSelector from '../components/TickerSelector';

class WeightPortfolioList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      tickerId: null,
      weight: 1
    }
  }
  render() {
    const { portfolioWeightPortfolios, portfolioWeightPortfoliosStatus, tickers, selectedWeightPortfolio, fetchTickersIfNeeded, } = this.props;
    
    const { portfolioId } = this.props;
    const { tickerId, weight } = this.state;
    return (
      <div>
          {portfolioWeightPortfoliosStatus.pending && 'Loading ...'}
          {portfolioWeightPortfoliosStatus.failed && (
            <span>
              There was an error loading .{' '}
              <button onClick={this.fetchUsersGists}>Try again.</button>
            </span>
          )}
          {portfolioWeightPortfoliosStatus.succeeded && (
            <Table striped key={"table_0"} id={"table_0"}>
              <tbody>
              {portfolioWeightPortfolios.map(weightPortfolio => (
                <tr key={`weightPortfolio_${weightPortfolio.id}`}>
                  <td>{weightPortfolio.ticker}</td>
                  <td><Input type='text'  value={weightPortfolio.weight} onChange={this.onWeightChange}/></td>
                  <td><Button color='danger' size="sm" onClick={() => this.deleteWeightPortfolio(portfolioId, weightPortfolio.id)}>delete</Button></td>
              </tr>
              ))}
              </tbody>
            </Table>
          )}
        <h3>Add new ticker</h3>
        <Form onSubmit={this.addWeightPortfolio}>
          <TickerSelector options={tickers} selectedTicker={tickerId} onChange={this.onTickerChange}/>
          <Input name={"weight"} value={weight} onChange={this.onWeightChange}/>
          <Button color='success' type="submit" >add weight</Button>
        </Form>
        </div>
    );
  }

  componentDidMount() {
    this.fetchPortfolioPortfolioWeights();
    this.props.fetchTickersIfNeeded();
  }

  componentDidUpdate(prevProps) {
    if (this.props.portfolioId != prevProps.portfolioId) {
      this.fetchPortfolioPortfolioWeights();
    }
  }

  componentWillUnmount() {
    if (this.readManyPortfolioPortfolioWeightsXhr) {
      this.readManyPortfolioPortfolioWeightsXhr.abort();
    }
  }

  fetchPortfolioPortfolioWeights = () => {
    const { readManyPortfolioPortfolioWeights, portfolioId } = this.props;

    if (this.readManyPortfolioPortfolioWeightsXhr) {
      this.readManyPortfolioPortfolioWeightsXhr.abort();
    }

    this.readManyPortfolioPortfolioWeightsXhr = readManyPortfolioPortfolioWeights(portfolioId);
  };

  
  addWeightPortfolio = (event) =>{
    event.preventDefault();
    const { portfolioId } = this.props;
    const { tickerId, weight } = this.state;
    this.props.createWeightPortfolio(portfolioId, {portfolio: portfolioId, ticker: tickerId, weight: weight});
    this.setState({tickerId: null, weight: 1})
  }

  deleteWeightPortfolio = (portfolioId, weightPortfolioId) =>{
    const confirmedDelete = window.confirm(
      `Are you sure you wish to delete ? This cannot be undone. `
    );
    
    if (confirmedDelete) {
      this.props.deleteWeightPortfolio(portfolioId, weightPortfolioId);
    }
  }

  onTickerChange = (nextTicker) => {
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
    this.setState({tickerId: nextTicker});
  }

  onWeightChange = event => {
    this.setState({
      weight: event.target.value
    });
  };
}

function mapStateToProps(state, ownProps) {
  const portfolioWeightPortfolios = getResources(state.weightPortfolios, 'portfolioWeights');
  const portfolioWeightPortfoliosStatus = getStatus(
    state,
    'weightPortfolios.requests.getPortfolioWeightPortfolios.status',
    true
  );
  const tickers = getResources(state.tickers, 'allTickers');
  const selectedWeightPortfolio = getResources(state.weightPortfolios, 'selected');

  return {
    portfolioWeightPortfolios,
    portfolioWeightPortfoliosStatus,
    selectedWeightPortfolio,
    tickers,
  };
}

const mapDispatchToProps = {
  readManyPortfolioPortfolioWeights,
  createWeightPortfolio,
  deleteWeightPortfolio,
  fetchTickersIfNeeded,
};

WeightPortfolioList.propTypes = {
  portfolioId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightPortfolioList);