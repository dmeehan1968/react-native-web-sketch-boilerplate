// @flow
import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  name?: string,
  style?: StyleSheet.StyleProp,
  children?: React.Element<any>,
}

const Draggable = ({name, style, children}: Props) => (
  <View
    name={name}
    style={style}
  >
    {children}
  </View>
)

Draggable.defaultProps = {
  name: 'Draggable'
}

export default Draggable
