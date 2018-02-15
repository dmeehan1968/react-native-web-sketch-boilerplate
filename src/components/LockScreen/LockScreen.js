// @flow
import * as React from 'react'
import { View, StyleSheet } from 'react-native'

import SlideToUnlock from './SlideToUnlock'
import Clock from './Clock'
import Overlay from './Overlay'

type Props = {
  /*
   * Optional text message to display in the center of the lockscreen
   */
  message?: string,
  /*
   * Function handler for when unlock occurs
   */
  onUnlock: Function,
  /*
   * Additional styles to apply to each sub component
   */
  styles?: StyleSheet.Styles,
}

type State = {
  locked: boolean
}

export default class LockScreen extends React.Component<Props, State> {

  static defaultProps = {
    styles: {
      lockscreen: {},
      clock: {},
      overlay: {},
      slider: {}
    },
    onUnlock: () => null
  }

  state = { locked: true }
  _styles: ?StyleSheet.Styles

  get styles(): StyleSheet.Styles {
    return this._styles || (this._styles = StyleSheet.create({
        lockscreen: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: 50,
          ...this.props.styles && this.props.styles.lockscreen || {}
        },
        clock: {
          fontSize: 30,
          ...this.props.styles && this.props.styles.clock || {}
        },
        overlay: {
          textAlign: 'center',
          fontSize: 20,
          ...this.props.styles && this.props.styles.overlay || {}
        },
        slider: {
          width: '80%',
          ...this.props.styles && this.props.styles.slider || {}
        }
      }
    ))
  }

  handleUnlock = () => {
    if (this.state.locked) {
      this.props.onUnlock()
      this.setState({ locked: false })
    }
  }

  render() {
    return (
      <View name="LockScreen" style={this.styles.lockscreen}>
        <Clock
          style={this.styles.clock}
        />
        {this.props.message ? <Overlay message={this.props.message} style={this.styles.overlay} /> : null}
        <SlideToUnlock
          style={this.styles.slider}
          onUnlock={this.handleUnlock}
          buttonHeight={50}
        />
      </View>
    )
  }
}
