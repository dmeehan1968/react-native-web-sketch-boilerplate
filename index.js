import React from 'react'
import { AppRegistry } from 'react-native'

import HelloWorld from './src/components/HelloWorld'

AppRegistry.registerComponent('HelloWorld', () => HelloWorld)

if (window.document) {
  AppRegistry.runApplication('HelloWorld', {
    initialProps: {},
    rootTag: document.getElementById('app')
  });
}
