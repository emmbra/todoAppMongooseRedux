import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Header, Form, Segment, Message, List, Pagination, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserTodos, updateCompleteUserTodoById, deleteTodoById } from '../../actions/allTodosActions';
import { ADD_USER_TODO, ADD_USER_TODO_ERROR } from '../../actions/types';
import axios from 'axios';
import requireAuth from './../../hoc/requireAuth';
import UserTodoListItems from './UserTodoListItems';

class UserTodoList extends Component {

  state = {
    activePage: 1,
    start: 0,
    end: 10,
  }

  // get usertodos on page load
  componentDidMount() {
    this.props.getUserTodos();
  }

  onSubmit = async (formValues, dispatch) => {
    try {
      await axios.post('/api/user/todos', formValues, { headers: { 'authorization': localStorage.getItem('token') }});
      dispatch({ type: ADD_USER_TODO });
      this.props.getUserTodos();
    } catch (error) {
      dispatch({ type: ADD_USER_TODO_ERROR, payload: 'You must provide text!' })
    }
  }

  // props from input
  // error validation from meta
  renderAddTodo = ({ input, meta, language }) => {
    return (
      <Form.Input 
        {...input}
        error={ meta.touched && meta.error }
        autoComplete='off'
        placeholder={ language === 'portuguese' ? 'adicione uma tarefa' : 'Add a todo' }
      />
    );
  }

  handlePageChange = (event, data) => {
    // console.log(event);
    // console.log(data);
    this.setState({
      activePage: data.activePage,
      start: data.activePage === 1 ? 0 : data.activePage * 10 - 10,
      end: data.activePage * 10
    })
  }

  render() {
    // destructure handleSubmit function from redux-form
    const { handleSubmit } = this.props;
    console.log(this.props.userTodos);
    return (
      <div>
        <Header as='h2' color='teal' textAlign='center' content='Welcome to the todo app'/>
        {/* pass onSubmit prop */}
        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <Field
              name='text'
              component={this.renderAddTodo}
              language='english'
            />
            {/* type submit just calls handleSubmit function */}
            <Button 
            type='submit' 
            fluid 
            color='teal' 
            content='Add a todo'/>
          </Segment>
        </Form>
        <List animated divided selection>
            <UserTodoListItems 
              todos={this.props.userTodos.slice(this.state.start, this.state.end)} 
              handleUpdate={this.props.updateCompleteUserTodoById}
              handleDelete={this.props.deleteTodoById}
            />
          </List>
          { this.props.userTodos.length === 0 ?
            null
            : <Pagination 
              totalPages={ Math.ceil(this.props.userTodos.length / 10) }
              activePage={ this.state.activePage }
              onPageChange={ (event, data) => this.handlePageChange(event, data) }
            />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userTodos: state.todos.userTodos, 
    todoClientError: state.todos.getUserTodosClientError,
    todoServerError: state.todos.getUserTodosServerError
  };
};

// three ways to connect this

// export default reduxForm({ form: 'addTodo' })(connect(mapStateToProps, { getUserTodos })(UserTodoList));
// export default connect(mapStateToProps, { getUserTodos })(reduxForm({ form: 'addTodo' })(UserTodoList))

// const composedComponent = connect(mapStateToProps, { getUserTodos })(UserTodoList);
// export default reduxForm({ form: 'addTodo' })(composedComponent);

const composedComponent = compose(
  reduxForm({ form: 'addTodo' }),
  connect(mapStateToProps, { getUserTodos, updateCompleteUserTodoById, deleteTodoById })
)(UserTodoList);

export default requireAuth(composedComponent);
