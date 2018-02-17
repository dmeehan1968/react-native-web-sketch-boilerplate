// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import DemoApp from '../demo/Demo'

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
  module.hot.accept('../demo/Demo', () => {
    const NextComponent = require('../demo/Demo').default
    render(NextComponent)
  })
}
