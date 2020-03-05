import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "./actions/authactions";
import { logoutUser } from "./actions/authactions";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  componentDidMount = () => {
    this.props.getUserProfile();
  };

  handleClick = event => {
    event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </BrowserRouter>
        {this.props.currentUser.username ? (
          <button onClick={this.handleClick}>Log Out</button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { getUserProfile, logoutUser })(App);
