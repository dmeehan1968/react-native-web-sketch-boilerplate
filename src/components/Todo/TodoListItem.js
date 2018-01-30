import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default ({title, onPress}) => (
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
