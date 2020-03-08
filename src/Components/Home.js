import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { Switch, Route } from "react-router-dom";
import Collection from "./Collection";

class Home extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path={`${this.props.match.path}collections`}>
            <Collection />
          </Route>
          <Route path={this.props.match.path}>
            <h3>hello</h3>
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, null)(Home);
