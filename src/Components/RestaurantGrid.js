import React, { Component } from "react";
import { Card, Image, Button, Dimmer, Loader, Table } from "semantic-ui-react";
import logo from "../logo.png";
import { connect } from "react-redux";
import { getAllRestaurants } from "../actions/restaurantactions";
import moment from "moment";
import _ from "lodash";

class RestaurantGrid extends Component {
  state = {
    column: null,
    data: null,
    direction: null
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, o => o.restaurant.name),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };
  componentDidMount() {
    this.props.getAllRestaurants();
    this.setState({ today: moment().isoWeekday() - 1 });
  }

  componentDidUpdate(newprops) {
    if (newprops.isLoading && !this.props.isLoading) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    if (
      this.props.isLoading ||
      this.props.isLoading === undefined ||
      this.state.data == null
    ) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <Table celled sortable columns={8}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              rowSpan="2"
              sorted={
                this.state.column === "name" ? this.state.direction : null
              }
              onClick={this.handleSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Monday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Tuesday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Wednesday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Thursday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Friday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Saturday
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Sunday
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
            <Table.HeaderCell>Opens At</Table.HeaderCell>
            <Table.HeaderCell>Close At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data.map((restaurantData, index) => (
            <Table.Row key={index}>
              <Table.Cell>{restaurantData.restaurant.name}</Table.Cell>
              <Table.Cell positive={this.state.today === 0 ? true : false}>
                {moment(restaurantData.opening_time["0"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 0 ? true : false}>
                {moment(restaurantData.closing_time["0"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 1 ? true : false}>
                {moment(restaurantData.opening_time["1"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 1 ? true : false}>
                {moment(restaurantData.closing_time["1"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 2 ? true : false}>
                {moment(restaurantData.opening_time["2"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 2 ? true : false}>
                {moment(restaurantData.closing_time["2"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 3 ? true : false}>
                {moment(restaurantData.opening_time["3"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 3 ? true : false}>
                {moment(restaurantData.closing_time["3"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 4 ? true : false}>
                {moment(restaurantData.opening_time["4"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 4 ? true : false}>
                {moment(restaurantData.closing_time["4"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 5 ? true : false}>
                {moment(restaurantData.opening_time["5"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 5 ? true : false}>
                {moment(restaurantData.closing_time["5"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 6 ? true : false}>
                {moment(restaurantData.opening_time["6"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
              <Table.Cell positive={this.state.today === 6 ? true : false}>
                {moment(restaurantData.closing_time["6"], "hh:mm A").format(
                  "hh:mm A"
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  prev: state.restaurant.restaurants.prev,
  next: state.restaurant.restaurants.next,
  count: state.restaurant.restaurants.count,
  data: state.restaurant.restaurants.results,
  isLoading: state.restaurant.isLoading,
  error: state.restaurant.error
});

export default connect(mapStateToProps, { getAllRestaurants })(RestaurantGrid);
