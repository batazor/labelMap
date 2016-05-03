import React, { Component } from 'react'

import '../style/base.styl'

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
