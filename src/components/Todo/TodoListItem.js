import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

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

const TodoListItem = ({title, onPress = () => null}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}>
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)

TodoListItem.propTypes = {
  /*
   * Title of the item, as a string
   */
  title: PropTypes.string.isRequired,
  /*
   * Function to have when the item is pressed, receives the item as an
   * argument
   */
  onPress: PropTypes.func,
}

export default TodoListItem
