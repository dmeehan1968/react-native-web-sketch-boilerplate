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

  getScreen(name, otherProps = {}) {
    const config = this.props.config[name]
    const { component: Component, props = {}, handlers = {} } = config
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
      config: config,
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
        this.getScreen(name, props)
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
    const {config, element, props} = this.state.stack.slice(-1).pop()
    const back = this.state.stack.length > 1

    return (
      <View style={this.props.style}>
        <NavBar
          backLabel={back ? "<" : null }
          title={typeof config.title === 'function' && config.title(props) || config.title || "--No Title--"}
          onBack={config.onBack && config.onBack || ::this.pop}
        />
        {element}
      </View>
    )
  }
}
