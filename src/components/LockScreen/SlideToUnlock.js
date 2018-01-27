import React from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'

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
  }

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      slider: {
        width: '80%',
        height: this.props.buttonHeight,
        borderRadius: this.props.buttonHeight,
        backgroundColor: this.props.fromColor,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: this.props.buttonHeight,
        height: this.props.buttonHeight,
        left: 0,
        position: 'absolute',
        borderRadius: this.props.buttonHeight,
        backgroundColor: this.props.buttonColor,
      },
      text: {
        color: this.props.textColor,
      }
    }))
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
    const buttonStyle = {
      left: this.state.left || 0,
      backgroundColor: this.state.active ? this.props.buttonColor : this.props.buttonActiveColor
    }
    const scale = chroma.scale([this.props.fromColor, this.props.toColor]).mode('lab')
    const sliderStyle = {
      backgroundColor: scale(this.state.index).hex()
    }

    return (
      <View
        name="Slider"
        style={[this.styles.slider, sliderStyle]}
        {...this._panResponder.panHandlers}
        onLayout={::this.onLayout}
      >
        <Text style={this.styles.text}>Slide to Unlock</Text>
        <View
          name="Button"
          style={[this.styles.button, buttonStyle]}
        ></View>
      </View>
    )
  }
}
