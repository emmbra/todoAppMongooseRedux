import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Message, Button } from 'semantic-ui-react';
import { signOut } from '../../actions/auth';

class SignOut extends Component {
  
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <Container>
        <Message error header="We're sorry to see you go :("/>
        <Button as={Link} to='/' content='Go back to sign up'/>
      </Container>
    )
  }
}

// when not using mapStateToProps, must pass null
// now have access to this.props.signOut
export default connect(null, { signOut })(SignOut);
