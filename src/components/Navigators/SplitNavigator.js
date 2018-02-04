import React from 'react'
import { Animated, TouchableOpacity, View, Platform, Dimensions } from 'react-native'
import StackNavigator from './StackNavigator'

export default class SplitNavigator extends React.Component {

  static springDefaults = {
    bounciness: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      overlayVisible: false,
    }
  }

  componentWillMount() {
    const dims = {
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    }
    this.onDimensionsChange(dims)

    Dimensions.addEventListener('change', ::this.onDimensionsChange)

    this.animatedValue = new Animated.Value(-dims.window.width)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', ::this.onDimensionsChange)
  }

  onDimensionsChange({ window, screen }) {
    const newState = {
      window,
      screen,
      hasOverlay: window.width < 800,
      isSplit: window.width >= 500,
      masterWidth: Math.min(500, Math.max(300, window.width * 0.3)),
    }

    this.setState(newState)

  }

  showOverlay() {
    if (!this.state.overlayVisible) {
      this.setState({ overlayVisible: true })
      this.animatedValue.setValue(-this.state.window.width)
      Animated.spring(this.animatedValue, {
        ...SplitNavigator.springDefaults,
        toValue: 0,
      }).start()
    }
  }

  hideOverlay() {
    if (this.state.overlayVisible) {
      this.setState({ overlayVisible: false })
      this.animatedValue.setValue(0)
      Animated.spring(this.animatedValue, {
        ...SplitNavigator.springDefaults,
        toValue: -this.state.window.width,
      }).start()
    }
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

        <Animated.View style={[
          this.state.hasOverlay ? {
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 999,
            left: 0,
            flex: 1,
            flexDirection: 'row',
            transform: [{
              translateX: this.animatedValue
            }]
          } : null,
        ]}>

          <StackNavigator
            name="masterNavigator"
            ref={ref => this.master = ref}
            root={this.props.master}
            views={this.props.views}
            navigator={{
              navigate: (name, props) => {
                this.detail.navigate(name, props, this.state.isSplit ? 0 : 1)
                this.hideOverlay()
              }
            }}
            style={[
              {
                backgroundColor: 'white',
                marginRight: this.state.overlayVisible ? 0 : 10,
                paddingRight: 10,
                borderStyle: 'solid',
                borderRightColor: '#eee',
                borderRightWidth: 1,
                width: this.state.masterWidth,
                height: '100%'
              },
            ]}
          />

          <TouchableOpacity
            style={{
              flexGrow: 1,
              backgroundColor: 'transparent'
            }}
            onPress={::this.hideOverlay}
          />

        </Animated.View>

        <StackNavigator
          name="detailNavigator"
          ref={ref => this.detail = ref}
          root={this.state.isSplit ? this.props.detail : this.props.master}
          views={this.props.views}
          style={{ flexGrow: 1 }}
          backLabel={depth => (this.state.isSplit && this.state.hasOverlay && !this.state.overlayVisible) || depth > 1 ? '<' : null}
          onBack={(next, depth) => {
            depth > 1 ? next() : this.showOverlay()
          }}
        />

      </View>
    )
  }
}
