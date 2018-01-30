import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native'

import FlatList from './FlatList'
import StackNavigator from '../Navigators/StackNavigator'
import TodoListItem from './TodoListItem'
import TodoList from './TodoList'
import TodoDetail from './TodoDetail'

export default class Todo extends React.Component {

  static defaultProps = {
    items: [
      { id: 0, title: 'Bread' },
      { id: 1, title: 'Milk' },
      { id: 2, title: 'Bananas' },
    ]
  }

  render() {

    return (
      <SafeAreaView style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <StackNavigator
          root="TodoList"
          config={{
            TodoList: {
              component: TodoList,
              title: "Shopping",
              props: {
                items: this.props.items
              },
              handlers: {
                onItemPress: (item, navigator) => navigator.navigate('TodoDetail', { ...item })
              },
            },
            TodoDetail: {
              component: TodoDetail,
              title: props => props.title,
              props: {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
            }
          }}
          style={{
            flex: 1
          }}
        />
      </SafeAreaView>
    )
  }
}
