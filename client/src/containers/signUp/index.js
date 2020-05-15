import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { email, length, required } from 'redux-form-validators';
import axios from 'axios';



class SignUp extends Component {

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

  render() {
    return (
      <Form size='large'>
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
        </Segment>
      </Form>
    )
  }
};
// formValues can access any field with a name value
// formValues.email is now accessible
const asyncValidate = async({ email }) => {
  try {
    const { data } = await axios.get('/api/user/emails');
    const foundEmail = data.some(user => user.email === email);
    if(foundEmail) {
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
