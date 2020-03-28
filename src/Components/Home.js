import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { Switch, Route } from "react-router-dom";
import Collection from "./Collection";
import { Container, Divider, Label } from "semantic-ui-react";
import SearchBar from "./Searchbar";
import RestaurantGrid from "./RestaurantGrid";
import PaginationBar from "./Paginationbar";

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
            <Container fluid>
              <Container>
                <SearchBar />
              </Container>
              <Container textAlign="center">
                <PaginationBar />
                <Label.Group style={{marginTop:5, marginBottom:5}} circular>
                  <Label color="purple" horizontal>
                    Today
                  </Label>
                  <Label color="orange" horizontal>
                    Filtered Day
                  </Label>
                </Label.Group>
              </Container>
              <RestaurantGrid />
              <Divider hidden />
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
