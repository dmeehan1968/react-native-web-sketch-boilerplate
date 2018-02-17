// @flow
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

type Props = {
  /*
   * Optional styles to be passed to the detail view
   */
  style: StyleSheet.StyleProp,
  /*
   * Title of the item as string
   */
  title?: string,
}

const TodoDetail = ({style, title}: Props) => (
  <View
    style={style}
  >
    <Text>
      Content Here for item &apos;{title}&apos;
    </Text>
  </View>
)

export default TodoDetail
