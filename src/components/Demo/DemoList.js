import React from 'react'

import FlatList from '../Todo/FlatList'
import DemoItem from './DemoItem'

export default ({data, onItemPress}) => (
  <FlatList
    data={data}
    renderItem={({item}) => (
      <DemoItem
        {...item}
        onPress={() => onItemPress(item)}
      />
    )}
  />
)
