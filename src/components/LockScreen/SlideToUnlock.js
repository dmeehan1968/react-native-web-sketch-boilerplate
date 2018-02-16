// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'

import Slider from './Slider'

type Props = {
  /*
   * Function to handle when the unlock occurs
   */
  onUnlock: Function,
  /*
   * Additional styles to apply to the SlideToUnlock
   */
  style?: StyleSheet.StyleProp,
  /*
   * The height of the slider button in pixels
   */
  buttonHeight: number,
  /*
   * The background color for the slider when at zero
   */
  fromColor: string,
  /*
   * The background color for the slider when at maximum
   */
  toColor: string,
  /*
   * The background color for the slider button when not pressed
   */
  buttonColor: string,
  /*
   * The background color for the slider when pressed
   */
  buttonActiveColor: string,
  /*
   * The color for the slider text message
   */
  textColor: string,
}

type State = {
  left: number,
  right: number,
  active: boolean
}

export default class SlideToUnlock extends React.Component<Props, State> {

  static defaultProps = {
    buttonHeight: 50,
    fromColor: '#eee',
    toColor: '#e00',
    buttonColor: '#aaa',
    buttonActiveColor: 'red',
    textColor: '#aaa',
    onUnlock: () => null
  }

  state = {
    left: 0,
    right: 1000,
    active: false
  }

  handleSlide = (distance: number) => {
    if (distance >= 1) {
      this.props.onUnlock()
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
          onSlide={this.handleSlide}
        />
      </View>
    )

  }
}
