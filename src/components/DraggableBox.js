import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Draggable from './Draggable'
import Box from './Box'

export default class DraggableBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: 'Drag Me',
      color: 'black'
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Draggable
          onDragStart={() => this.setState({ message: 'Drop Me', color: 'blue' })}
          onDragEnd={() => this.setState({ message: 'Weeee!!', color: 'red' })}
          onSpringEnd={() => this.setState({ message: 'Drag Me', color: 'black' })}
          springBack={true}
          springSettings={{ speed: 12 }}
        >
          <Box
            style={{
              height: 100,
              width: 100,
              backgroundColor: this.state.color,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white' }}>{this.state.message}</Text>
          </Box>
        </Draggable>
      </View>
    )
  }
}
