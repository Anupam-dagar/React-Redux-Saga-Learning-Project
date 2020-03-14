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
import CreateCollectionModal from "./Createcollectionmodal";

import {
  getCollections,
  getRestaurantCollection,
  getRestaurantInCollection,
  deleteRestaurantInCollection
} from "../actions/collectionsactions";
import CollectionItem from "./Collectionitem";
import { websocketRemoveMessage } from "../actions/websocketactions";
import { bindActionCreators } from "redux";

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

  handleDeleteRestaurantInCollection = (
    userId,
    collectionName,
    restaurantId
  ) => {
    const { dispatch } = this.props;
    dispatch(
      websocketRemoveMessage({ user: userId, collectionName, restaurantId })
    );
  };

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
            <CollectionItem
              key={index}
              deleteHandler={this.handleDeleteRestaurantInCollection}
              handler={this.handleClick}
              collection={value}
              restaurants={this.state.restaurants}
              activeIndex={activeIndex}
              itemIndex={index}
            />
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      {
        getCollections,
        getRestaurantCollection,
        getRestaurantInCollection,
        deleteRestaurantInCollection
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
