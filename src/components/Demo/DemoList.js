import React from 'react'

import FlatList from '../Todo/FlatList'
import DemoItem from './DemoItem'

const DemoList = ({data, extraData, onItemPress, isItemSelected}) => (
  <FlatList
    data={data}
    extraData={extraData}
    renderItem={({item}) => (
      <DemoItem
        {...item}
        style={{
          backgroundColor: isItemSelected(item) ? '#aaa' : 'transparent'
        }}
        onPress={() => onItemPress(item)}
      />
    )}
  />
)

export default class SelectableDemoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  render() {
    const {data, onItemPress} = this.props
    return (
      <DemoList
        data={data}
        extraData={this.state}
        isItemSelected={item => item === this.state.selected}
        onItemPress={item => {
          this.setState({selected: item})
          onItemPress(item)
        }}
      />
    )
  }
}
