import React from 'react'
import PropTypes from 'prop-types'

import FlatList from './FlatList'
import TodoListItem from './TodoListItem'

import StylePropTypes from '../StylePropTypes'

class TodoListItemContainer extends React.PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  handleItemPress = () => this.props.onPress(this.props.item)

  render() {
    return (
      <TodoListItem
        {...this.props.item}
        onPress={this.handleItemPress}
      />
    )
  }
}


export default class TodoList extends React.PureComponent {

  static propTypes = {
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
    style: StylePropTypes({}),
  }

  keyExtractor = item => item.id.toString()

  renderItem = ({item}) => (
    <TodoListItemContainer
      item={item}
      onPress={this.props.onItemPress}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.items}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={this.props.style}
      />
    )
  }
}
