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
    /*
     * Function to handle when the split navigator mode changes.  Receives
     * the old mode and new mode as arguments.  See SplitNavigator.DisplayMode
     * for values
     */
    onModeChange: PropTypes.func,
    /*
     * Name of the property supplied in the views property for the initial
     * master view
     */
    master: PropTypes.string.isRequired,
    /*
     * Name of the property supplied in the views property for the initial
     * detail view
     */
    detail: PropTypes.string.isRequired,
    /*
     * An object containing properties that are objects describing the
     * available views
     */
    views: PropTypes.objectOf(
      PropTypes.shape({
        /*
         * React component to be used to render the view.  Function or class
         */
        component: PropTypes.func.isRequired,
        /*
         * The title for the NavBar
         */
        title: PropTypes.oneOfType([
          /*
           * Literal string to be used for the title
           */
          PropTypes.string,
          /*
           * Function to determine the title for the NavBar.  Receives the
           * computed props for the component as a argument
           */
          PropTypes.func,
        ]).isRequired,
        /*
         * Option properties object to be passed to the component
         */
        props: PropTypes.object,
        /*
         * An object containing handlers to be passed as props to the
         * component.  This allows existing component handlers to be mapped
         * to nvigator actions.  Receives the original arguments plus an
         * additional 'navigator' argument, which has a 'navigate' property
         * which is a function which takes a string which is the name of the
         * view to navigate to (as appears in the 'views' property) and an
         * optional object argument which are props to be passed to the view
         *
         * navigator = {
         *  navigate: (view, props) => {}
         * }
         */
        handlers: PropTypes.objectOf(
          PropTypes.func,
        ),
      }),
    ),
    /*
     * Optional styles to be passed to the view
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    shouldStack: window => window.width <= 500,
    shouldSplit: window => window.width >= 800
  }

  static DisplayMode = Object.freeze({
    Initial: Symbol('Initial'),
    Stacked: Symbol('Stacked'),
    Drawer: Symbol('Drawer'),
    Split: Symbol('Split')
  })

  constructor(props) {
    super(props)
    this.state = {
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

  getDisplayModeForWindow(window) {
    if (this.props.shouldStack(window)) {
      return SplitNavigator.DisplayMode.Stacked
    }

    if (this.props.shouldSplit(window)) {
      return SplitNavigator.DisplayMode.Split
    }

    return SplitNavigator.DisplayMode.Drawer
  }

  get isSplit() {
    return this.state.displayMode == SplitNavigator.DisplayMode.Split
  }

  get isStacked() {
    return this.state.displayMode == SplitNavigator.DisplayMode.Stacked
  }

  get isDrawer() {
    return this.state.displayMode == SplitNavigator.DisplayMode.Drawer
  }

  renderDrawer() {
    return (
      <Drawer
        ref={ref => this.drawer = ref}
        minWidth={300}
        maxWidth={this.isStacked ? this.state.window.width : 300 }
        open={this.isStacked}
        width={this.isDrawer ? '33%' : '100%'}
        style={{
          paddingRight: this.isSplit ? 10 : 0,
          backgroundColor: 'white'
        }}
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
            paddingRight: this.isSplit ? 10 : 0,
            marginRight: this.isSplit ? 10 : 0,

            backgroundColor: 'white',
            height: '100%',
            width: this.isSplit ? '33%' : '100%',
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
        backLabel={depth => depth > (this.isSplit ? 1 : 0) ? '<' : null}
        onBack={(next, depth) => {
          depth == 1 && this.drawer ? this.drawer.open() : next()
        }}
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
          {
            flex: 1,
            flexDirection: 'row',
          }
          ]
        }
      >

        {this.isSplit ? this.renderMaster() : this.renderDrawer()}

        {this.renderDetail()}

      </View>
    )
  }
}
