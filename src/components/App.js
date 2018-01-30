import React from 'react'
import {
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const FlatListWeb = ({
  data = [],
  renderItem = () => null,
  keyExtractor = () => 0
}) => (
  <View>
    {data.map((item, index) => (
      <View key={keyExtractor && keyExtractor(item) || item.key}>
        {renderItem({item, index})}
      </View>
    ))}
  </View>
)

const ListComponent = Platform.OS === 'web' ? FlatListWeb : FlatList

const TodoListItem = ({title, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      height: 40,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      justifyContent: 'center',
      padding: 10
    }}>
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)

const TodoList = ({title, items, style, onItemPress}) => (
  <ListComponent
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TodoListItem
        key={item.index}
        {...item}
        onPress={() => onItemPress(item)}
      />
    )}
    style={style}
  />
)

const TodoDetail = ({style, title}) => (
  <View
    style={style}
  >
    <Text>
      Content Here
    </Text>
  </View>
)

const NavBar = ({title, backLabel, actionLabel, onBack, style}) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  }}>
    {backLabel ?
      <Text
        name="backLabel"
        style={{
          fontSize: 30,
          width: 75,
          paddingLeft: 10,
          color: 'blue'
        }}
        onPress={onBack}
      >
        {backLabel}
      </Text>
    : null }
    <Text
      name="title"
      style={{
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginLeft: backLabel ? 0 : 75,
        marginRight: actionLabel ? 0 : 75,
        ...style
      }}
    >
      {title}
    </Text>
    {actionLabel ?
      <Text style={{
        width: 75,
        paddingRight: 10
      }}>
        {actionLabel}
      </Text>
    : null }
  </View>
)

class StackNavigator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stack: []
    }
  }

  getScreen(name, otherProps = {}) {
    const config = this.props.config[name]
    const { component: Component, props = {}, handlers = {} } = config
    const navHandlers = {}
    const navigator = {
      navigate: ::this.navigate
    }
    Object.getOwnPropertyNames(handlers).forEach(name => {
      navHandlers[name] = (...args) => {
        return handlers[name](...args, navigator)
      }
    })
    return {
      config: config,
      props: { ...props, ...otherProps },
      element: (
        <Component
          {...props}
          {...otherProps}
          {...navHandlers}
        />
      )
    }
  }

  navigate(name, props) {
    console.log(`>>> ${name}`)
    this.setState({
      stack: [
        ...this.state.stack,
        this.getScreen(name, props)
      ]
    })
  }

  pop() {
    console.log('<<<')
    this.setState({
      stack: this.state.stack.slice(0, -1)
    })
  }

  componentWillMount() {
    this.navigate(this.props.root)
  }

  render() {
    const {config, element, props} = this.state.stack.slice(-1).pop()
    const back = this.state.stack.length > 1

    return (
      <View style={this.props.style}>
        <NavBar
          backLabel={back ? "<" : null }
          title={typeof config.title === 'function' && config.title(props) || config.title || "--No Title--"}
          onBack={config.onBack && config.onBack || ::this.pop}
        />
        {element}
      </View>
    )
  }
}

export default class App extends React.Component {

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
