import React, { Component } from "react";
import {
  Container,
  Segment,
  List,
} from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Segment inverted vertical style={{ margin: "5em 0em 0em" }}>
        <Container textAlign="center">
          <List horizontal inverted divided link size="small">
            <List.Item>Anupam Dagar - Glints Assignment Part 2</List.Item>
          </List>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
