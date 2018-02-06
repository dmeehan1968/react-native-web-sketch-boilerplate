import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class Overlay extends React.Component {

  static propTypes = {
    /*
     * Test message to display in the overlay
     */
    message: PropTypes.string.isRequired,
    /*
     * Additional styles to apply to the overlay
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={[this.props.style,
          {
            flex: 1,
          }]}
        >{this.props.message}</Text>

      </View>
    )
  }
}
