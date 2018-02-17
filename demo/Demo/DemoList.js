// @flow
import React from 'react'
import { StyleSheet } from 'react-native'

import FlatList from '../Todo/FlatList'
import DemoItem from './DemoItem'
import designSystem from '../designSystem'

type Demo = {
  key: number,
  title: string,
  view: string,
}

type DemoItemContainerProps = {
  style?: StyleSheet.StyleProp,
  onPress: Function,
  item: Demo,
}

class DemoItemContainer extends React.PureComponent<DemoItemContainerProps> {

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

type DemoListProps = {
  /*
   * Array of data to that is used to populate the list
   */
  data: Array<Demo>,
  /*
   * Extra data used to trigger render
   */
  extraData: any,
  /*
   * Function to handle when an item is pressed
   */
  onItemPress: Function,
  /*
   * Function to determine if an item is a selected item
   */
  isItemSelected: Function,
}

class DemoList extends React.PureComponent<DemoListProps> {

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

type SelectableDemoListProps = {
  /*
   * The currently selected item
   */
  selected?: any,
  /*
   * Array of data to that is used to populate the list
   */
  data: Array<Demo>,
  /*
   * Function to handle with an item is pressed
   */
  onItemPress: Function,

}

type SelectableDemoListState = {
  selected: any,
}

export default class SelectableDemoList extends React.PureComponent<SelectableDemoListProps, SelectableDemoListState> {

  constructor(props: SelectableDemoListProps) {
    super(props)
    this.state = {
      selected: this.props.selected
    }
  }

  componentWillReceiveProps(newProps: SelectableDemoListProps) {
    this.setState({ selected: newProps.selected })
  }

  onIsItemSelected = (item: Demo) => (
    this.state.selected && item.key === this.state.selected.key
  )

  handleOnItemPress = (item: Demo) => {
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
