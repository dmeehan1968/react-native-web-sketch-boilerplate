import React from 'react'
import PropTypes from 'prop-types'

import FlatList from '../Todo/FlatList'
import DemoItem from './DemoItem'
import StylePropTypes from '../StylePropTypes'
import designSystem from '../designSystem'

class DemoItemContainer extends React.PureComponent {

  static propTypes = {
    style: StylePropTypes({}),
    onPress: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  handleOnPress = () => this.props.onPress(this.props.item)

  render() {
    return (
      <DemoItem
        {...this.props.item}
        style={this.props.style}
        onPress={this.handleOnPress}
      />
    )
  }
}

class DemoList extends React.PureComponent {

  static propTypes = {
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

  renderItem = ({item}) => (
    <DemoItemContainer
      item={item}
      style={{
        backgroundColor: this.props.isItemSelected(item) ? designSystem.colors.selected : designSystem.colors.deselected
      }}
      onPress={this.props.onItemPress}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.extraData}
        renderItem={this.renderItem}
      />
    )
  }
}

export default class SelectableDemoList extends React.PureComponent {

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

  onIsItemSelected = item => (
    this.state.selected && item.key === this.state.selected.key
  )

  handleOnItemPress = item => {
    this.setState({selected: item})
    this.props.onItemPress(item)
  }

  render() {
    return (
      <DemoList
        data={this.props.data}
        extraData={this.state}
        isItemSelected={this.onIsItemSelected}
        onItemPress={this.handleOnItemPress}
      />
    )
  }
}
