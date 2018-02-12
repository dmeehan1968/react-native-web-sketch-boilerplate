import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

const Draggable = ({name, style, children}) => (
  <View
    name={name}
    style={style}
  >
    {children}
  </View>
)

Draggable.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

Draggable.defaultProps = {
  name: 'Draggable'
}

export default Draggable
