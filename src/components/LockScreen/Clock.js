import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'

export default class Clock extends React.Component {

  componentWillMount() {
    this.setState({
      time: new Date(),
      timer: Platform.OS !== 'sketch' ? setInterval(() => {
        this.setState({ time: new Date })
      }, 1000) : null
    })
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({ time: null, timer: null })
    }
  }

  render() {
    return (
      <View>
        <Text style={this.props.style}>{this.state.time.toLocaleTimeString('en-US')}</Text>
      </View>
    )
  }
}
