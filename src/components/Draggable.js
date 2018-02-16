// @flow
import * as React from 'react'
import { Animated, PanResponder, View, StyleSheet } from 'react-native'

type DragHandler = () => void
type SpringHandler = () => void
type ConstraintFunction = (value: number) => number
type LayoutHandler = (e: View.ViewLayoutEvent) => void
type ValueChangeHandler = (value: Animated.ValueXY) => void

type Props = {
  /*
   * Optional name for the component
   */
  name?: string,
  /*
   * Function to handle when a drag operation starts
   */
  onDragStart: DragHandler,
  /*
   * Function to handle when a drag operation ends
   */
  onDragEnd: DragHandler,
  /*
   * Function to handle when the spring animation ends
   */
  onSpringEnd: SpringHandler,
  /*
   * Flag to indicate whether the object should spring back to origin
   */
  springBack: boolean,
  /*
   * Animation options for the spring
   */
  springConfig: Animated.SpringAnimationConfig,
  /*
   * Function to constrain the X axis.  Passed the intended value, returns
   * the constrained value.
   */
  constrainX: ConstraintFunction,
  /*
   * Function to constrain the Y axis.  Passed the intended value, returns
   * the constrained value.
   */
  constrainY: ConstraintFunction,
  /*
   * Function to handle the onLayout event, receives a NativeEvent
   */
  onLayout: LayoutHandler,
  /*
   * Function to receive changes to the X, Y during animation
   */
  onValueChange: ValueChangeHandler,
  /*
   * The animated value
   */
  animatedValue: Animated.ValueXY,
  /*
   * Optional styles for the container
   */
  style: StyleSheet.StyleProp,

  children?: React.Node,
}

export default class Draggable extends React.Component<Props> {

  static defaultProps = {
    name: 'Draggable',
    onDragStart: () => undefined,
    onDragEnd: () => undefined,
    onSpringEnd: () => undefined,
    springBack: false,
    springConfig: {},
    constrainX: (x => x: ConstraintFunction),
    constrainY: (y => y: ConstraintFunction),
    onLayout: () => undefined,
    onValueChange: () => undefined
  }

  animatedValue: Animated.ValueXY
  _panResponder: PanResponder

  constructor(props: Props) {
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
            ...this.props.springConfig
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
