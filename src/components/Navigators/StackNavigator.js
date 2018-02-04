import React from 'react'
import { View, Text } from 'react-native'

import NavBar from './NavBar'

export default class StackNavigator extends React.Component {

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
      props: { ...props, ...otherProps },
      element: (
        <Component
          {...props}
          {...otherProps}
          {...navHandlers}
        />
      )
    }
  }

  navigate(name, props, index) {
    this.setState({
      stack: [
        ...this.state.stack.slice(0, index),
        this.getView(name, props)
      ]
    })
  }

  insertAt(index, name) {
    const stack = [ ...this.state.stack ]
    stack.splice(index, 0, this.getView(name))
    this.setState({ stack })
  }

  removeAt(index) {
    const stack = [ ...this.state.stack ]
    stack.splice(index, 1)
    this.setState({ stack })
  }

  pop() {
    this.setState({
      stack: this.state.stack.slice(0, -1)
    })
  }

  componentWillMount() {
    const root = Array.isArray(this.props.root) ? this.props.root : [ this.props.root ]
    this.setState({
      stack: root.map(view => view && this.getView(view)).filter(view => !!view)
    })
  }

  backLabel(depth) {
    return depth > 1 ? '<' : null
  }

  render() {
    console.log(this.state.stack)
    const { view, element, props } = this.state.stack.slice(-1).pop()
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
        {element}
      </View>
    )
  }
}
