import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import _ from "lodash";

class Searchinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.searchValue,
      queryDay: this.props.queryDay,
      queryTime: this.props.queryTime
    };

    this.delayedRequest = _.debounce(this.delayedRequest, 500);
  }

  handleChange = e => {
    this.delayedRequest(e.target.value);
  };

  delayedRequest = (searchValue) => {
    this.props.stateHandler({ value: searchValue });
  };

  componentDidUpdate(newprops) {
    if(newprops.searchValue !== this.props.searchValue){
      this.setState({value: this.props.searchValue});
    }
    if(newprops.queryDay !== this.props.queryDay){
      this.setState({queryDay: this.props.queryDay});
    }
    if(newprops.queryTime !== this.props.queryTime) {
      this.setState({queryTime: this.props.queryTime});
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

export default connect(null, null)(
  Searchinput
);
