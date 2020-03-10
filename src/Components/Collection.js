import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Divider,
  Accordion,
  Icon,
  Table,
  Label,
  Header
} from "semantic-ui-react";

class Collection extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { activeIndex } = this.state;
    return (
      <Container>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>3 Collections</Header.Content>
        </Header>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Collection 1
            <Label circular style={{float:'right'}} as='a'>11 Collaborators</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>First</Label>
                  </Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Collection 2
            <Label circular style={{float:'right'}} as='a'>5 Collaborators</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              This is a sample text.
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Collection 3
            <Label circular style={{float:'right'}} as='a'>3 Collaborators</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              This is a sample text
            </p>
          </Accordion.Content>
        </Accordion>
      </Container>
    );
  }
}

export default connect(null, null)(Collection);
