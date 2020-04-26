import React from 'react';

const MasterPage: any = C => (component: any) => {
  class WrapperComponent extends component {
    render() {
      return React.createElement(C, {
        children: React.createElement(component, this.props),
      });
    }
  }
  return WrapperComponent;
};

export default MasterPage;
