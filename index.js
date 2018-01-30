import React from 'react'
import { View, AppRegistry } from 'react-native'

import Todo from './src/components/Todo/App'
import HelloWorld from './src/components/HelloWorld'
import DraggableBox from './src/components/DraggableBox'
import LockScreen from './src/components/LockScreen/App'

AppRegistry.registerComponent('Todo', () => Todo)
AppRegistry.registerComponent('HelloWorld', () => HelloWorld)
AppRegistry.registerComponent('LockScreen', () => LockScreenContainer)
AppRegistry.registerComponent('DraggableBox', () => DraggableBox)

if (window.document) {
  AppRegistry.runApplication('Todo', {
    initialProps: {},
    rootTag: document.getElementById('app')
  });
}
