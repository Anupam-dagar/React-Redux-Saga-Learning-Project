import React, { Component } from "react";
import { Divider, Accordion, Icon, Label, Card, List } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import RestaurantModal from "./Addrestaurantmodal";
import CollaboratorPopup from "./Collaboratorpopup";
import Collectioneditmodal from "./Collectioneditmodal";
import { wsConnect, wsDisconnect } from "../actions/websocketactions";
import Spinner from "./Spinner";

class CollectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: this.props.collection,
      activeIndex: this.props.activeIndex,
      itemIndex: this.props.itemIndex,
      restaurants: this.props.restaurants
    };
  }

  componentDidMount() {
    const collectionId = this.state.collection.id;
    if (collectionId) {
      this.connectAndJoin(collectionId);
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const collectionId = this.state.collection.id;
    const host = `ws://localhost:8000/ws/collections/${collectionId}/`;
    dispatch(wsDisconnect(host));
  }

  connectAndJoin = collectionId => {
    const { dispatch } = this.props;
    const host = `wss://${process.env.REACT_APP_BACKEND_ENDPOINT}/ws/collections/${collectionId}/`;
    dispatch(wsConnect(host));
  };

  componentDidUpdate(newprops) {
    if (newprops.activeIndex !== this.props.activeIndex) {
      this.setState({ activeIndex: this.props.activeIndex });
    }
    if (newprops.itemIndex !== this.props.itemIndex) {
      this.setState({ itemIndex: this.props.itemIndex });
    }
    if (newprops.collection !== this.props.collection) {
      this.setState({ collection: this.props.collection });
    }
    if (newprops.restaurants !== this.props.restaurants) {
      this.setState({ restaurants: this.props.restaurants });
    }
  }

  render() {
    const { activeIndex, itemIndex, collection } = this.state;

    return (
      <>
        <Accordion.Title
          active={activeIndex === itemIndex}
          index={itemIndex}
          onClick={(e, titleProps) =>
            this.props.handler(e, titleProps, collection.name)
          }
        >
          <span style={{ color: "black" }}>
            {itemIndex + 1}. {collection.name}
          </span>
          <Label circular style={{ float: "right" }} as="a">
            {collection.collaborators.length} Collaborators
          </Label>
          {collection.user.username === this.props.currentUser.username ? (
            <Icon
              style={{ float: "right", color: "#FFBB48" }}
              name="chess queen"
            />
          ) : (
            ""
          )}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === itemIndex}>
          <RestaurantModal collectionId={collection.id} />
          <CollaboratorPopup
            collectionOwner={collection.user.id}
            collectionId={collection.id}
            collaborators={collection.collaborators}
          />
          <Collectioneditmodal
            collections={this.props.collections}
            collectionId={collection.id}
          />
          <Divider hidden />
          <Card.Group itemsPerRow={5}>
            {this.props.resturantIsLoading ? (
              <Spinner />
            ) : (
              this.state.restaurants.map((restaurantData, index) => (
                <Card key={index} raised>
                  <Card.Content>
                    <Label
                      as="a"
                      ribbon="right"
                      onClick={() =>
                        this.props.deleteHandler(
                          this.props.currentUser.id,
                          collection.name,
                          restaurantData.restaurant.id
                        )
                      }
                    >
                      <Icon name="close" style={{ opacity: 1 }} color="red" />
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
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Tuesday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Wednesday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Thursday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Friday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Saturday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}
                      </List.Item>
                      <List.Item>
                        <List.Header>Sunday</List.Header>
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
                              "hh:mm A"
                            ).format("hh:mm A")}{" "}
                        to{" "}
                        {restaurantData.restaurant.closing_time.sunday ===
                        undefined
                          ? "Closed"
                          : moment(
                              restaurantData.restaurant.closing_time.sunday,
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
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  collections: state.collections.collections.results,
  resturantIsLoading: state.collections.resturantIsLoading
});

export default connect(mapStateToProps, null)(CollectionItem);
