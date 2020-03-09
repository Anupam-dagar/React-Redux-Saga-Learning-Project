import React, { Component } from "react";
import { Menu, Input, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import Filterinput from  './Filterinput';

class SearchBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="Filter By" header />
          <Filterinput />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, null)(SearchBar);
