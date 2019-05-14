import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Text
} from "native-base";
export class SearchAdd extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>TODO App</Text>
          </Body>
        </Header>
        <Content>
          <Body>
            <Item rounded>
              <Input
                onChangeText={text => this.props.search(text)}
              />
            </Item>
          </Body>
          <Right>
            <Button onPress={(text) => this.props.add(text)} title="add new task" rounded>
              <Icon name="add" />
            </Button>
          </Right>
        </Content>
      </Container>
    );
  }
}
