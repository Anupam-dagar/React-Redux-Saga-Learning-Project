import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { DateTimeInput } from "semantic-ui-calendar-react";
import moment from "moment";
import { getFilterRestaurants, getAllRestaurants } from "../actions/restaurantactions";

class Filterinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: "",
      queryDay: "",
      queryTime: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearChange = this.clearChange.bind(this);
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      const day = moment(value.split(" ")[0], "DD-MM-YYYY").format("dddd");
      const time = moment(value.split(" ")[1], "HH:mm").format("HH:mm:ss");
      this.setState({ [name]: value, queryDay: day, queryTime: time });
      this.props.getFilterRestaurants(1, day, time);
    }
  };

  clearChange() {
      console.log(this.props);
      this.setState({dateTime:''});
      this.props.getAllRestaurants(1);
  }

  componentDidUpdate() {
    console.log(this.state,'filterinput');
  }

  render() {
    return (
      <DateTimeInput
        animation="false"
        clearable
        closable
        clearIcon={<Icon name="remove" color="red" />}
        name="dateTime"
        placeholder="Date Time"
        value={this.state.dateTime}
        iconPosition="right"
        onClear={this.clearChange}
        onChange={this.handleChange}
      />
    );
  }
}

export default connect(null, { getAllRestaurants, getFilterRestaurants })(Filterinput);
