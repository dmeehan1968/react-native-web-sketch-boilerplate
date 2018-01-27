import React from 'react'
import 'react-native'
import { Text, StyleSheet } from 'react-native'
import { shallow } from 'enzyme';

import { LockScreen, Clock, Overlay, SlideToUnlock } from '.'

describe('LockScreen', () => {

  class SUT {
    constructor(props) {
      this.sut = shallow(<LockScreen {...props} />)
    }

    clock() {
      return this.sut.find(Clock)
    }

    overlay() {
      return this.sut.find(Overlay)
    }

    slider() {
      return this.sut.find(SlideToUnlock)
    }
  }

  test('renders', () => {
    const sut = new SUT()
    expect(sut).toBeTruthy()
  })

  test('renders a clock', () => {
    const sut = new SUT()
    expect(sut.clock()).toHaveLength(1)
  })

  test('passes styles to clock', () => {
    const styles = {
      clock: {
        fontSize: 50
      }
    }
    const sut = new SUT({styles})
    expect(sut.clock().props()).toMatchObject({ style: styles.clock })
  })

  test('does not render an overlay without message', () => {
    const sut = new SUT()
    expect(sut.overlay()).toHaveLength(0)
  })

  test('renders a message into overlay', () => {
    const message = 'My Message'
    const sut = new SUT({message})
    expect(sut.overlay()).toHaveLength(1)
    expect(sut.overlay().props().message).toEqual(message)
  })

  test('passes styles to overlay', () => {
    const styles = {
      overlay: {
        fontSize: 50
      }
    }
    const message = 'Hello'
    const sut = new SUT({styles, message})
    expect(sut.overlay().props()).toMatchObject({ style: styles.overlay, message })
  })

  test('renders a slider', () => {
    const sut = new SUT()
    expect(sut.slider()).toHaveLength(1)
  })

  test('passes styles to slider', () => {
    const props = {
      styles: {
        slider: {
          slider: {
            color: 'white'
          }
        }
      },
      onUnlock: undefined
    }
    const sut = new SUT(props)
    expect(sut.slider().props()).toMatchObject({ styles: props.styles.slider, onSlide: props.onUnlock })
  })

})
