import React from 'react'
import PropTypes from 'prop-types'

import FlatList from './FlatList'
import TodoListItem from './TodoListItem'

const TodoList = ({items, style, onItemPress = () => null}) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TodoListItem
        {...item}
        onPress={() => onItemPress(item)}
      />
    )}
    style={style}
  />
)

TodoList.propTypes = {
  /*
   * Array of todo list items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ),
  /*
   * Function to handle when an item is pressed, receives the item as an
   * argument
   */
  onItemPress: PropTypes.func,
  /*
   * Optional styles to be passed to the TodoList
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
}

export default TodoList
