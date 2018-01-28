import React from 'react'
import { View } from 'react-native'

export default class Draggable extends React.Component {

  static defaultProps = {
    name: 'Draggable'
  }
  
  render () {
    return (
      <View
        name={this.props.name}
        style={this.props.style}
      >
        {this.props.children}
      </View>
    )
  }

}
