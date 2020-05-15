import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
// import containers first
import Counter from './../../containers/Counter';
import AllTodosList from './../../containers/AllTodosList';
import SignUp from './../../containers/signUp';
// import components second
import Navbar from "./../../components/Navbar";



class App extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 700 }}>
          <Navbar />
          <Route exact path='/' component={SignUp}/>
          <Route exact path='/alltodos' component={AllTodosList}/>
          <Route exact path='/counter' component={Counter}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
