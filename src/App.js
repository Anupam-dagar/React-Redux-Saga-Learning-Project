import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "./actions/authactions";
import { logoutUser } from "./actions/authactions";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import "semantic-ui-css/semantic.min.css";
import Home from "./Components/Home";

class App extends Component {
  state = {};
  componentDidMount = () => {
    this.props.getUserProfile();
    this.setState({
      isLoading: true,
      isAuthenticated: this.props.isAuthenticated
    });
  };

  componentDidUpdate = newprops => {
    const newstate = {};
    let change = false;
    if (newprops.isLoading !== this.props.isLoading) {
      newstate.isLoading = this.props.isLoading;
      change = true;
    }
    if (newprops.isAuthenticated !== this.props.isAuthenticated) {
      newstate.isAuthenticated = this.props.isAuthenticated;
      change = true;
    }
    if (change) {
      this.setState(newstate);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading your page!</div>;
    }
    if (this.state.isAuthenticated) {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/login" render={() => <Redirect to="/" />} />
              <Route path="/signup" render={() => <Redirect to="/" />} />
              <Route path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getUserProfile, logoutUser })(App);
