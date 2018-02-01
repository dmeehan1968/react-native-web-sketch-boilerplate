import React from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from '../Navigators'

import FlatList from '../Todo/FlatList'
import DraggableBox from '../DraggableBox'
import HelloWorld from '../HelloWorld'
import LockScreenApp from '../LockScreen'
import TodoList from '../Todo/TodoList'
import TodoDetail from '../Todo/TodoDetail'
import DemoList from './DemoList'

export default () => (
  <SafeAreaView
    style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    }}
  >
    <StackNavigator
      root="DemoList"
      views={{
        DemoList: {
          component: DemoList,
          title: "Demos",
          props: {
            data: [
            {
              key: 0,
              title: 'HelloWorld',
              view: 'HelloWorld'
            },
            {
              key: 1,
              title: 'Draggable Box',
              view: 'DraggableBox'
            },
            {
              key: 2,
              title: 'Lock Screen',
              view: 'LockScreenApp'
            },
            {
              key: 3,
              title: 'Todo List',
              view: 'TodoList'
            }
            ]
          },
          handlers: {
            onItemPress: (demo, navigator) => navigator.navigate(demo.view, { title: demo.title })
          },
        },
        HelloWorld: {
          component: HelloWorld,
          title: props => props.title,
          props: {},
        },
        DraggableBox: {
          component: DraggableBox,
          title: props => props.title,
          props: {},
        },
        LockScreenApp: {
          component: LockScreenApp,
          title: props => props.title,
          props: {},
        },
        TodoList: {
          component: TodoList,
          title: props => props.title,
          props: {
            items: [
            { id: 0, title: 'Bread' },
            { id: 1, title: 'Milk' },
            { id: 2, title: 'Cheese' },
            ]
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
        flex: 1,
      }}
    />
  </SafeAreaView>
)
