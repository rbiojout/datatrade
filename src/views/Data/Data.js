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

class Data extends Component {
  constructor(props) {
    super(props);
  }

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


export default Data;
