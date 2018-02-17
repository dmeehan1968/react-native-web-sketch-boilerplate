// @flow
import * as React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'

import StackNavigator from './StackNavigator'
import Drawer from '../Drawer'
import { type ViewsType } from './ViewsType'

import designSystem from '../designSystem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    backgroundColor: designSystem.colors.backgroundColor
  },
  drawerSplit: {
    paddingRight: 10,
  },
  master: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderRightColor: designSystem.colors.separator,
    backgroundColor: designSystem.colors.backgroundColor,
  },
  masterSplit: {
    paddingRight: 10,
    marginRight: 10,
    flexGrow: 1,
  },
  detail: {
    flex: 1,
    flexGrow: 3
  },

})

type Props = {
  /*
   * function to determine if the navigator should be in stack mode
   * (master obscures detail).  Receives an object
   * containing 'width' and 'height' properties of the current window.
   *
   * If omitted, windows less than 500px in width will be in stacked mode
   */
  shouldStack: Function,
  /*
   * function to determine if the navigator should be in split mode
   * (both master and detail permanently visible).  Receives an object
   * containing 'width' and 'height' properties of the current window.
   *
   * If omitted, windows over 800px in width will be in split mode
   */
  shouldSplit: Function,
  /*
   * Function to handle when the split navigator mode changes.  Receives
   * the old mode and new mode as arguments.  See SplitNavigator.DisplayMode
   * for values
   */
  onModeChange: Function,
  /*
   * Name of the property supplied in the views property for the initial
   * master view
   */
  master: string,
  /*
   * Name of the property supplied in the views property for the initial
   * detail view
   */
  detail: string,
  views: ViewsType,
  /*
   * Optional styles to be passed to the view
   */
  style?: StyleSheet.StyleProp,

}

export type DisplayMode = 'Initial' | 'Stacked' | 'Drawer' | 'Split'

type ViewPort = {
  width: number,
  height: number
}

type State = {
  displayMode: DisplayMode,
  window: ViewPort
}

type DimensionsChangeEvent = {
  window?: ViewPort,    // eslint-disable-line react/no-unused-prop-types
  screen?: ViewPort,    // eslint-disable-line react/no-unused-prop-types
}

export default class SplitNavigator extends React.Component<Props, State> {

  static defaultProps = {
    shouldStack: (window: ViewPort) => window.width <= 500,
    shouldSplit: (window: ViewPort) => window.width >= 800
  }

  static DisplayMode: { [DisplayMode]: DisplayMode } = {
    Initial: 'Initial',
    Stacked: 'Stacked',
    Drawer: 'Drawer',
    Split: 'Split'
  }

  state = {
    displayMode: SplitNavigator.DisplayMode.Initial,
    window: { width: 0, height: 0 },
  }

  componentWillMount() {
    this.onDimensionsChange({
      window: Dimensions.get('window'),
    })
    Dimensions.addEventListener('change', this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange = ({ window }: DimensionsChangeEvent) => {
    if (window) {
      this.setState(state => {
        const newState = {
          window,
          displayMode: this.getDisplayModeForWindow(window)
        }

        if (state.displayMode !== newState.displayMode) {
          this.props.onModeChange(state.displayMode, newState.displayMode)
        }

        return newState
      })
    }
  }

  getDisplayModeForWindow(window: ViewPort) {
    if (this.props.shouldStack(window)) {
      return SplitNavigator.DisplayMode.Stacked
    }

    if (this.props.shouldSplit(window)) {
      return SplitNavigator.DisplayMode.Split
    }

    return SplitNavigator.DisplayMode.Drawer
  }

  get isSplit(): boolean {
    return this.state.displayMode === SplitNavigator.DisplayMode.Split
  }

  get isStacked(): boolean {
    return this.state.displayMode === SplitNavigator.DisplayMode.Stacked
  }

  get isDrawer(): boolean {
    return this.state.displayMode === SplitNavigator.DisplayMode.Drawer
  }

  drawer: ?Drawer
  master: ?StackNavigator
  detail: ?StackNavigator

  drawerRef = (ref: ?Drawer) => this.drawer = ref
  masterRef = (ref: ?StackNavigator) => (this.master = ref)
  detailRef = (ref: ?StackNavigator) => (this.detail = ref)

  handleBack = (next: Function, depth: number) => {
    depth === 1 && this.drawer ? this.drawer.open() : next()
  }

  backLabel = (depth: number) => depth > (this.isSplit ? 1 : 0) ? '<' : null

  renderDrawer() {
    return (
      <Drawer
        ref={this.drawerRef}
        minWidth={300}
        maxWidth={this.isStacked ? this.state.window.width : 300 }
        open={this.isStacked}
        width={this.isDrawer ? '33%' : '100%'}
        style={[styles.drawer, this.isSplit ? styles.drawerSplit : null]}
        animateOnOpen={!this.isStacked}
        animateOnClose={!this.isStacked}
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
        ref={this.masterRef}
        root={this.props.master}
        views={this.props.views}
        navigator={{
          navigate: (name, props) => {
            this.detail && this.detail.navigate(name, props, 0)
            this.drawer && this.drawer.close()
          }
        }}
        style={[styles.master, this.isSplit ? styles.masterSplit : null]}
      />
    )
  }

  renderDetail() {
    return (
      <StackNavigator
        name="detailNavigator"
        ref={this.detailRef}
        root={this.props.detail}
        views={this.props.views}
        style={styles.detail}
        backLabel={this.backLabel}
        onBack={this.handleBack}
      />
    )
  }

  render() {
    return (
      <View
        name="SplitNavigator"
        style={
          [
          this.props.style,
          styles.container
          ]
        }
      >

        {this.isSplit ? this.renderMaster() : this.renderDrawer()}

        {this.renderDetail()}

      </View>
    )
  }
}
