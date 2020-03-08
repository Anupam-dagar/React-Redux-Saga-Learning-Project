import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { Switch, Route } from "react-router-dom";
import Collection from "./Collection";
import { Container, Card, Image, Button, Menu, Input } from "semantic-ui-react";
import SearchBar from "./Searchbar";
import RestaurantGrid from "./RestaurantGrid";

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
            <Container>
              <SearchBar />
              <RestaurantGrid />
            </Container>
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
