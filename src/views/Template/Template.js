import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { templates } from '../../actions';


class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTemplate: false,
    }
  }

  handleShowTemplate = () => {
    // dispatches actions to change state
    this.setState({showTemplate: !this.state.showTemplate})
    this.props.showTemplate(this.state.showTemplate);
    console.log(this.state.showTemplate)
    //console.log(this.props.getTemplateStatus(false))
  };

  render() {

    return (
        <div className="animated fadeIn">
            <h1>Template</h1>
            <button className={this.state.showTemplate?'btn btn-success':'btn btn-danger'} onClick={this.handleShowTemplate}>
                Change Template Status
            </button>
        </div>
    )
  }
}


const mapStateToProps = state => {
    return {
      templates: state.templates,
    }
}
  
const mapDispatchToProps = dispatch => {
return {
        showTemplate: (status) => {
            dispatch(templates.showTemplate(status));
            },
        
        getTemplateStatus: (status) => {
            dispatch(templates.getTemplateStatus(status));
            },
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);



export { Template };
