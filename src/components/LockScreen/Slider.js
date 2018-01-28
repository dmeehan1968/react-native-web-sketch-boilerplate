import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class Slider extends React.Component {

  static propTypes = {
    left: PropTypes.number.isRequired,
    buttonHeight: PropTypes.number.isRequired,
    buttonColor: PropTypes.string.isRequired,
    sliderColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onLayout: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  }

  render() {

    const sliderStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: this.props.buttonHeight,
      borderRadius: this.props.buttonHeight,
      backgroundColor: this.props.sliderColor
    }

    const buttonStyle = {
      width: this.props.buttonHeight,
      height: this.props.buttonHeight,
      position: 'absolute',
      borderRadius: this.props.buttonHeight,
      left: this.props.left,
      backgroundColor: this.props.buttonColor
    }

    const textStyle = {
      color: this.props.textColor,
    }

    return (
      <View name="Slider" style={sliderStyle} onLayout={this.props.onLayout}>
        <Text name="SliderText" style={textStyle}>{this.props.message}</Text>
        <View name="SliderButton" style={buttonStyle}></View>
      </View>
    )
  }
}
