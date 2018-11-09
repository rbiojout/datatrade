import React, { Component } from 'react';
import {connect} from 'react-redux';
import { experiments } from '../actions';

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

const initState = {
  text: "",
  updateExperimentId: null,
  validate: {
    textState: '',
  },
}

class ExperimentList extends Component {
  state = JSON.parse(JSON.stringify(initState))
  
  resetForm = () => {
    this.setState(JSON.parse(JSON.stringify(initState)));
    console.log(`reset ${this.state.validate.textState}`);
    console.log(initState);
  }
  
  selectForEdit = (id) => {
    let experiment = this.props.experiments[id];
    this.setState({text: experiment.text, updateExperimentId: id});
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

  render() {
    return (
      <Card>
        <CardHeader>
          Welcome to PonyNote!
        </CardHeader>
        <CardBody>
        <h3>Add new note</h3>
        <Form onSubmit={this.submitExperiment} className="form-horizontal needs-validation">
          <Input
            className="form-control"
            name="text"
            value={this.state.text}
            placeholder="Enter experiment here..."
            valid={ this.state.validate.textState === 'has-success' }
            invalid={ this.state.validate.textState === 'has-danger' }
            onChange={ (e) => {
              // this.setState({text: e.target.value})
              this.validateText(e)
              this.handleChange(e)
              }
            }  
            // required 
            />
            <FormFeedback valid>
              Your entry is correct, click on save.
            </FormFeedback>
            <FormFeedback>
              You must provide at least 10 characters.
            </FormFeedback>
          <Button className='btn btn-danger' onClick={this.resetForm}>Reset</Button>
          <Button className='btn btn-success' type="submit">Save</Button>
        </Form>
        <h3>experiments</h3>
        <table>
          <tbody>
            {this.props.experiments.map((experiment, id) => (
              <tr key={`experiment_${id}`}>
                <td>{experiment.text}</td>
                <td><button className='btn btn-primary' onClick={() => this.selectForEdit(id)}>edit</button></td>
                <td><button className='btn btn-primary' onClick={() => this.props.deleteExperiment(id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </CardBody>
      </Card>
    )
  }
}


const mapStateToProps = state => {
  return {
    experiments: state.experiments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addExperiment: (text) => {
      dispatch(experiments.addExperiment(text));
    },
    updateExperiment: (id, text) => {
      dispatch(experiments.updateExperiment(id, text));
    },
    deleteExperiment: (id) => {
      dispatch(experiments.deleteExperiment(id));
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExperimentList);