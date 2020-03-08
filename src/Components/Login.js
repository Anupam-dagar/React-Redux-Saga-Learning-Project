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
import { loginUser } from "../actions/authactions";
import { connect } from "react-redux";
import logo from "../logo.png";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.setState({ error: null });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state);
  };

  componentDidUpdate(newprops) {
    if (newprops.error !== this.props.error) {
      this.setState({ error: this.props.error });
    }
    if (newprops.currentUser.username !== this.props.currentUser.username) {
      this.props.history.push("/");
    }
  }

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
            Login to restaurant portal
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
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.error && (
                <Message negative>
                  <Message.Header>Invalid Username or Password</Message.Header>
                </Message>
              )}
              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Link to="/signup">
            <Message>New to us? Sign Up</Message>
          </Link>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  error: state.auth.error
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
