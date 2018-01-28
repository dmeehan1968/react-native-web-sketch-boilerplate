import React from 'react'
import { Animated, PanResponder, Text, View } from 'react-native'

export default class Box extends React.Component {

  render() {
    const { children, ...rest } = this.props
    return (
      <View {...rest}>{children}</View>
    )
  }
}
