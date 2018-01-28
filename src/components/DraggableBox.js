import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Draggable from './Draggable'
import Box from './Box'

export default class DraggableBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dragging: false
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Draggable
          onDragStart={() => this.setState({dragging: true})}
          onDragEnd={() => this.setState({dragging: false, springing: true})}
          onSpringEnd={() => this.setState({ springing: false })}
          springBack={true}
          springSpeed={1}
        >
          <Box
            style={{
              height: 100,
              width: 100,
              backgroundColor: this.state.dragging ? 'blue' : 'black',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white' }}>{this.state.dragging ? (this.state.springing ? "Weeeeee" : "Drop Me") : "Drag Me"}</Text>
          </Box>
        </Draggable>
      </View>
    )
  }
}
