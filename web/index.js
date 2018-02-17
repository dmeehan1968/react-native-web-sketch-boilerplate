// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import DemoApp from '../src/components/Demo'

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

render(DemoApp)

if (module.hot) {
  module.hot.accept('../src/components/Demo', () => {
    const NextComponent = require('../src/components/Demo').default
    render(NextComponent)
  })
}
