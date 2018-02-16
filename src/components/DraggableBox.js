import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Draggable from './Draggable'
import Box from './Box'

import designSystem from './designSystem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: designSystem.colors.boxTextColor
  }
})

export default class DraggableBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: 'Drag Me',
      color: designSystem.colors.boxDefaultColor
    }
  }

  handleDragStart = () => this.setState({ message: 'Drop Me', color: designSystem.colors.boxDragColor })
  handleDragEnd = () => this.setState({ message: 'Weeee!!', color: designSystem.colors.boxSpringColor })
  handleSpringEnd = () => this.setState({ message: 'Drag Me', color: designSystem.colors.boxDefaultColor })

  render() {
    return (
      <View style={styles.container}>
        <Draggable
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onSpringEnd={this.handleSpringEnd}
          springBack
          springConfig={{ speed: 12 }}
        >
          <Box
            style={[styles.box, {
              backgroundColor: this.state.color,
            }]}
          >
            <Text style={styles.text}>{this.state.message}</Text>
          </Box>
        </Draggable>
      </View>
    )
  }
}
