import React from 'react'
import { Image, View, Text, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'

import SlideToUnlock from './SlideToUnlock'
import Clock from './Clock'
import Overlay from './Overlay'

export default class LockScreen extends React.Component {

  static propTypes = {
    message: PropTypes.string,
    onUnlock: PropTypes.func,
    styles: PropTypes.shape({
      lockscreen: PropTypes.object,
      clock: PropTypes.object,
      overlay: PropTypes.object,
      slider: PropTypes.object,
    }),
  }

  static defaultProps = {
    styles: {
      lockscreen: {},
      clock: {},
      overlay: {},
      slider: {}
    },
    onUnlock: () => {}
  }

  constructor(props) {
    super(props)
    this.state = { locked: true }
  }

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
        lockscreen: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: 50,
          ...this.props.styles.lockscreen
        },
        clock: {
          fontSize: 30,
          ...this.props.styles.clock
        },
        overlay: {
          textAlign: 'center',
          ...this.props.styles.overlay
        },
        slider: {
          width: '80%',
          ...this.props.styles.slider
        }
      }
    ))
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
          onUnlock={() => {
            if (this.state.locked) {
              this.props.onUnlock()
              this.setState({ locked: false })
            }
          }}
          buttonHeight={50}
        />
      </View>
    )
  }
}