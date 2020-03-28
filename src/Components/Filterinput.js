import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { DateTimeInput } from "semantic-ui-calendar-react";
import moment from "moment";

class Filterinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      dateTime: "",
      queryDay: this.props.queryDay,
      queryTime: this.props.queryTime
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearChange = this.clearChange.bind(this);
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      const day = moment(value.split(" ")[0], "DD-MM-YYYY").format("dddd");
      const time = moment(value.split(" ")[1], "HH:mm").format("HH:mm:ss");
      this.props.stateHandler({
        [name]: value,
        queryDay: day,
        queryTime: time
      });
      this.setState({ [name]: value });
    }
  };

  clearChange() {
    this.setState({ dateTime: "" });
    this.props.stateHandler({
      queryDay: "",
      queryTime: ""
    });
  }

  componentDidUpdate(newprops) {
    if (newprops.searchValue !== this.props.searchValue) {
      this.setState({ value: this.props.searchValue });
    }
    if (newprops.queryDay !== this.props.queryDay) {
      this.setState({ queryDay: this.props.queryDay });
    }
    if (newprops.queryTime !== this.props.queryTime) {
      this.setState({ queryTime: this.props.queryTime });
    }
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

export default connect(null, null)(
  Filterinput
);
