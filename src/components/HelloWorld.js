import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class HelloWorld extends React.Component {

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        fontSize: 30
      }
    }))
  }
  
  render() {
    return (
      <View style={this.styles.view}>
        <Text style={this.styles.text}>Hello World</Text>
      </View>
    )
  }
}
