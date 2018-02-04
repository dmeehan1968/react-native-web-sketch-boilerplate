import React from 'react'
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import { SplitNavigator } from '../Navigators'

import FlatList from '../Todo/FlatList'
import DraggableBox from '../DraggableBox'
import HelloWorld from '../HelloWorld'
import LockScreenApp from '../LockScreen'
import TodoList from '../Todo/TodoList'
import TodoDetail from '../Todo/TodoDetail'
import DemoList from './DemoList'

const TextWrap = ({ viewStyle, textStyle }) => {
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam tellus turpis, scelerisque vel elementum nec, consectetur in nunc.
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Donec vulputate ut ligula vitae semper. Etiam cursus risus et metus
        auctor, at efficitur ex interdum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Cras lacinia
        tortor sed suscipit lobortis. Aliquam pharetra sagittis magna id iaculis.
        Curabitur pretium fermentum nisl, convallis posuere ante rutrum vel.
        Mauris sit amet tellus id sapien mollis eleifend et eget dolor. Maecenas
        libero dui, ornare ut justo quis, iaculis dictum ex. Nam tristique,
        sapien quis iaculis tincidunt, orci augue vestibulum nulla, eget
        consequat mi lorem convallis velit. Integer pellentesque faucibus dolor,
        et pellentesque odio vehicula a.
      </Text>
    </View>
  )
}

export default () => (
  <SafeAreaView
    style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    }}
  >

    <SplitNavigator
      master="DemoList"
      detail="HelloWorld"
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
            },
            {
              key: 4,
              title: 'Text Wrap',
              view: 'TextWrap'
            },
            ]
          },
          handlers: {
            onItemPress: (demo, navigator) => navigator.navigate(demo.view, { title: demo.title })
          },
        },
        HelloWorld: {
          component: HelloWorld,
          title: props => props.title || 'HelloWorld',
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
          props: {
            styles: {
              lockscreen: {
              }
            }
          },
        },
        TextWrap: {
          component: TextWrap,
          title: props => props.title || 'TextWrap',
          props: {
            viewStyle: {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 50,
            },
            textStyle: {
              textAlign: 'center',
            }
          },
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
        },
      }}
      style={{
        flex: 1,
      }}
    />
  </SafeAreaView>
)
