import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import NavBar from './NavBar'
import ViewsPropTypes from './ViewsPropTypes'

export default class StackNavigator extends React.Component {

  static propTypes = {
    /*
     * Option name as string for the component
     */
    name: PropTypes.string,
    /*
     * Name of the property from 'views' that is the initial view for the
     * navigator
     */
    root: PropTypes.string,
    views: ViewsPropTypes,
    /*
     * Function to determine the back label for the navigator, receives the
     * current stack depth as an argument (zero based)
     */
    backLabel: PropTypes.func,
    /*
     * Optional styles to be added to the navigator
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    /*
     * Optional function to handle what happens when the back button is
     * pressed.  The function is provided a 'next' argument, which is
     * a function that links to the default handler, so that onBack can
     * be supplemented. Default is to pop from the stack.
     */
    onBack: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      stack: []
    }
  }

  getView(name, otherProps = {}) {
    const view = this.props.views[name]
    const { component: Component, props = {}, handlers = {} } = view
    const navHandlers = {}
    const navigator = {
      navigate: ::this.navigate,
      ...this.props.navigator
    }
    Object.getOwnPropertyNames(handlers).forEach(name => {
      navHandlers[name] = (...args) => {
        return handlers[name](...args, navigator)
      }
    })

    return {
      name: name,
      view: view,
      props: { ...props, ...otherProps, ...navHandlers },
      renderElement: () => (
        <Component
          {...props}
          {...otherProps}
          {...navHandlers}
        />
      )
    }
  }

  navigate(name, props, index) {
    this.setState(state => {
      return {
        stack: [
          ...state.stack.slice(0, index),
          this.getView(name, props)
        ]
      }
    })
  }

  pop() {
    this.setState(state => {
      return {
        stack: this.state.stack.slice(0, -1)
      }
    })
  }

  componentWillMount() {
    const root = Array.isArray(this.props.root) ? this.props.root : [ this.props.root ]
    this.setState(state => {
      return {
        stack: root.map(view => view && this.getView(view)).filter(view => !!view)
      }
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState(state => {
      return {
        stack: state.stack.map(view => {
          return this.getView(view.name, { ...view.props, ...newProps.views[view.name].props })
        })
      }
    })
  }

  backLabel(depth) {
    return depth > 1 ? '<' : null
  }

  render() {
    const { view, renderElement, props } = this.state.stack.slice(-1).pop()
    const { backLabel = ::this.backLabel } = this.props

    return (
      <View style={this.props.style} name={this.props.name || 'StackNavigator'}>
        <NavBar
          backLabel={backLabel(this.state.stack.length)}
          title={typeof view.title === 'function' && view.title(props) || view.title || "--No Title--"}
          onBack={() => {
            const next = next => next()
            const onBack = (this.props.onBack || next).bind(null, (view.onBack || next).bind(null, ::this.pop))
            onBack(this.state.stack.length)
          }}
        />
        {renderElement()}
      </View>
    )
  }
}
