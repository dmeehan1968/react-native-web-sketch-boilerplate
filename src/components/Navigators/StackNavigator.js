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
      navigate: ::this.navigate
    }
    Object.getOwnPropertyNames(handlers).forEach(name => {
      navHandlers[name] = (...args) => {
        return handlers[name](...args, navigator)
      }
    })
    return {
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

  navigate(name, props) {
    console.log(`>>> ${name}`)
    this.setState({
      stack: [
        ...this.state.stack,
        this.getView(name, props)
      ]
    })
  }

  pop() {
    console.log('<<<')
    this.setState({
      stack: this.state.stack.slice(0, -1)
    })
  }

  componentWillMount() {
    this.navigate(this.props.root)
  }

  render() {
    const {view, element, props} = this.state.stack.slice(-1).pop()
    const back = this.state.stack.length > 1

    return (
      <View style={this.props.style}>
        <NavBar
          backLabel={back ? "<" : null }
          title={typeof view.title === 'function' && view.title(props) || view.title || "--No Title--"}
          onBack={view.onBack && view.onBack || ::this.pop}
        />
        {element}
      </View>
    )
  }
}
