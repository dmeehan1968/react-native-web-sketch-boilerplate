import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class SlideToUnlock extends React.Component {

  static defaultProps = {
    styles: {
      slider: {},
      button: {},
      text: {}
    }
  }

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      slider: {
        width: '80%',
        height: 30,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        ...this.props.styles.slider
      },
      button: {
        width: 60,
        height: 30,
        left: 0,
        backgroundColor: '#aaa',
        position: 'absolute',
        ...this.props.styles.button
      },
      text: {
        color: '#aaa',
        ...this.props.styles.text
      }
    }))
  }

  render() {
    return (
      <View name="Slider" style={this.styles.slider}>
        <View name="Button" style={this.styles.button}></View>
        <Text style={this.styles.text}>Slide to Unlock</Text>
      </View>
    )
  }
}
