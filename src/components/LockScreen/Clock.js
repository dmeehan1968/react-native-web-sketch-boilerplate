import React from 'react'
import { Text, View, Platform } from 'react-native'
import PropTypes from 'prop-types'

export default class Clock extends React.Component {

  static propTypes = {
    /*
     * Additional style to apply to the component
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  }

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
