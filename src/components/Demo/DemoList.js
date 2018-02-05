import React from 'react'

import FlatList from '../Todo/FlatList'
import DemoItem from './DemoItem'

export default class DemoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  render() {
    const {data, onItemPress} = this.props
    return (
      <FlatList
        data={data}
        extraData={this.state}
        renderItem={({item}) => (
          <DemoItem
            {...item}
            style={{
              backgroundColor: item === this.state.selected ? '#aaa' : 'transparent'
            }}
            onPress={() => {
              this.setState({ selected: item })
              onItemPress(item)
            }}
          />
        )}
      />
    )
  }
}
