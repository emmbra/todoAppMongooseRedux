import React, { Component } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions/counterActions';

class Counter extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column textAlign="center">
          <Header
            as="h1"
            textAlign="center"
            content="Welcome to the Counter App"
          />
          <Header as="h2" textAlign="center">
            Counter: <span>{this.props.counter}</span>
          </Header>
          <Button.Group>
            <Button 
              icon="minus circle" 
              content="Decrement" 
              negative 
              labelPosition='left'
              onClick={this.props.decrement}
            />
            <Button.Or />
            <Button
              icon="plus circle"
              content="Increment"
              positive
              labelPosition="right"
              onClick={this.props.increment}
            />
          </Button.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

// connect takes two parameters.
// 1: function that we should call mapStateToProps
// 2: mapDispatchToProps. This is an object.
//  object is action creators we want connected to component

function mapStateToProps(state) {
  return { counter: state.counter };
}

// connect is a higher order component
// what this will do is now inside counter component
// i will have access to:
// this.props.counter
// this.props.increment
// this.props.decrement
export default connect(mapStateToProps, { increment, decrement })(Counter);
