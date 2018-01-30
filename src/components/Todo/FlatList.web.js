import React from 'react'
import { View } from 'react-native'

export default ({
  data = [],
  renderItem = () => null,
  keyExtractor = () => 0
}) => (
  <View>
    {data.map((item, index) => (
      <View key={keyExtractor && keyExtractor(item) || item.key}>
        {renderItem({item, index})}
      </View>
    ))}
  </View>
)
