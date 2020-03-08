import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";
import Spinner from "./Spinner";
import { getAllRestaurants } from "../actions/restaurantactions";

class PaginationBar extends Component {
  state = {
    activePage: 5,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 50
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props, "a");
  }

  handlePaginationChange = (e, { activePage }) => {
      this.props.getAllRestaurants(activePage);
  }
  render() {
    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
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
  error: state.restaurant.error
});

export default connect(mapStateToProps, { getAllRestaurants })(PaginationBar);
