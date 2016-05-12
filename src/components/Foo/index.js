// import React, { Component } from 'react'
//
// export default class Foo extends Component {
//   render() {
//     return (
//       <div>And I am Foo!</div>
//     );
//   }
// }

import styles from './ScopedSelectors.css';

import React, { Component } from 'react';

export default class ScopedSelectors extends Component {

  render() {
    return (
      <div className={ styles.root }>
        <p className={ styles.text }>Scoped Selectors</p>
      </div>
    );
  }

};
