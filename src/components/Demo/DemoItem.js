// @flow
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import designSystem from '../designSystem'

type Props = {
  title: string,
  style?: StyleSheet.StyleProp,
  onPress: () => void
}

const styles: StyleSheet.Styles = StyleSheet.create({
  demoItem: {
    width: '100%',
    height: designSystem.list.item.height,
    borderStyle: 'solid',
    borderBottomColor: designSystem.list.item.separator.color,
    borderBottomWidth: designSystem.list.item.separator.width,
    justifyContent: 'center',
    padding: 10,
  }
})

const DemoItem = ({title, onPress, style}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.demoItem, style]}
  >
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)

export default DemoItem
