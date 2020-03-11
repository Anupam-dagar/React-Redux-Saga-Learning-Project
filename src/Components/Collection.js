import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Divider,
  Accordion,
  Icon,
  Label,
  Header,
  Card,
  List,
  Button
} from "semantic-ui-react";
import Spinner from "./Spinner";
import RestaurantModal from "./Addrestaurantmodal";

import {
  getCollections,
  getRestaurantCollection,
  getRestaurantInCollection
} from "../actions/collectionsactions";
import moment from "moment";
class Collection extends Component {
  state = { activeIndex: -1, collections: [], restaurants: [] };

  handleClick = (e, titleProps, collectionName) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.props.getRestaurantInCollection(
      this.props.currentUser.id,
      collectionName
    );
    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    this.props.getCollections(this.props.currentUser.id);
  }

  componentDidUpdate(newprops) {
    console.log(this.state,'sate');
    if(newprops.collections !== this.props.collections) {
      this.setState({collections: this.props.collections});
    }
    if (newprops.restaurants !== this.props.restaurants) {
      this.setState({restaurants: this.props.restaurants})
    }
    if(newprops.addedCollection !== this.props.addedCollection){
      this.setState({restaurants: [...this.state.restaurants, this.props.addedCollection]});
    }
  }

  render() {
    if (this.props.isLoading || this.props.isLoading === undefined) {
      return <Spinner />;
    }
    const { activeIndex } = this.state;
    return (
      <Container>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>
            {this.props.collectionsCount} Collections
          </Header.Content>
        </Header>
        <Accordion fluid styled>
          {this.state.collections.map((value, index) => (
            <>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={(e, titleProps) =>
                  this.handleClick(e, titleProps, value.name)
                }
              >
                <span style={{ color: "black" }}>
                  {index + 1}. {value.name}
                </span>
                <Label circular style={{ float: "right" }} as="a">
                  {value.collaborators.length} Collaborators
                </Label>
                {value.user.username === this.props.currentUser.username ? (
                  <Icon
                    style={{ float: "right", color: "#FFBB48" }}
                    name="chess queen"
                  />
                ) : (
                  ""
                )}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <RestaurantModal collectionId={value.id} />
                <Button icon labelPosition="right" compact circular>
                  Add a collaborator <Icon name="add" />
                </Button>
                <Divider hidden />
                <Card.Group itemsPerRow={5}>
                  {this.props.resturantIsLoading ||
                  this.props.resturantIsLoading === undefined ? (
                    <Spinner />
                  ) : (
                    this.state.restaurants.map((value, index) => (
                      <Card key={index} raised>
                        <Card.Content>
                          <Card.Header
                            style={{
                              marginBottom: "-0.5em",
                              marginTop: "0.3em"
                            }}
                          >
                            {value.restaurant.restaurant.name}
                          </Card.Header>
                        </Card.Content>
                        <Card.Content>
                          <List verticalAlign="middle">
                            <List.Item>
                              <List.Header>Monday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Tuesday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Wednesday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Thursday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Friday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Saturday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Sunday</List.Header>
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {value.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    value.restaurant.closing_time.sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                          </List>
                        </Card.Content>
                      </Card>
                    ))
                  )}
                </Card.Group>
              </Accordion.Content>
            </>
          ))}
        </Accordion>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  collections: state.collections.collections.results,
  isLoading: state.collections.isLoading,
  collectionsCount: state.collections.collections.count,
  restaurants: state.collections.restaurants.results,
  resturantIsLoading: state.collections.resturantIsLoading,
  addedCollection: state.collections.addedCollection
});

export default connect(mapStateToProps, {
  getCollections,
  getRestaurantCollection,
  getRestaurantInCollection
})(Collection);
