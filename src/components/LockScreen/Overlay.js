import React from 'react'
import { Text } from 'react-native'

export default class Overlay extends React.Component {

  render() {
    return (
      <Text>{this.props.message}</Text>
    )
  }
}
