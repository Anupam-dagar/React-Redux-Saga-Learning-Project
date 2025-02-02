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
    if(this.state.password !== this.state.confirm_password) {
      this.setState({error:"Password and Confirm Password must be same"})
      return;
    }
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
                required={true}
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
                required={true}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                required={true}
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="confirm_password"
                required={true}
                value={this.state.confirm_password}
                onChange={this.handleChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                Register
              </Button>
            </Segment>
          </Form>
          <Link to="/login">
            <Message>Already have an account? Login</Message>
          </Link>
          {this.props.error && (
            <Message negative>
              <Message.Header>{this.props.error}</Message.Header>
            </Message>
          )}
          {this.state.error && (
            <Message negative>
              <Message.Header>{this.state.error}</Message.Header>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { signupUser })(SignupForm);
