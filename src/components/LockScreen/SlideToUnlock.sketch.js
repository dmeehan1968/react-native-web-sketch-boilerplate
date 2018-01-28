import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Slider from './Slider'

export default class SlideToUnlock extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
  }

  render() {
    return (
      <View
        style={this.props.style}
      >
        <Slider
          left={0}
          buttonHeight={50}
          buttonColor={'#aaa'}
          sliderColor={'#eee'}
          textColor={'#aaa'}
          onLayout={() => {}}
          message="Slide to Unlock >>>"
        />
      </View>
      )
  }
}
