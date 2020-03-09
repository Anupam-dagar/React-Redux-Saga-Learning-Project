import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import {
  getNamedRestaurants,
  getAllRestaurants
} from "../actions/restaurantactions";
import _ from "lodash";

class Searchinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.delayedRequest = _.debounce(this.delayedRequest, 500);
  }

  handleChange = e => {
    console.log(this.state.value, "before");
    this.setState({ value: e.target.value });
  };

  delayedRequest = () => {
    this.props.getNamedRestaurants(1, this.state.value);
  };

  componentDidUpdate() {
    if (this.state.value === "") {
      this.props.getAllRestaurants(1);
    } else {
      this.delayedRequest();
    }
  }
  render() {
    return (
      <Input
        icon="search"
        onChange={this.handleChange}
        placeholder="Search..."
      />
    );
  }
}

export default connect(null, { getNamedRestaurants, getAllRestaurants })(
  Searchinput
);
