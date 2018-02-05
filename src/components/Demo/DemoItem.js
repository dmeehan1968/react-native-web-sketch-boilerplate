import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default ({title, onPress, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      height: 40,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      justifyContent: 'center',
      padding: 10,
      ...style
    }}>
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)
