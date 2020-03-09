import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Popup, Icon, List, Image, Input } from "semantic-ui-react";
import { addCollection, getCollections } from "../actions/collectionsactions";
class Collectionpopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false, value: "", collections: [] };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClick() {
    this.props.addCollection(this.props.currentUser.id, this.state.value);
    this.setState({ value: "" });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  componentDidMount() {
    this.setState({ collections: this.props.collections });
  }

  componentDidUpdate(newprops) {
    if (newprops.newCollection !== this.props.newCollection) {
      this.setState({
        collections: [...this.state.collections, this.props.newCollection]
      });
    }
  }

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
          {this.state.collections.map((collection, index) => (
            <List.Item key={index}>
              <Icon name="folder" size="large" />
              <List.Content>
                <List.Header>{collection.name}</List.Header>
              </List.Content>
            </List.Item>
          ))}

          <List.Item>
            <List.Content>
              Create New
              <List.Header>
                <Input
                  icon={
                    <Icon
                      name="add"
                      inverted
                      circular
                      link
                      onClick={() => this.handleClick()}
                    />
                  }
                  placeholder="Search..."
                  value={this.state.value}
                  onChange={e => this.handleChange(e)}
                />
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  collections: state.collections.collections.results,
  newCollection: state.collections.newCollection
});

export default connect(mapStateToProps, { addCollection, getCollections })(
  Collectionpopup
);
