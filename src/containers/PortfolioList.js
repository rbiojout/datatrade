import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { 
  readManyUserPortfolios, 
  selectPortfolio, 
  createPortfolio, 
  deletePortfolio 
} from '../actions/crud_portfolios';

import WeightPortfoliosList from './WeightPortfoliosList';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Table,
} from 'reactstrap';


class PortfolioList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioName: '',
    }
  }
  render() {
    const { userPortfolios, userPortfoliosStatus, selectedPortfolio } = this.props;
    
    let selected = null;
    if (selectedPortfolio[0]) {
      selected = selectedPortfolio[0].id;
    }
    return (
      <Card>
        <CardHeader>
          Portfolios
        </CardHeader>
        <CardBody>
            <Row>
              <Col sm={5}>
                <h3>List of Porfolios</h3>
                  {userPortfoliosStatus.pending && 'Loading ...'}
                  {userPortfoliosStatus.failed && (
                    <span>
                      There was an error loading .{' '}
                      <button onClick={this.fetchUsersGists}>Try again.</button>
                    </span>
                  )}
                  {userPortfoliosStatus.succeeded && (
                    <Table striped key={"table_0"} id={"table_0"}>
                      <tbody>
                      {userPortfolios.map(portfolio => (
                        <tr key={`portofolio_${portfolio.id}`}>
                          <td>{portfolio.name}{(portfolio.id==selected) && <Badge color="success">Selected</Badge>}</td>
                          <td><Button color='secondary' size="sm" onClick={() => this.props.selectPortfolio(portfolio.id)}>select</Button></td>
                          <td><Button color="danger" size="sm"  onClick={() => this.deletePortfolio(portfolio.id)}>delete</Button></td>
                      </tr>
                      ))}
                      </tbody>
                    </Table>
                  )}
              </Col>
              <Col sm={7}>
                <h4>Tickers</h4>
                { (selected !=null) &&
                <WeightPortfoliosList portfolioId={selected}/>
                }
              </Col>
            </Row>
        <h3>Add new portfolio</h3>
        <Form onSubmit={this.addPortfolio}>
          <Input className="form-control" type="text" value={this.state.portfolioName} onChange={this.onPortfolioNameChange} />
          <input type="submit" value="Submit" />
        </Form>
        
        </CardBody>
      </Card>
    );
  }

  componentDidMount() {
    this.fetchUserPortfolios();
  }

  componentWillUnmount() {
    if (this.readManyUserPortfoliosXhr) {
      this.readManyUserPortfoliosXhr.abort();
    }
  }

  fetchUserPortfolios = () => {
    const { readManyUserPortfolios } = this.props;

    if (this.readManyUserPortfoliosXhr) {
      this.readManyUserPortfoliosXhr.abort();
    }

    this.readManyUserPortfoliosXhr = readManyUserPortfolios();
  };

  selectPortfolio = (portfolioId) => {
    //this.props.selectPortfolio(0)
  }

  addPortfolio = (event) =>{
    event.preventDefault();
    this.props.createPortfolio({name: this.state.portfolioName});
    this.setState({portfolioName:''})
    //this.props.readManyUserPortfolios();
  }

  deletePortfolio = (portfolioId) =>{
    const confirmedDelete = window.confirm(
      `Are you sure you wish to delete ? This cannot be undone. `
    );
    
    if (confirmedDelete) {
      this.props.deletePortfolio(portfolioId);
    }
  }

  onPortfolioNameChange = event => {
    this.setState({
      portfolioName: event.target.value
    });
  };
}

function mapStateToProps(state) {
  const userPortfolios = getResources(state.portfolios, 'userPortfolios');
  const userPortfoliosStatus = getStatus(
    state,
    'portfolios.requests.getUserPortfolios.status',
    true
  );
  const selectedPortfolio = getResources(state.portfolios, 'selected');


  return {
    userPortfolios,
    userPortfoliosStatus,
    selectedPortfolio,
  };
}

const mapDispatchToProps = {
  readManyUserPortfolios,
  selectPortfolio,
  createPortfolio,
  deletePortfolio,
};


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);