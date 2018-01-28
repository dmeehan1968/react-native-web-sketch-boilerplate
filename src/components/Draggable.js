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
    constrainX: PropTypes.func.isRequired,
    constrainY: PropTypes.func.isRequired,
    onLayout: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: 'Draggable',
    onDragStart: () => {},
    onDragEnd: () => {},
    onSpringEnd: () => {},
    springBack: false,
    springSettings: {},
    constrainX: x => x,
    constrainY: y => y,
    onLayout: () => {},
    onValueChange: () => {}
  }

  constructor(props) {
    super(props)
    this.animatedValue = this.props.animatedValue || new Animated.ValueXY()
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
        null, {
          dx: this.animatedValue.x,
          dy: this.animatedValue.y
        }
      ], {
        listener: () => {
          const old = { x: this.animatedValue.x._value, y: this.animatedValue.y._value }
          this.props.constrainY(this.animatedValue.y)
          this.props.constrainX(this.animatedValue.x)
          if (old.x !== this.animatedValue.x._value || old.y !== this.animatedValue.y._value) {
            this.props.onValueChange(this.animatedValue)
          }
        }
      }),
      onPanResponderRelease: (e, gestureState) => {
        this.props.onDragEnd()
        this.animatedValue.flattenOffset()
        if (this.props.springBack) {
          Animated.spring(this.animatedValue, {
            toValue: 0,
            ...this.props.springSettings
          }).start(this.props.onSpringEnd)
        }
      }
    })
  }

  render() {
    const { name, style, children, onLayout } = this.props

    return (
      <Animated.View
        name={name}
        onLayout={onLayout}
        style={[style, { transform: this.animatedValue.getTranslateTransform() }]}
        {...this._panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    )
  }
}
