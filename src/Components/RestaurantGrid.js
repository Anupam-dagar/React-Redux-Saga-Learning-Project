import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllRestaurants } from "../actions/restaurantactions";
import moment from "moment";
import _ from "lodash";
import Spinner from "./Spinner";
import Collectionpopup from "./Collectionpopup";
import { getCollections } from "../actions/collectionsactions";
import '../App.css';


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
    this.props.getAllRestaurants(1);
    this.setState({ today: moment().format('dddd').toLowerCase()});
  }

  componentDidUpdate(newprops) {
    if (newprops.isLoading && !this.props.isLoading) {
      this.setState({ data: this.props.data });
    }
  }

  addCollection(e) {
    console.log(e.target.textContent);
  }

  render() {
    if (
      this.props.isLoading ||
      this.props.isLoading === undefined ||
      this.state.data == null
    ) {
      return <Spinner />;
    }
    return (
      <div style={{ marginLeft: 20, marginRight: 20, overflowX:"auto" }}>
        <Table celled singleLine sortable columns={8}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                textAlign="center"
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
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Opens At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Close At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.data.map((restaurantData, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Collectionpopup restaurantId={restaurantData.id} content={restaurantData.restaurant.name} />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'monday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'monday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.monday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.monday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'monday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'monday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.monday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.monday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'tuesday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'tuesday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.tuesday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.tuesday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'tuesday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'tuesday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.tuesday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.tuesday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'wednesday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'wednesday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.wednesday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.wednesday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'wednesday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'wednesday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.wednesday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.wednesday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'thursday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'thursday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.thursday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.thursday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'thursday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'thursday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.thursday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.thursday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'friday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'friday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.friday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.friday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'friday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'friday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.friday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.friday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'saturday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'saturday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.saturday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.saturday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'saturday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'saturday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.saturday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.saturday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'sunday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'sunday' ? 'customfilter' : "")}
                >
                  {restaurantData.opening_time.sunday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.opening_time.sunday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className={(this.state.today === 'sunday' ? "customcell" : "") + " " + (this.props.filterDay && this.props.filterDay.toLowerCase() === 'sunday' ? 'customfilter' : "")}
                >
                  {restaurantData.closing_time.sunday === undefined
                    ? "Closed"
                    : moment(
                        restaurantData.closing_time.sunday,
                        "hh:mm A"
                      ).format("hh:mm A")}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  prev: state.restaurant.restaurants.prev,
  next: state.restaurant.restaurants.next,
  count: state.restaurant.restaurants.count,
  data: state.restaurant.restaurants.results,
  isLoading: state.restaurant.isLoading,
  error: state.restaurant.error,
  filterDay: state.restaurant.day
});

export default connect(mapStateToProps, { getAllRestaurants, getCollections })(
  RestaurantGrid
);
