import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { signupUser } from "../actions/authactions";

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirm_password: "",
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
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={logo} size="small" centered />
          <Header as="h2" color="teal" textAlign="center">
            Create a new account
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="youremail@domain.com"
                type="email"
                name="email"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                Register
              </Button>
            </Segment>
          </Form>
          <Link to="/newlogin">
            <Message>Already have an account? Login</Message>
          </Link>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { signupUser })(SignupForm);
