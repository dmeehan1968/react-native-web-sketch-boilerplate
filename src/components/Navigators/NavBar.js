import React from 'react'
import { View, Text } from 'react-native'

export default ({title, backLabel, actionLabel, onBack, style}) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  }}>
    {backLabel ?
      <Text
        name="backLabel"
        style={{
          fontSize: 30,
          width: 75,
          paddingLeft: 10,
          color: 'blue'
        }}
        onPress={onBack}
      >
        {backLabel}
      </Text>
    : null }
    <Text
      name="title"
      style={{
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginLeft: backLabel ? 0 : 75,
        marginRight: actionLabel ? 0 : 75,
        ...style
      }}
    >
      {title}
    </Text>
    {actionLabel ?
      <Text style={{
        width: 75,
        paddingRight: 10
      }}>
        {actionLabel}
      </Text>
    : null }
  </View>
)

const NavBar = ({title, backLabel, actionLabel, onBack, style}) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  }}>
    {backLabel ?
      <Text
        name="backLabel"
        style={{
          fontSize: 30,
          width: 75,
          paddingLeft: 10,
          color: 'blue'
        }}
        onPress={onBack}
      >
        {backLabel}
      </Text>
    : null }
    <Text
      name="title"
      style={{
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginLeft: backLabel ? 0 : 75,
        marginRight: actionLabel ? 0 : 75,
        ...style
      }}
    >
      {title}
    </Text>
    {actionLabel ?
      <Text style={{
        width: 75,
        paddingRight: 10
      }}>
        {actionLabel}
      </Text>
    : null }
  </View>
)
