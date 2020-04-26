import React, { Fragment } from 'react';

export class Layout extends React.Component {
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
