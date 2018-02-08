import React from 'react'
import { Animated, PanResponder } from 'react-native'
import PropTypes from 'prop-types'

export default class Draggable extends React.Component {

  static propTypes = {
    /*
     * Optional name for the component
     */
    name: PropTypes.string,
    /*
     * Function to handle when a drag operation starts
     */
    onDragStart: PropTypes.func,
    /*
     * Function to handle when a drag operation ends
     */
    onDragEnd: PropTypes.func,
    /*
     * Function to handle when the spring animation ends
     */
    onSpringEnd: PropTypes.func,
    /*
     * Flag to indicate whether the object should spring back to origin
     */
    springBack: PropTypes.bool,
    /*
     * Animation options for the spring
     */
    springSettings: PropTypes.object,
    /*
     * Function to constrain the X axis.  Passed the intended value, returns
     * the constrained value.
     */
    constrainX: PropTypes.func,
    /*
     * Function to constrain the Y axis.  Passed the intended value, returns
     * the constrained value.
     */
    constrainY: PropTypes.func,
    /*
     * Function to handle the onLayout event, receives a NativeEvent
     */
    onLayout: PropTypes.func,
    /*
     * Function to receive changes to the X, Y during animation
     */
    onValueChange: PropTypes.func,
    /*
     * The animated value
     */
    animatedValue: PropTypes.instanceOf(Animated.ValueXY),
    /*
     * Optional styles for the container
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    children: PropTypes.node,
  }

  static defaultProps = {
    name: 'Draggable',
    onDragStart: () => null,
    onDragEnd: () => null,
    onSpringEnd: () => null,
    springBack: false,
    springSettings: {},
    constrainX: x => x,
    constrainY: y => y,
    onLayout: () => null,
    onValueChange: () => null
  }

  constructor(props) {
    super(props)
    this.animatedValue = this.props.animatedValue || new Animated.ValueXY()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (e) => {
        e.preventDefault()
        this.props.onDragStart()
        return true
      },
      onPanResponderGrant: () => {
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
      onPanResponderRelease: () => {
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
