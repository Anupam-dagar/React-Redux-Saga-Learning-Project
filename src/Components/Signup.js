import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser } from "../actions/signupactions";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signupUser(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />

        <label>Email</label>
        <input
          name="email"
          placeholder="something@domain.com"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <br />

        <input type="submit" />
      </form>
    );
  }
}

export default connect(null, { signupUser })(Signup);
