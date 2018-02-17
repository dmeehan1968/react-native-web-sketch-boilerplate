// @flow
import * as React from 'react'
import LockScreen from './LockScreen'

type State = {
  message?: string
}

export default class LockScreenApp extends React.Component<*, State> {

  state = {}

  handleOnUnlock = () => {
    this.setState({ message: 'Unlocked' })
  }

  render() {
    return (
      <LockScreen
        message="This is a sample user message.  It will change to 'unlocked' when the slider is moved all the way to the right."
        {...this.props}
        {...this.state}
        onUnlock={this.handleOnUnlock}
      />
    )
  }
}
