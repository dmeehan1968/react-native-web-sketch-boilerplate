import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const TodoListItem = ({title, onPress = () => {}}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      height: 40,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      justifyContent: 'center',
      padding: 10
    }}>
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
