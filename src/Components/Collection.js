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
  Button,
  Grid
} from "semantic-ui-react";
import Spinner from "./Spinner";
import RestaurantModal from "./Addrestaurantmodal";
import CollaboratorPopup from "./Collaboratorpopup";
import CreateCollectionModal from "./Createcollectionmodal";

import {
  getCollections,
  getRestaurantCollection,
  getRestaurantInCollection,
  deleteRestaurantInCollection
} from "../actions/collectionsactions";
import moment from "moment";
import Collectioneditmodal from "./Collectioneditmodal";
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

  handleDeleteRestaurantInCollection(userId, collectionName, restaurantId) {
    this.props.deleteRestaurantInCollection(
      userId,
      collectionName,
      restaurantId
    );
  }

  componentDidMount() {
    this.props.getCollections(this.props.currentUser.id);
  }

  componentDidUpdate(newprops) {
    if (newprops.collections !== this.props.collections) {
      this.setState({ collections: this.props.collections });
    }
    if (newprops.restaurants !== this.props.restaurants) {
      this.setState({ restaurants: this.props.restaurants });
    }
    if (newprops.addedCollection !== this.props.addedCollection) {
      this.setState({
        restaurants: [...this.state.restaurants, this.props.addedCollection]
      });
    }
    if (newprops.deleteSuccess !== this.props.deleteSuccess) {
      this.setState({ restaurants: this.props.restaurantData.results });
    }
    if (newprops.editedCollection !== this.props.editedCollection) {
      const collections = this.state.collections;
      const collectionIndex = collections.findIndex(
        x => x.id === this.props.editedCollection.id
      );
      collections[collectionIndex] = this.props.editedCollection;
      this.setState({ collections });
    }
    if (newprops.newCollection !== this.props.newCollection) {
      this.setState({
        collections: [...this.state.collections, this.props.newCollection]
      });
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
        <CreateCollectionModal collections={this.props.collections} />
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
                <CollaboratorPopup
                  collectionOwner={value.user.id}
                  collectionId={value.id}
                  collaborators={value.collaborators}
                />
                <Collectioneditmodal
                  collections={this.props.collections}
                  collectionId={value.id}
                />
                <Divider hidden />
                <Card.Group itemsPerRow={5}>
                  {this.props.resturantIsLoading ||
                  this.props.resturantIsLoading === undefined ? (
                    <Spinner />
                  ) : (
                    this.state.restaurants.map((restaurantData, index) => (
                      <Card key={index} raised>
                        <Card.Content>
                          <Label
                            as="a"
                            ribbon="right"
                            onClick={() =>
                              this.handleDeleteRestaurantInCollection(
                                this.props.currentUser.id,
                                value.name,
                                restaurantData.restaurant.id
                              )
                            }
                          >
                            <Icon
                              name="close"
                              style={{ opacity: 1 }}
                              color="red"
                            />
                          </Label>
                          <Card.Header
                            style={{
                              marginBottom: "-0.5em",
                              marginTop: "0.3em"
                            }}
                          >
                            {restaurantData.restaurant.restaurant.name}
                          </Card.Header>
                        </Card.Content>
                        <Card.Content>
                          <List verticalAlign="middle">
                            <List.Item>
                              <List.Header>Monday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Tuesday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Wednesday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Thursday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Friday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Saturday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}
                            </List.Item>
                            <List.Item>
                              <List.Header>Sunday</List.Header>
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
                                    "hh:mm A"
                                  ).format("hh:mm A")}{" "}
                              to{" "}
                              {restaurantData.restaurant.closing_time.sunday ===
                              undefined
                                ? "Closed"
                                : moment(
                                    restaurantData.restaurant.closing_time
                                      .sunday,
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
        <Divider hidden />
        <Grid centered>
          <Label basic size="large">
            <Icon name="chess queen" style={{ color: "#FFBB48" }} /> Collection
            Owner
          </Label>
        </Grid>
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
  addedCollection: state.collections.addedCollection,
  deleteSuccess: state.collections.success,
  restaurantData: state.collections.restaurantData,
  editedCollection: state.collections.collection,
  newCollection: state.collections.newCollection
});

export default connect(mapStateToProps, {
  getCollections,
  getRestaurantCollection,
  getRestaurantInCollection,
  deleteRestaurantInCollection
})(Collection);
