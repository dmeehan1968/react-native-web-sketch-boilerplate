// @flow
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import designSystem from '../designSystem'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: designSystem.list.item.height,
    borderStyle: 'solid',
    borderBottomColor: designSystem.colors.separator,
    borderBottomWidth: 1,
    justifyContent: 'center',
    padding: 10
  }
})

type PressHandler = () => void

type Props = {
  /*
   * Title of the item, as a string
   */
  title: string,
  /*
   * Function to have when the item is pressed, receives the item as an
   * argument
   */
  onPress: PressHandler,
}

const TodoListItem = ({title, onPress = () => undefined }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}>
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)

export default TodoListItem
