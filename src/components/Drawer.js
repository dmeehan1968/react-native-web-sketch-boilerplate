// @flow
import * as React from 'react'
import { Animated, TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native'

import designSystem from './designSystem'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    backgroundColor: designSystem.colors.overlayColor,
    flexGrow: 1,
  }
})

type Props = {
  /*
   * open: The initial state of the drawer
   */
  open: boolean,
  /*
   * min: minimum width is pixels of the drawer
   */
  minWidth: number,
  /*
   * max: maximum width of the drawer
   */
  maxWidth: number,
  /*
   * width: number | string
   *
   * Width of the drawer, either in pixels expressed as a number,
   * or as a percentage of the window width
   */
  width: number | string,
  /*
   * options applied to the 'spring' animation on both open and close
   */
  animationOptions?: Animated.SpringAnimationConfig,
  /*
   * options applied to the 'spring' animation on open
   */
  animationOptionsOnOpen?: Animated.SpringAnimationConfig,
  /*
   * options applied to the 'spring' animation on close
   */
  animationOptionsOnClose?: Animated.SpringAnimationConfig,
  /*
   * animateOnOpen: boolean
   *
   * Whether to apply an animation when opening the drawer
   */
  animateOnOpen: boolean,
  /*
   * animateOnClose: boolean
   *
   * Whether to apply an animation when closing the drawer
   */
  animateOnClose: boolean,
  /*
   * Optional styles to pass to the container
   */
  style?: StyleSheet.StyleProp,
  children?: React.Element<any>,
}

type State = {
  isOpen: boolean,
  window?: View.ViewLayout
}

export default class Drawer extends React.Component<Props, State> {

  static defaultProps = {
    minWidth: 300,
    maxWidth: 500,
    width: '33%',
    animateOnOpen: true,
    animateOnClose: true
  }

  onDimensionsChange: (View.ViewLayoutEvent) => void
  animatedOffsetX: Animated.Value

  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: this.props.open || false
    }
    this.onDimensionsChange = this.onDimensionsChange
  }

  componentWillMount() {
    this.animatedOffsetX = new Animated.Value()
    this.onDimensionsChange({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange = ({ window }: View.ViewLayoutEvent) => {
    this.animatedOffsetX.setValue(this.state.isOpen ? 0 : -window.width)
    this.setState({ window })
  }

  open() {
    this.setState({ isOpen: true })
    const toValue = 0

    if (this.props.animateOnOpen) {
      Animated.spring(this.animatedOffsetX, {
          bounciness: 0,
          ...this.props.animationOptions,
          ...this.props.animationOptionsOnOpen,
          toValue,
      }).start()
    } else {
      this.animatedOffsetX.setValue(toValue)
    }
  }

  close() {
    this.setState({ isOpen: false })
    const toValue = this.state.window ? -this.state.window.width : 0

    if (this.props.animateOnClose) {
      Animated.spring(this.animatedOffsetX, {
          bounciness: 0,
          ...this.props.animationOptions,
          ...this.props.animationOptionsOnClose,
          toValue,
      }).start()
    } else {
      this.animatedOffsetX.setValue(toValue)
    }
  }

  getWidth() {
    const { minWidth, maxWidth, width } = this.props
    let result

    if (typeof width === 'number') {
      result = width
    } else {

      const requestedWidth = width.split('')
      if (requestedWidth.slice(-1).pop() === '%') {
        result = Math.round((this.state.window ? this.state.window.width : 0) * (parseFloat(requestedWidth.slice(0, -1).join('')) / 100))
      } else {
        result = parseInt(width)
      }
    }

    result = Math.min(maxWidth, Math.max(minWidth, result))
    return result
  }

  handlePress = () => this.close()

  render() {
    return (
      <Animated.View
        style={
          [styles.container, {
            transform: [{
              translateX: this.animatedOffsetX
            }]
          }]
        }
      >
        <View style={
          [this.props.style, {
            width: this.getWidth(),
          }]
        }>
          {this.props.children}
        </View>
        <TouchableOpacity
          style={styles.overlay}
          onPress={this.handlePress}
        />
      </Animated.View>
    )
  }
}
