import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { email, required } from 'redux-form-validators';
import axios from 'axios';
import { AUTH_USER, AUTH_USER_ERROR } from '../../actions/types'

class SignIn extends Component {

  //when user submits form, send formValues to /api/auth/signin
  //set the token coming from data into localStorage under the key 'token'
  //dispatch the action to the reducer to set the token s the state for authentication
  //redirect the user to the /counter route

  onSubmit = async (formValues, dispatch) => {
    // console.log(formValues) = email and password from user submit
    try {
      const { data } = await axios.post('/api/auth/signin', formValues);
      // console.log(data);
      // data is the token
      // make token persist through page refresh
      localStorage.setItem('token', data.token);
      // dispatch token to set state in authReducer
      dispatch({ type: AUTH_USER, payload: data.token });
      // on successful signup, redirect user to new page
      this.props.history.push('/counter');
    } catch (error) {
      dispatch({ type: AUTH_USER_ERROR, payload: error })
    }
  }

  renderEmail = ({ input, meta }) => {
    // console.log(input);
    // console.log(meta);
    return (
      <Form.Input
        {...input}
        fluid
        error={ meta.touched && meta.error }
        icon='user'
        iconPosition='left'
        autoComplete='off'
        placeholder='Email address'
      />
    )
  }

  renderPassword = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        type='password'
        fluid
        error={ meta.touched && meta.error }
        icon='lock'
        iconPosition='left'
        autoComplete='off'
        placeholder='Password'
      />
    )
  }

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <Form size='large' onSubmit={handleSubmit(this.onSubmit)} >
        <Segment stacked>
          <Field
            name='email'
            component={this.renderEmail}
            validate={
              [
                required({ msg: 'Email is required!' }),
                email({ msg: 'You must provide a valid email address!' })
              ]
            }
          />
          <Field
            name='password'
            component={this.renderPassword}
            validate={
              [
                required({ msg: 'You must provide a password!' })
              ]
            }
          />
          <Button
            content='Sign In'
            color='teal'
            fluid
            size='large'
            type='submit'
            disabled={ invalid || submitting || submitFailed }
          />
        </Segment>
      </Form>
    )
  }
}

export default reduxForm({ form: 'SignIn' })(SignIn);