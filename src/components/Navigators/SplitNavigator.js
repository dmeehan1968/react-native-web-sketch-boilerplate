import React from 'react'
import { View } from 'react-native'
import StackNavigator from './StackNavigator'

export default class SplitNavigator extends React.Component {

  render() {
    return (
      <View style={[
        this.props.style,
        {
          flex: 1,
          flexDirection: 'row',
        }
      ]}>

        <StackNavigator
          ref={ref => this.master = ref}
          root={this.props.master}
          views={this.props.views}
          navigator={{
            navigate: (name, props) => {
              this.detail.navigate(name, props, 0)
            }
          }}
          style={{
            marginRight: 10,
            paddingRight: 10,
            borderStyle: 'solid',
            borderRightColor: '#eee',
            borderRightWidth: 1,
            width: '25%'
          }}
        />

        <StackNavigator
          ref={ref => this.detail = ref}
          root={this.props.detail}
          views={this.props.views}
          style={{ flexGrow: 1 }}
        />

      </View>
    )
  }
}
