import React from 'react'
import PropTypes from 'prop-types'

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

DemoList.propTypes = {
  /*
   * Array of data to that is used to populate the list
   */
  data: PropTypes.array.isRequired,
  /*
   * Extra data used to trigger render
   */
  extraData: PropTypes.any,
  /*
   * Function to handle when an item is pressed
   */
  onItemPress: PropTypes.func.isRequired,
  /*
   * Function to determine if an item is a selected item
   */
  isItemSelected: PropTypes.func.isRequired,
}

export default class SelectableDemoList extends React.Component {

  static propTypes = {
    /*
     * The currently selected item
     */
    selected: PropTypes.any,
    /*
     * Array of data to that is used to populate the list
     */
    data: PropTypes.any,
    /*
     * Function to handle with an item is pressed
     */
    onItemPress: PropTypes.func.isRequired,
  }

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
