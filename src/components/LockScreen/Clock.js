// @flow
import React from 'react'
import { Text, View, Platform, StyleSheet } from 'react-native'

type Props = {
  style?: StyleSheet.StyleProps
}

type State = {
  time: Date,
  timer?: IntervalID,   /* global IntervalID */
}

export default class Clock extends React.PureComponent<Props, State> {

  state = {
    time: new Date,
  }

  handleTick = () => {
    this.setState({ time: new Date })
  }

  componentWillMount() {
    if (Platform.OS !== 'sketch') {
      this.setState({
        timer: setInterval(this.handleTick, 1000)
      })
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({ time: undefined, timer: undefined })
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
