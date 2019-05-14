import React, { Component } from "react";
import { ListView } from "react-native";

import { Text, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  List,
  Button,
  Icon
} from "native-base";
import Row from "./MyRow";

const styles = StyleSheet.create({
  /*
   * Removed for brevity
   */
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
class MyList extends Component {
  

  render() {

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            dataSource={ds.cloneWithRows(this.props.list, )}  
            renderRow={data => <Row {...data} />}
            
            renderLeftHiddenRow={data => (
              <Button full onPress={() => alert(data.id)}>
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(data) => (
              <Button
                full
                danger
                onPress={_ => this.props.delete(data)}>
                <Icon active={this.props.isDelete} name="trash" />
              </Button>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default MyList;