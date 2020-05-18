import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { email, length, required } from 'redux-form-validators';
import axios from 'axios';
import { AUTH_USER, AUTH_USER_ERROR } from '../../actions/types';

class SignUp extends Component {

  onSubmit = async (formValues, dispatch) => {
    // console.log(formValues) = email and password from user submit
    try {
      const { data } = await axios.post('/api/auth/signup', formValues);
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
    // console.log(this.props);
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
        <Segment stacked>
          <Field
            name='email'
            validate={
              [
                required({ msg: 'Email is required!'}),
                email({ msg: 'You must provide a valid email address!' })
              ]
            }
            component={this.renderEmail}
          />
          <Field
            name='password'
            validate={
              [
                required({ msg: 'Password is required!' }),
                length({ minimum: 6, msg: 'Password must be at least 6 characters long!' })
              ]
            }
            component={this.renderPassword}
          />
          <Button
            content="Sign Up"
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
};
// formValues can access any field with a name value
// formValues.email is now accessible
const asyncValidate = async({ email }) => {
  try {
    // create ? variable for email api call to get email from req.query
    const { data } = await axios.get(`/api/user/emails?email=${email}`);
    // const foundEmail = data.some(user => user.email === email);
    if(data) {
      // throw new Error goes automatically to catch block
      throw new Error();
    }
  } catch (error) {
    throw { email: 'Nice try, but that email is already taken!'}
  }
};

// not importing connect
// using reduxForm for connect
export default reduxForm({ 
  form: 'SignUp',
  asyncValidate,
  asyncChangeFields: ['email']
})(SignUp);
