
import React from 'react';

import {
    Body,
    Right,
    Switch,
    ListItem,
    Text,
  } from "native-base";
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const Row = (props) => (
  <ListItem>
    <Body>
      <Text>{props.title}</Text>
    </Body>
    <Right>
      <Switch
        value={props.completed}
        onValueChange={() => {
          this.props.update(props);
        }}
      />
    </Right>
  </ListItem>
);

export default Row;