import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

export default class Draggable extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
  }
  
  static defaultProps = {
    name: 'Draggable'
  }

  render () {
    return (
      <View
        name={this.props.name}
        style={this.props.style}
      >
        {this.props.children}
      </View>
    )
  }

}
