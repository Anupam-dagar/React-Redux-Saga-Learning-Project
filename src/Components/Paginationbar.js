import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";
import Spinner from "./Spinner";
import {
  getAllRestaurants,
  getFilterRestaurants,
  getNamedRestaurants
} from "../actions/restaurantactions";

class PaginationBar extends Component {
  state = {
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true
  };

  handlePaginationChange = (e, { activePage }) => {
    if (
      (this.props.searchValue === "" || this.props.searchValue === undefined) &&
      (this.props.day === "" || this.props.day === undefined) &&
      (this.props.time === "" || this.props.time === undefined)
    ) {
      this.props.getAllRestaurants(activePage);
    }
    if (this.props.searchValue !== "" && this.props.searchValue !== undefined) {
      if (this.props.day !== "" && this.props.day !== undefined) {
        this.props.getFilterRestaurants(
          activePage,
          this.props.day,
          this.props.time,
          this.props.searchValue
        );
      } else {
        this.props.getNamedRestaurants(activePage, this.props.searchValue);
      }
    }
    if (
      this.props.day !== "" &&
      this.props.day !== undefined &&
      (this.props.searchValue === "" || this.props.searchValue === undefined)
    ) {
      this.props.getFilterRestaurants(
        activePage,
        this.props.day,
        this.props.time,
        this.props.searchValue
      );
    }
  };
  render() {
    const {
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav
    } = this.state;

    if (this.props.isLoading || this.props.isLoading === undefined) {
      return <Spinner />;
    }
    return (
      <Pagination
        activePage={this.props.currentPage}
        boundaryRange={boundaryRange}
        onPageChange={this.handlePaginationChange}
        size="mini"
        siblingRange={siblingRange}
        totalPages={this.props.numPages}
        ellipsisItem={showEllipsis ? undefined : null}
        firstItem={showFirstAndLastNav ? undefined : null}
        lastItem={showFirstAndLastNav ? undefined : null}
        prevItem={showPreviousAndNextNav ? undefined : null}
        nextItem={showPreviousAndNextNav ? undefined : null}
      />
    );
  }
}

const mapStateToProps = state => ({
  prevPage: state.restaurant.restaurants.prevPage,
  nextPage: state.restaurant.restaurants.nextPage,
  currentPage: state.restaurant.restaurants.currentPage,
  numPages: state.restaurant.restaurants.numPages,
  isLoading: state.restaurant.isLoading,
  error: state.restaurant.error,
  currentAction: state.restaurant.currentAction,
  day: state.restaurant.day,
  time: state.restaurant.time,
  name: state.restaurant.name,
  searchValue: state.restaurant.searchValue
});

export default connect(mapStateToProps, {
  getAllRestaurants,
  getFilterRestaurants,
  getNamedRestaurants
})(PaginationBar);
