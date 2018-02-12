import React from 'react'
import { Animated, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import Draggable from '../Draggable'

export default class Slider extends React.Component {

  static propTypes = {
    /*
     * X offset for the slider button
     */
    left: PropTypes.number.isRequired,
    /*
     * Height of the button in pixels
     */
    buttonHeight: PropTypes.number.isRequired,
    /*
     * Background Color for the button
     */
    buttonColor: PropTypes.string.isRequired,
    /*
     * Background Color for the slider when at zero
     */
    sliderFromColor: PropTypes.string.isRequired,
    /*
     * Background color for the slider when at max
     */
    sliderToColor: PropTypes.string.isRequired,
    /*
     * Color for the text messge shown in the slider
     */
    textColor: PropTypes.string.isRequired,
    /*
     * Text message to display in the slider
     */
    message: PropTypes.string.isRequired,
    /*
     * Function to handle when the slider is moved, receives the percentage
     * of the distance from the base to max
     */
    onSlide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onSlide: () => null
  }

  constructor(props) {
    super(props)
    if (Animated) {
      this.animatedValue = new Animated.ValueXY()
    }
    this.state = {}
  }

  handleLayout = (e) => {
    this.setState({ maxX: e.nativeEvent.layout.width })
  }

  constrainX = x => x.setValue(Math.min(Math.max(0,x._value),this.state.maxX-this.props.buttonHeight))

  constrainY = y => y.setValue(0)

  handleValueChange = animatedValueXY => {
    if (this.props.onSlide) {
      this.props.onSlide(animatedValueXY.x._value / (this.state.maxX - this.props.buttonHeight))
    }
  }

  render() {

    const sliderStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: this.props.buttonHeight,
      borderRadius: this.props.buttonHeight,
    }

    if (this.animatedValue) {
      sliderStyle.backgroundColor = this.animatedValue.x.interpolate({
        inputRange: [ 0, this.state.maxX || 0],
        outputRange: [ this.props.sliderFromColor, this.props.sliderToColor ]
      })
    } else {
      sliderStyle.backgroundColor = this.props.sliderFromColor
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

    // Animated doesn't exist in SketchApp, so use a regular view instead
    const Container = Animated ? Animated.View : View

    return (
      <Container
        name="Slider"
        style={sliderStyle}
        onLayout={this.handleLayout}
      >
        <Text name="SliderText" style={textStyle}>{this.props.message}</Text>
        <Draggable
          name="SliderButton"
          style={buttonStyle}
          animatedValue={this.animatedValue}
          constrainX={this.constrainX}
          constrainY={this.constrainY}
          springBack
          springSettings={{ bounciness: 0 }}
          onValueChange={this.handleValueChange}
        />
      </Container>
    )
  }
}
