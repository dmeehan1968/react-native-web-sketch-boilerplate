// @flow
import * as React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.Node,
}

const Box = ({children, ...rest}: Props) => (
  <View {...rest}>{children}</View>
)

export default Box
