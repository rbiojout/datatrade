import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import { FormGroup, Label, Col, Input } from 'reactstrap';

class TickerSelector extends Component {
    constructor(props) {
      super(props);
    }
  
    
    render() {
      const { value, onChange, options } = this.props
  
      return (
        <FormGroup row>
          <Label for="tickerSelector" sm={2}>Ticker</Label>
          <Col sm={10}>
          <Input type="select" name="tickerSelector" id="tickerSelector" onChange={e => onChange(e.target.value)} value={value}>
            {options.map(option => (
                <option value={option['symbol']} key={option['id']}>
                  {option['symbol']}
                </option>
              ))}          
          </Input>
          </Col>
        </FormGroup>
        
      )
    }
  }

  export default TickerSelector;