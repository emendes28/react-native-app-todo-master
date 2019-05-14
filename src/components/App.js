/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { item } from "../shared/api";
import { MyList } from "./MyList";
import RNEventSource from "react-native-event-source";
import { SearchAdd } from "./SearchAdd";

export default class App extends Component<{}> {
  state = {
    list: [],
    text: "",
    isDelete: true,
  };
  eventSource = {};
    
  async componentDidMount() {
    await this.setList();
  }

  componentWillUnmount() {
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  }

  async setList() {
    const response = await this.fetchApi(item.get, "GET");
    const list = await response.json();
    this.setState({ list });
  }

  async fetchApi(uri, method, body = undefined, param = "") {
    headers = new Headers({
      "Content-Type": "application/json"
    });
    const request = body ? { method, body: JSON.stringify(body), headers } : { method, headers };
    console.log(uri + param, request);
    const response = await fetch(uri + param, request).catch(err =>
      console.error(err)
    );
    console.log(response);

    return response;
  }

  search = async text => {
    const response = await this.fetchApi(item.search+text, "GET");
    if (response) {
      const list = await response.json();
      if (list) {
        this.setState({ text, list });
      }
    }
  };

  async fetchSSEAndSetList() {

    this.eventSource = new RNEventSource(item.getEvents);
    console.log(this.eventSource)
    const list = [];
    this.eventSource.addEventListener("message", event => {
      const { data } = event;
      console.log(data)
      let item = list.find(item => item.id === data.id);
      if (!item) {
        list.push(data);
      } else {
        item = data;
      }
      this.setState({ list });
    });
  }

  add = async (text) => {
    const element = {
      title: this.state.text,
      completed: false
    };
    await this.fetchApi(item.post, "POST", element);
    this.setList();
  };

  updateItem = async element => {
    element.completed = true;
    await this.fetchApi(item.put, "PUT", JSON.stringify(element), element.id);
    this.setList();
  };

  updateStatus = async element => {
    await this.fetchApi(
      item.patch,
      "PATCH",
      JSON.stringify(!element.completed),
      element.id
    );
    this.setList();
  };

  delete = async element => {
    this.setState({ isDelete: false })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchAdd text={this.state.text} add={this.add} search={this.search} />
        </View>
        <View style={styles.itemList}>
          <MyList list={this.state.list} delete={this.delete} update={this.updateStatus} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  itemList: {
    flexGrow: 3
  },
  searchBar: {
    flexBasis: 40,
    flexGrow: 1,
    flexDirection: "column"
  },
  welcome: {
    fontSize: 20
  }
});
