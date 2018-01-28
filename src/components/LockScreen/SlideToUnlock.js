import React from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'

import Slider from './Slider'

export default class SlideToUnlock extends React.Component {

  static defaultProps = {
    buttonHeight: 50,
    fromColor: '#eee',
    toColor: '#e00',
    buttonColor: '#aaa',
    buttonActiveColor: 'red',
    textColor: '#aaa',
    onUnlock: () => {}
  }

  static propTypes = {
    buttonHeight: PropTypes.number,
    onUnlock: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
  }

  constructor(props) {
    super(props)
    this.state = {
      left: 0,
      right: 1000,
      active: false
    }
  }

  render() {

    return (
      <View
        name="SlideToUnlock"
        style={this.props.style}
      >
        <Slider
          left={this.state.left}
          buttonHeight={this.props.buttonHeight}
          buttonColor={this.state.active ? this.props.buttonColor : this.props.buttonActiveColor}
          sliderFromColor={this.props.fromColor}
          sliderToColor={this.props.toColor}
          textColor={this.props.textColor}
          message="Slide to Unlock >>>"
          onSlide={distance => {
            if (distance >= 1) {
              this.props.onUnlock()
            }
          }}
        />
      </View>
    )

  }
}
