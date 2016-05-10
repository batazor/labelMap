import React, { Component } from 'react'

let divStyle = {
  background: 'green'
};

export default class Bar extends Component {
  render() {
    return (
      <div style={divStyle}>
        And I am Bar!
      </div>
    );
  }
}
