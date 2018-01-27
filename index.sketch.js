import React from 'react'
import { render, Artboard, StyleSheet, View, Text } from 'react-sketchapp'
import PropTypes from 'prop-types'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'

class Document extends React.Component {

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      artboard: {
        padding: 50,
        backgroundColor: '#eee'
      }
    }))
  }

  render() {
    return (
      <Artboard style={this.styles.artboard}>
        {this.props.children}
      </Artboard>
    )
  }

}

class Device extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    name: 'Desktop',
    width: 800,
    height: 600
  }

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      name: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20
      },
      content: {
        backgroundColor: '#fff'
      }
    }))
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.name}>{this.props.name}</Text>
        <View style={[this.styles.content, {
          height: this.props.height,
          width: this.props.width
        }]}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default () => {

  render((
    <Document>
      {/* <Device name="iPhone SE" width={300} height={568}>
        <HelloWorld />
      </Device> */}
      <Device name="iPhone SE" width={300} height={568}>
        <LockScreen message="My Message" onUnlock={() => {}}/>
      </Device>
    </Document>
  ), context.document.currentPage())

}
