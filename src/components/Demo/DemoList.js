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
      selected: this.props.selected
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ selected: newProps.selected })
  }

  render() {
    const {data, onItemPress} = this.props
    return (
      <DemoList
        data={data}
        extraData={this.state}
        isItemSelected={item => {
          return this.state.selected && item.key === this.state.selected.key
        }}
        onItemPress={item => {
          this.setState({selected: item})
          onItemPress(item)
        }}
      />
    )
  }
}
