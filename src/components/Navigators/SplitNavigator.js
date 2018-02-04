import React from 'react'
import { View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import StackNavigator from './StackNavigator'
import Drawer from '../Drawer'

export default class SplitNavigator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSplit: false
    }
  }

  componentWillMount() {
    this.onDimensionsChange({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', ::this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', ::this.onDimensionsChange)
  }

  onDimensionsChange({ window }) {
    this.setState({
      window,
      isSplit: window.width >= 600
    })
  }

  render() {

    return (
      <View style={[
        this.props.style,
        {
          flex: 1,
          flexDirection: 'row',
        }
      ]}>

        <Drawer
          ref={ref => this.drawer = ref}
          minWidth={300}
          maxWidth={this.state.isSplit ? 500 : this.state.window.width}
          open={!this.state.isSplit}
          width={this.state.isSplit ? '33%' : '100%'}
          style={{
            paddingRight: this.state.isSplit ? 10 : 0,
            backgroundColor: 'white'
          }}
          animateOnOpen={this.state.isSplit}
          animateOnClose={this.state.isSplit}
        >

          <StackNavigator
            name="masterNavigator"
            ref={ref => this.master = ref}
            root={this.props.master}
            views={this.props.views}
            navigator={{
              navigate: (name, props) => {
                this.detail.navigate(name, props, 0)
                this.drawer.close()
              }
            }}
            style={[
              {
                backgroundColor: 'white',
                // marginRight: 10,
                // paddingRight: 10,
                // borderStyle: 'solid',
                // borderRightColor: '#eee',
                // borderRightWidth: 1,
                // width: this.state.masterWidth,
                height: '100%'
              },
            ]}
          />

        </Drawer>

        <StackNavigator
          name="detailNavigator"
          ref={ref => this.detail = ref}
          root={this.props.detail}
          views={this.props.views}
          style={{ flexGrow: 1 }}
          backLabel={depth => '<'}
          onBack={(next, depth) => {
            depth == 1 ? this.drawer.open() : next()
          }}
        />

      </View>
    )
  }
}
