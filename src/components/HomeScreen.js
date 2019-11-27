import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'






export default class HomeScreen extends Component {


  render() {
    return (
      <View>
        <Button
          title="ÁLBUM"
          onPress={() => this.props.navigation.navigate("ProductsList")}
        />
        <Button
          title="ÁLBUM"
          onPress={() => this.props.navigation.navigate("Demanda")}
        />
      </View>

    );
  }
}