import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <h1>
          <p>
            I am a message {this.props.text}.
          </p>
      </h1>
    );
  }
};

class MessageAlert extends Component {
    render() {
      return (
        <h1>
            <p>
              I am a message {this.props.text}.
            </p>
        </h1>
      );
    }
}

export default Message;
export {MessageAlert as MessageAlert} ;
