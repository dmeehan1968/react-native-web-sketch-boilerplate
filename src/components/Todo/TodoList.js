// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'

import FlatList from './FlatList'
import TodoListItem from './TodoListItem'

type Item = {
  id: number,
  title: string
}

type ItemPressHandler = (item: Item) => void
type PressHandler = () => void

type TodoListItemContainerProps = {
  item: Item,
  onPress: ItemPressHandler,
}

class TodoListItemContainer extends React.PureComponent<TodoListItemContainerProps> {

  handlePress: PressHandler = () => this.props.onPress(this.props.item)

  render() {
    return (
      <TodoListItem
        {...this.props.item}
        onPress={this.handlePress}
      />
    )
  }
}

type KeyExtractor = (item: Item) => string
type RenderItem = ({ item: Item }) => React.Element<any>

type TodoListProps = {
  /*
   * Array of todo list items
   */
  items: Array<Item>,
  /*
   * Function to handle when an item is pressed, receives the item as an
   * argument
   */
  onItemPress: ItemPressHandler,
  /*
   * Optional styles to be passed to the TodoList
   */
  style: StyleSheet.StyleProp,
}

export default class TodoList extends React.PureComponent<TodoListProps> {

  keyExtractor: KeyExtractor = (item: Item): string => item.id.toString()

  renderItem: RenderItem = ({item}) => (
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
