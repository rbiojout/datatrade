import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import { FormGroup, Label, Col, Input } from 'reactstrap';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';

class TickerSelector extends Component {
    constructor(props) {
      super(props);
    }
  
    
    render() {
      const { selectedTicker, onChange, options } = this.props
  
      var selected = options.find(function(element) {
        return element['symbol'] == selectedTicker;
      });
      
      return (
        <FormGroup row>
          <Label for="tickerSelector" sm={2}>Ticker</Label>
          <Col sm={10}>
          <Typeahead
            labelKey="symbol"
            multiple={false}
            options={options}
            filterBy={['symbol','company']}
            renderMenu={(results, menuProps) => (
              <Menu {...menuProps}>
                {results.map((result, index) => (
                  <MenuItem key={index} option={result} position={index}>
                    {result.symbol}-{result.company}
                  </MenuItem>
                ))}
              </Menu>
            )}
            placeholder="Choose a ticker..."
            onChange={selectedItems => onChange(selectedItems[0])} 
            selected = {(selectedTicker)?[selectedTicker]:[]}
          />
          </Col>
        </FormGroup>
        
      )
    }
  }

  export default TickerSelector;