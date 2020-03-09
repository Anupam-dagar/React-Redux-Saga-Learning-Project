import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import {
  getNamedRestaurants,
  getAllRestaurants
} from "../actions/restaurantactions";

class Searchinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  componentDidUpdate() {
    if (this.state.value === "") {
      this.props.getAllRestaurants(1);
    } else {
      this.props.getNamedRestaurants(1, this.state.value);
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
