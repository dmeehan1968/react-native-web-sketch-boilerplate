import React from 'react'
import { AppRegistry } from 'react-native'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'

AppRegistry.registerComponent('HelloWorld', () => HelloWorld)
AppRegistry.registerComponent('LockScreen', () => LockScreen)

if (window.document) {
  AppRegistry.runApplication('LockScreen', {
    initialProps: { message: "My Message" },
    rootTag: document.getElementById('app')
  });
}
