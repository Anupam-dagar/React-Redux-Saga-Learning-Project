import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authactions";

class Navigation extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleClick = event => {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment raised size="mini">
        <Menu secondary>
          <Menu.Item header>
            Welcome {this.props.currentUser.username} ({this.props.currentUser.email})
            </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              link
              href="/"
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              link
              href="/collections"
              name="My Collections"
              active={activeItem === "My Collections"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation));
