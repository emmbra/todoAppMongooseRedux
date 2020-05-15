import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllTodos } from '../../actions/allTodosActions';

class AllTodosList extends Component {

  // fires once after render to preload data
  // this makes the api call that preloads data onto the page
  // if you were waiting for a button click, would go in another function
  componentDidMount() {
    this.props.getAllTodos();
  }

  renderTodoList = () => {
    if(this.props.todos.length === 0) {
      return <Header content='No todos found!'/>
    } else {
      return this.props.todos.map( ({ _id, text, dateCreated }) => {
        return (
          <List.Item key={_id}>
          <List.Content>
            <List.Header>{text}</List.Header>
            <List.Description>Created: {moment(dateCreated).fromNow()}</List.Description>
          </List.Content>
        </List.Item>
        )
      })
    }

  }
  
  render() {
    return (
      <List>
        { this.renderTodoList() }
      </List>
    );
  }
}

// take state out of store and turn into props for this container
function mapStateToProps({ todos: { todos, getAllTodosError }}) {
  return { todos, getAllTodosError }
}

// this.props.todos
// this.props.getAllTodosError

export default connect(mapStateToProps, { getAllTodos })(AllTodosList);
