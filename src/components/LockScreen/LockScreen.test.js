import React from 'react'
import { StyleSheet } from 'react-native'
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

    clockStyles() {
      return StyleSheet.flatten(this.clock().props().style)
    }

    overlay() {
      return this.sut.find(Overlay)
    }

    overlayStyles() {
      return StyleSheet.flatten(this.overlay().props().style)
    }

    slider() {
      return this.sut.find(SlideToUnlock)
    }

    sliderStyles() {
      return StyleSheet.flatten(this.slider().props().style)
    }
  }

  test('renders', () => {
    const sut = new SUT()
    expect(sut).toBeTruthy()
  })

  describe('clock', () => {

    test('renders a clock', () => {
      const sut = new SUT()
      expect(sut.clock()).toHaveLength(1)
    })

    test('sets default font for clock', () => {
      const styles = {
        clock: {
          fontSize: 30
        }
      }
      const sut = new SUT()
      expect(sut.clockStyles())
        .toEqual(expect.objectContaining(styles.clock))
    })

    test('overrides font for clock', () => {
      const styles = {
        clock: {
          fontSize: 50
        }
      }
      const sut = new SUT({styles})
      expect(sut.clockStyles())
        .toEqual(expect.objectContaining(styles.clock))
    })

  })

  describe('overlay', () => {

    test('does not render an overlay without message', () => {
      const sut = new SUT()
      expect(sut.overlay()).toHaveLength(0)
    })

    test('does not render an overlay with message', () => {
      const message = 'My Message'
      const sut = new SUT({message})
      expect(sut.overlay()).toHaveLength(1)
      expect(sut.overlay().props().message).toEqual(message)
    })

    test('default overlay text is centered', () => {
      const styles = {
        overlay: {
          textAlign: 'center'
        }
      }
      const message = 'Hello'
      const sut = new SUT({message})
      expect(sut.overlayStyles())
        .toEqual(expect.objectContaining(styles.overlay))
    })

    test('default font size for overlay', () => {
      const styles = {
        overlay: {
          fontSize: 20
        }
      }
      const message = 'Hello'
      const sut = new SUT({message})
      expect(sut.overlayStyles())
        .toEqual(expect.objectContaining(styles.overlay))
    })

    test('sets large font size for overlay', () => {
      const styles = {
        overlay: {
          fontSize: 50
        }
      }
      const message = 'Hello'
      const sut = new SUT({styles, message})
      expect(sut.overlayStyles())
        .toEqual(expect.objectContaining(styles.overlay))
    })

  })

  describe('slider', () => {

    test('renders a slider', () => {
      const sut = new SUT()
      expect(sut.slider()).toHaveLength(1)
    })

    test('set slider to 80% width', () => {
      const styles = {
        slider: {
          width: '80%'
        }
      }
      const sut = new SUT()
      expect(sut.sliderStyles())
        .toEqual(expect.objectContaining(styles.slider))
    })

    test('overides slider to width', () => {
      const styles = {
        slider: {
          width: '60%'
        }
      }
      const sut = new SUT({ styles })
      expect(sut.sliderStyles())
        .toEqual(expect.objectContaining(styles.slider))
    })

  })

})
