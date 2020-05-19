import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    //after the component renders on page
    componentDidMount() {
      this.shouldNavigateAway();
    }

    //after the component has updated its state
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
  
    shouldNavigateAway() {
      if(!this.props.authenticated) {
        this.props.history.push('/')
      }
    }

    render() {
      return <ChildComponent {...this.props} />
    }

  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
}
