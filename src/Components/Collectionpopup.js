import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Popup, Icon, List, Image, Input } from "semantic-ui-react";

class Collectionpopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Popup
        trigger={
          <Button icon labelPosition="right" compact circular>
            {this.props.content} <Icon name="add" />
          </Button>
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="right center"
      >
        <List selection verticalAlign="middle">
          <List.Item>
          <Icon
              name="folder"
              size="large"
            />
            <List.Content>
              <List.Header>Helen</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
          <Icon
              name="folder"
              size="large"
            />
            <List.Content>
              <List.Header>Christian</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon
              name="folder"
              size="large"
            />
            <List.Content>
              <List.Header>Daniel</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
            Create New
              <List.Header>
                <Input
                  icon={<Icon name="add" inverted circular link />}
                  placeholder="Search..."
                />
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Popup>
    );
  }
}

export default connect(null, null)(Collectionpopup);
