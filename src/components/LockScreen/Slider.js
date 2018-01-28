import React from 'react'
import { Animated, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import Draggable from '../Draggable'

export default class Slider extends React.Component {

  static propTypes = {
    left: PropTypes.number.isRequired,
    buttonHeight: PropTypes.number.isRequired,
    buttonColor: PropTypes.string.isRequired,
    sliderFromColor: PropTypes.string.isRequired,
    sliderToColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onSlide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onSlide: () => {}
  }

  constructor(props) {
    super(props)
    if (Animated) {
      this.animatedValue = new Animated.ValueXY()
    }
    this.state = {}
  }

  onLayout(e) {
    this.setState({ maxX: e.nativeEvent.layout.width })
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
        onLayout={::this.onLayout}
      >
        <Text name="SliderText" style={textStyle}>{this.props.message}</Text>
        <Draggable
          name="SliderButton"
          style={buttonStyle}
          animatedValue={this.animatedValue}
          constrainX={x => x.setValue(Math.min(Math.max(0,x._value),this.state.maxX-this.props.buttonHeight))}
          constrainY={y => y.setValue(0)}
          springBack={true}
          springSettings={{ bounciness: 0 }}
          onValueChange={(animatedValueXY) => {
            if (this.props.onSlide) {
              this.props.onSlide(animatedValueXY.x._value / (this.state.maxX - this.props.buttonHeight))
            }
          }}
        />
      </Container>
    )
  }
}
