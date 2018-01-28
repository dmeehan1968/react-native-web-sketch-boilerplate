import React from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'

import Slider from './Slider'

export default class SlideToUnlock extends React.Component {

  static defaultProps = {
    buttonHeight: 50,
    fromColor: '#eee',
    toColor: '#333',
    buttonColor: '#aaa',
    buttonActiveColor: 'red',
    textColor: '#aaa'
  }

  static propTypes = {
    buttonHeight: PropTypes.number,
    onSlide: PropTypes.func,
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

  onLayout(e) {
    this.setState({ right: e.nativeEvent.layout.width - this.props.buttonHeight })
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        e.preventDefault()
        const x = e.nativeEvent.locationX
        if (x < (this.state.left + this.props.buttonHeight)) {
          return true
        }
        return false
      },
      onPanResponderGrant: (e, gestureState) => {
        this.setState({ active: true, base: this.state.left })
      },
      onPanResponderMove: (e, gestureState) => {
        const { dx } = gestureState
        const left = Math.min(Math.max(0, this.state.base + dx), this.state.right)
        const index = left / this.state.right
        this.setState({ left, index })
        if (index === 1 && typeof this.props.onSlide === 'function') {
          this.props.onSlide()
        }
      },
      onPanResponderRelease: (e, { vx, vy }) => {
        this.setState({ active: false })
      }
    })
  }

  render() {

    const sliderColorScale = chroma.scale([this.props.fromColor, this.props.toColor]).mode('lab')

    return (
      <View
        name="SlideToUnlock"
        style={this.props.style}
        {...this._panResponder.panHandlers}
      >
        <Slider
          left={this.state.left}
          buttonHeight={this.props.buttonHeight}
          buttonColor={this.state.active ? this.props.buttonColor : this.props.buttonActiveColor}
          sliderColor={sliderColorScale(this.state.index).hex()}
          textColor={this.props.textColor}
          onLayout={::this.onLayout}
          message="Slide to Unlock >>>"
        />
      </View>
    )

  }
}
