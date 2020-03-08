import React, { Component } from "react";
import { Menu, Input } from "semantic-ui-react";
import { connect } from "react-redux";

class SearchBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="Filter By" header />
          <Menu.Item name="Date" />
          <Menu.Item name="Opening Time" />
          <Menu.Item name="Closing Time" />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, null)(SearchBar);
