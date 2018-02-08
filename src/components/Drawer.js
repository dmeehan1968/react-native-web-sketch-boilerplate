import React from 'react'
import { Animated, TouchableOpacity, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

export default class Drawer extends React.Component {

  static propTypes = {
    /*
     * open: The initial state of the drawer
     */
    open: PropTypes.bool,
    /*
     * min: minimum width is pixels of the drawer
     */
    minWidth: PropTypes.number,
    /*
     * max: maximum width of the drawer
     */
    maxWidth: PropTypes.number,
    /*
     * width: number | string
     *
     * Width of the drawer, either in pixels expressed as a number,
     * or as a percentage of the window width
     */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    /*
     * options applied to the 'spring' animation on both open and close
     */
    animationOptions: PropTypes.object,
    /*
     * options applied to the 'spring' animation on open
     */
    animationOptionsOnOpen: PropTypes.object,
    /*
     * options applied to the 'spring' animation on close
     */
    animationOptionsOnClose: PropTypes.object,
    /*
     * animateOnOpen: boolean
     *
     * Whether to apply an animation when opening the drawer
     */
    animateOnOpen: PropTypes.bool,
    /*
     * animateOnClose: boolean
     *
     * Whether to apply an animation when closing the drawer
     */
    animateOnClose: PropTypes.bool,
    /*
     * Optional styles to pass to the container
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    children: PropTypes.node,
  }

  static defaultProps = {
    minWidth: 300,
    maxWidth: 500,
    width: '33%',
    animateOnOpen: true,
    animateOnClose: true
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.open || false
    }
    this.onDimensionsChange = ::this.onDimensionsChange
  }

  componentWillMount() {
    this.animatedOffsetX = new Animated.Value()
    this.onDimensionsChange({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange({ window }) {
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
    const toValue = -this.state.window.width

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
        result = Math.round(this.state.window.width * (parseFloat(requestedWidth.slice(0, -1).join('') / 100)))
      } else {
        result = parseInt(width)
      }
    }

    result = Math.min(maxWidth, Math.max(minWidth, result))
    return result
  }

  render() {
    return (
      <Animated.View
        style={
          [
          {
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            height: '100%',
            flex: 1,
            flexDirection: 'row',
            transform: [{
                translateX: this.animatedOffsetX
            }]
          }]
        }
      >
        <View style={
          [
          {
          },
          this.props.style,
          {
            width: this.getWidth(),
          }
          ]
        }>
          {this.props.children}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            flexGrow: 1,
          }}
          onPress={::this.close}
        />
      </Animated.View>
    )
  }
}
