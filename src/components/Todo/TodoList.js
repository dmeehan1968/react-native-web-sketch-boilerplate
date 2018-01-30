import React from 'react'
import { Text, View } from 'react-native'

import FlatList from './FlatList'
import TodoListItem from './TodoListItem'

export default ({title, items, style, onItemPress}) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TodoListItem
        key={item.index}
        {...item}
        onPress={() => onItemPress(item)}
      />
    )}
    style={style}
  />
)
