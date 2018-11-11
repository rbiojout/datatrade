import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { tickers }  from '../../actions';
import {
  selectTicker,
  fetchTicksIfNeeded,
  invalidateTicker
} from '../../actions/tickers'


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
  /*
  state = JSON.parse(JSON.stringify(initState))

  resetForm = () => {
    this.setState(JSON.parse(JSON.stringify(initState)));
    console.log(`reset ${this.state.validate.textState}`);
    console.log(initState);
  }

  selectForEdit = (id) => {
    let ticker = this.props.ticker[id];
    this.setState({symbol: ticker.symbol, updateTickerId: id});
  }

  validateText(e) {
    const { validate } = this.state
      if (e.target.value.length >10) {
        validate.textState = 'has-success'
      } else {
        validate.textState = 'has-danger'
      }
      this.setState({ validate })
  }

  validateAll() {
    let status = true;
    for (var key in this.state.validate) {
      console.log(`this.state.validate ${this.state.validate[key]}`);
      console.log(`this.state.validate ${this.state.validate[key] === 'has-success'}`);
      status = status && this.state.validate[key] === 'has-success'
    }
    console.log(`status ${status}`);
    return status;
    }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    // this.setState({text: event.target.value})
    //console.log(`name: ${ name }, value: ${ value },`)
    await this.setState({
      [ name ]: value,
    });
  }

  submitExperiment = (e) => {
    e.preventDefault();
    if (this.validateAll()==false) {
      return;
    }
    if (this.state.updateExperimentId === null) {
      this.props.addExperiment(this.state.text);
    } else {
      this.props.updateExperiment(this.state.updateExperimentId, this.state.text);
    }
    this.resetForm();
  }
  */

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

// cf https://alligator.io/react/react-autocomplete/
class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <Input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
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

class TickerSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('PROPS '+ this.props.options);
  }
  
  render() {
    const { options } = this.props

    return (
      <span>
        <h1>Select Ticker</h1>
        <select >
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
        <Row>
          <Col >
            <Autocomplete suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Egg",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}/>
            <TickerSelector options={fixture['tickers']} />
            <Ticks ticks={fixture['ticks']} />
          </Col>
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
