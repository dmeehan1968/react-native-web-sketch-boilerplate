import React from 'react'
import { View, AppRegistry } from 'react-native'

import App from './src/components/App'
import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'
import DraggableBox from './src/components/DraggableBox'
import LockScreenContainer from './src/components/LockScreenContainer'

AppRegistry.registerComponent('App', () => App)
AppRegistry.registerComponent('HelloWorld', () => HelloWorld)
AppRegistry.registerComponent('LockScreen', () => LockScreenContainer)
AppRegistry.registerComponent('DraggableBox', () => DraggableBox)

if (window.document) {
  AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.getElementById('app')
  });
}
