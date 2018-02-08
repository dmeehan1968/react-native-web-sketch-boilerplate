import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

const Box = ({children, ...rest}) => (
  <View {...rest}>{children}</View>
)

Box.propTypes = {
  children: PropTypes.node,
}

export default Box
