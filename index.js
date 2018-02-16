// @flow
import { AppRegistry } from 'react-native'

import DemoApp from './src/components/Demo'
import AppJson from './app.json'

AppRegistry.registerComponent('DemoApp', () => DemoApp)

if (window.document) {
  AppRegistry.runApplication(AppJson.expo.appKey, {
    initialProps: {},
    rootTag: document.getElementById('app')
  })
}
