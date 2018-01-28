import React from 'react'
import { View, AppRegistry } from 'react-native'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'
import DraggableBox from './src/components/DraggableBox'

class LockScreenContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <LockScreen
        message="This is a sample user message.  It will change to 'unlocked' when the slider is moved all the way to the right."
        {...this.props}
        {...this.state}
        onUnlock={() => {
          this.setState({ message: 'Unlocked' })
        }}
      />
    )
  }
}

AppRegistry.registerComponent('HelloWorld', () => HelloWorld)
AppRegistry.registerComponent('LockScreen', () => LockScreenContainer)
AppRegistry.registerComponent('DraggableBox', () => DraggableBox)

if (window.document) {
  AppRegistry.runApplication('LockScreen', {
    initialProps: {},
    rootTag: document.getElementById('app')
  });
}
