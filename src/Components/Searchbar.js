import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import Filterinput from "./Filterinput";
import Searchinput from "./Searchinput";
import {
  getNamedRestaurants,
  getAllRestaurants,
  getFilterRestaurants
} from "../actions/restaurantactions";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      queryDay: "",
      queryTime: ""
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(data) {
    this.setState(data);
  }

  componentDidUpdate() {
    if (
      this.state.value === "" &&
      this.state.queryDay === "" &&
      this.state.queryTime === ""
    ) {
      this.props.getAllRestaurants(1);
    }
    if (this.state.value !== "") {
      if (this.state.queryDay !== "") {
        this.props.getFilterRestaurants(
          1,
          this.state.queryDay,
          this.state.queryTime,
          this.state.value
        );
      } else {
        this.props.getNamedRestaurants(1, this.state.value);
      }
    }
    if (this.state.queryDay !== "" && this.state.value === "") {
      this.props.getFilterRestaurants(
        1,
        this.state.queryDay,
        this.state.queryTime,
        this.state.value
      );
    }
  }

  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <Searchinput
            stateHandler={this.updateState}
            searchValue={this.state.value}
            queryDay={this.state.queryDay}
            queryTime={this.state.queryTime}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="Filter By" header />
          <Filterinput
            stateHandler={this.updateState}
            searchValue={this.state.value}
            queryDay={this.state.queryDay}
            queryTime={this.state.queryTime}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, {
  getAllRestaurants,
  getFilterRestaurants,
  getNamedRestaurants
})(SearchBar);
