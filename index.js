import React from 'react'
import { View, AppRegistry } from 'react-native'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'
import DraggableBox from './src/components/DraggableBox'

AppRegistry.registerComponent('HelloWorld', () => HelloWorld)
AppRegistry.registerComponent('LockScreen', () => LockScreen)

AppRegistry.registerComponent('DraggableBox', () => DraggableBox)

if (window.document) {
  AppRegistry.runApplication('DraggableBox', {
    initialProps: {},
    rootTag: document.getElementById('app')
  });
  // AppRegistry.runApplication('LockScreen', {
  //   initialProps: { message: "My Message" },
  //   rootTag: document.getElementById('app')
  // });
}
