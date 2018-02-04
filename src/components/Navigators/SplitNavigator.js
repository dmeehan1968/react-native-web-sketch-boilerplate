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

  renderDrawer() {
    return (
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
        {this.renderMaster()}

      </Drawer>
    )
  }

  renderMaster() {
    return (
      <StackNavigator
        name="masterNavigator"
        ref={ref => this.master = ref}
        root={this.props.master}
        views={this.props.views}
        navigator={{
          navigate: (name, props) => {
            this.detail.navigate(name, props, 0)
            this.drawer && this.drawer.close()
          }
        }}
        style={[
          {
            borderRightWidth: 1,
            borderStyle: 'solid',
            borderRightColor: '#eee',
            paddingRight: this.state.isSplit ? 10 : 0,
            marginRight: this.state.isSplit ? 10 : 0,

            backgroundColor: 'white',
            height: '100%',
            width: this.state.isSplit ? '33%' : '100%',
          },
        ]}
      />
    )
  }

  renderDetail() {
    return (
      <StackNavigator
        name="detailNavigator"
        ref={ref => this.detail = ref}
        root={this.props.detail}
        views={this.props.views}
        style={{
          flex: 1,
          flexGrow: 1
        }}
        backLabel={depth => depth > (this.state.isSplit ? 1 : 0) ? '<' : null}
        onBack={(next, depth) => {
          depth == 1 && this.drawer ? this.drawer.open() : next()
        }}
      />
    )
  }

  render() {

    return (
      <View
        name="SplitNavigator"
        style={
          [
          this.props.style,
          {
            flex: 1,
            flexDirection: 'row',
          }
          ]
        }
      >

        {this.state.isSplit ? this.renderMaster() : this.renderDrawer()}

        {this.renderDetail()}

      </View>
    )
  }
}
