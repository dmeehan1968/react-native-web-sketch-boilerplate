import React from 'react'
import { Animated, PanResponder } from 'react-native'
import PropTypes from 'prop-types'

export default class Draggable extends React.Component {

  static propTypes = {
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    onSpringEnd: PropTypes.func.isRequired,
    springBack: PropTypes.bool.isRequired,
    springSettings: PropTypes.object.isRequired,
  }

  static defaultProps = {
    onDragStart: () => {},
    onDragEnd: () => {},
    onSpringEnd: () => {},
    springBack: false,
    springSettings: {}
  }

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.ValueXY()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        e.preventDefault()
        this.props.onDragStart()
        return true
      },
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this.animatedValue.x._value,
          y: this.animatedValue.y._value
        })
        this.animatedValue.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: this.animatedValue.y }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.props.onDragEnd()
        this.animatedValue.flattenOffset()
        if (this.props.springBack) {
          Animated.spring(this.animatedValue, {
            toValue: 0,
            ...this.props.springSettings
          }).start(this.props.onSpringEnd)
          console.log(this.props.springDuration)
        }
      }
    })
  }

  render() {
    return (
      <Animated.View
        style={{ transform: this.animatedValue.getTranslateTransform() }}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}
