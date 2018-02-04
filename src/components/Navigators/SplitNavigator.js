import React from 'react'
import { Animated, TouchableOpacity, View, Platform, Dimensions } from 'react-native'
import StackNavigator from './StackNavigator'
import PropTypes from 'prop-types'

class Drawer extends React.Component {

  static propTypes = {
    /*
     * open: The initial state of the drawer
     */
    open: PropTypes.bool,
    /*
     * min: minimum width is pixels of the drawer
     */
    min: PropTypes.number,
    /*
     * max: maximum width of the drawer
     */
    max: PropTypes.number,
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
  }

  static defaultProps = {
    min: 300,
    max: 500,
    width: '33%',
    animateOnOpen: true,
    animateOnClose: true
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.open || false
    }
  }

  componentWillMount() {
    this.animatedOffsetX = new Animated.Value()
    this.onDimensionsChange({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', ::this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', ::this.onDimensionsChange)
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

    return Math.min(maxWidth, Math.max(minWidth, result))
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
            borderRightWidth: 1,
            borderStyle: 'solid',
            borderRightColor: '#eee',
            paddingRight: 10,
            marginRight: 10,
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



export default class SplitNavigator extends React.Component {

  static springDefaults = {
    bounciness: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      isSplit: false
    }
  }

  componentWillMount() {
    this.onDimensionsChange({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', ::this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', ::this.onDimensionsChange)
  }

  onDimensionsChange({ window }) {
    this.setState({
      window,
      isSplit: window.width >= 600
    })
  }

  render() {

    return (
      <View style={[
        this.props.style,
        {
          flex: 1,
          flexDirection: 'row',
        }
      ]}>

        <Drawer
          ref={ref => this.drawer = ref}
          minWidth={300}
          maxWidth={this.state.isSplit ? 500 : this.state.window.width}
          open={!this.state.isSplit}
          width={this.state.isSplit ? '33%' : '100%'}
          style={{
            paddingRight: this.state.isSplit ? 10 : 0,
            backgroundColor: 'white'
          }}
          animateOnOpen={this.state.isSplit}
          animateOnClose={this.state.isSplit}
        >

          <StackNavigator
            name="masterNavigator"
            ref={ref => this.master = ref}
            root={this.props.master}
            views={this.props.views}
            navigator={{
              navigate: (name, props) => {
                this.detail.navigate(name, props, 0)
                this.drawer.close()
              }
            }}
            style={[
              {
                backgroundColor: 'white',
                // marginRight: 10,
                // paddingRight: 10,
                // borderStyle: 'solid',
                // borderRightColor: '#eee',
                // borderRightWidth: 1,
                // width: this.state.masterWidth,
                height: '100%'
              },
            ]}
          />

        </Drawer>

        <StackNavigator
          name="detailNavigator"
          ref={ref => this.detail = ref}
          root={this.props.detail}
          views={this.props.views}
          style={{ flexGrow: 1 }}
          backLabel={depth => '<'}
          onBack={(next, depth) => {
            depth == 1 ? this.drawer.open() : next()
          }}
        />

      </View>
    )
  }
}
