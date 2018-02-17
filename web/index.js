// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import RootComponent from '../src'

const render = Component => {
  const element = document.getElementById('app')
  if (element) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>
    , element)
  }
}

render(RootComponent)

if (module.hot) {
  module.hot.accept('../src', () => {
    const NextRootComponent = require('../src').default
    render(NextRootComponent)
  })
}
