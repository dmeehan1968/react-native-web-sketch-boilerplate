import React from 'react'
import { View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import StackNavigator from './StackNavigator'
import Drawer from '../Drawer'

export default class SplitNavigator extends React.Component {

  static propTypes = {
    /*
     * function to determine if the navigator should be in stack mode
     * (master obscures detail).  Receives an object
     * containing 'width' and 'height' properties of the current window.
     *
     * If omitted, windows less than 500px in width will be in stacked mode
     */
    shouldStack: PropTypes.func,
    /*
     * function to determine if the navigator should be in split mode
     * (both master and detail permanently visible).  Receives an object
     * containing 'width' and 'height' properties of the current window.
     *
     * If omitted, windows over 800px in width will be in split mode
     */
    shouldSplit: PropTypes.func,
  }

  static defaultProps = {
    shouldStack: window => window.width <= 500,
    shouldSplit: window => window.width >= 800
  }

  static DisplayMode = Object.freeze({
    Initial: 'Initial',
    Stacked: 'Stacked',
    Drawer: 'Drawer',
    Split: 'Split'
  })

  constructor(props) {
    super(props)
    this.state = {
      isSplit: false,
      isStacked: false,
      displayMode: SplitNavigator.DisplayMode.Initial
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
    this.setState(state => {
      return {
        window,
        isSplit: this.props.shouldSplit(window),
        isStacked: this.props.shouldStack(window),
        displayMode: this.getDisplayModeForWindow(window)
      }
    })
  }

  getDisplayModeForWindow(window) {
    if (this.props.shouldStack(window)) {
      return SplitNavigator.DisplayMode.Stacked
    }

    if (this.props.shouldSplit(window)) {
      return SplitNavigator.DisplayMode.Split
    }

    return SplitNavigator.DisplayMode.Drawer
  }

  renderDrawer() {
    return (
      <Drawer
        ref={ref => this.drawer = ref}
        minWidth={300}
        maxWidth={this.state.isStacked ? this.state.window.width : 300 }
        open={this.state.isStacked}
        width={this.state.isSplit ? '33%' : '100%'}
        style={{
          paddingRight: this.state.isSplit ? 10 : 0,
          backgroundColor: 'white'
        }}
        animateOnOpen={!this.state.isStacked}
        animateOnClose={!this.state.isStacked}
        animationOptionsOnClose={{
          delay: 250,
          bounciness: undefined,
          mass: 30
        }}
      >
        {this.renderMaster()}

      </Drawer>
    )
  }

  renderMaster() {
    return (
      <StackNavigator
        name="masterNavigator"
        ref={ref => this.master = ref}
        root={this.props.master}
        views={this.props.views}
        navigator={{
          navigate: (name, props) => {
            this.detail.navigate(name, props, 0)
            this.drawer && this.drawer.close()
          }
        }}
        style={[
          {
            borderRightWidth: 1,
            borderStyle: 'solid',
            borderRightColor: '#eee',
            paddingRight: this.state.isSplit ? 10 : 0,
            marginRight: this.state.isSplit ? 10 : 0,

            backgroundColor: 'white',
            height: '100%',
            width: this.state.isSplit ? '33%' : '100%',
          },
        ]}
      />
    )
  }

  renderDetail() {
    return (
      <StackNavigator
        name="detailNavigator"
        ref={ref => this.detail = ref}
        root={this.props.detail}
        views={this.props.views}
        style={{
          flex: 1,
          flexGrow: 1
        }}
        backLabel={depth => depth > (this.state.isSplit ? 1 : 0) ? '<' : null}
        onBack={(next, depth) => {
          depth == 1 && this.drawer ? this.drawer.open() : next()
        }}
      />
    )
  }

  render() {
console.log(this.state.displayMode, this.state.window.width)
    return (
      <View
        name="SplitNavigator"
        style={
          [
          this.props.style,
          {
            flex: 1,
            flexDirection: 'row',
          }
          ]
        }
      >

        {this.state.isSplit ? this.renderMaster() : this.renderDrawer()}

        {this.renderDetail()}

      </View>
    )
  }
}
