import React from 'react'
import { Text, View } from 'react-native'

export default class Overlay extends React.Component {

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
