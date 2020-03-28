import React, { Component } from "react";
import { Menu, Message, Divider, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import Filterinput from "./Filterinput";
import Searchinput from "./Searchinput";
import {
  getNamedRestaurants,
  getAllRestaurants,
  getFilterRestaurants
} from "../actions/restaurantactions";
import moment from "moment";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      queryDay: "",
      queryTime: "",
      date: "",
      month: "",
      year: ""
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
    let message = "Showing results for restaurants ";
    let showMessage = false;
    if (this.state.value !== "") {
      message = message + `with name ${this.state.value} `;
      showMessage = true;
    }
    if (this.state.queryDay !== "") {
      message =
        message +
        `which are open on ${this.state.queryDay}, ${this.state.date} ${
          this.state.month
        } ${this.state.year} at ${moment(
          this.state.queryTime,
          "HH:mm:ss"
        ).format("hh:mm A")}`;
      showMessage = true;
    }
    return (
      <>
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
        {showMessage && <Container textAlign="center"> <Message style={{textAlign: "center"}} compact size="small" info header={message} /></Container>}
        <Divider hidden />
      </>
    );
  }
}

export default connect(null, {
  getAllRestaurants,
  getFilterRestaurants,
  getNamedRestaurants
})(SearchBar);
