import React from 'react'
import LockScreen from './LockScreen'

export default class LockScreenApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <LockScreen
        message="This is a sample user message.  It will change to 'unlocked' when the slider is moved all the way to the right."
        {...this.props}
        {...this.state}
        onUnlock={() => {
          this.setState({ message: 'Unlocked' })
        }}
      />
    )
  }
}
