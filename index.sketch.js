// @flow
import * as React from 'react'
import { render, Artboard, Document, Page, StyleSheet } from 'react-sketchapp'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'
import DraggableBox from './src/components/DraggableBox'

import designSystem from './src/components/designSystem'

type DeviceProps = {
  name: string,
  width: number,
  height: number,
  landscape: boolean,
  children?: React.Element<any>,
}

class Device extends React.Component<DeviceProps> {

  static defaultProps = {
    name: 'Desktop',
    width: 800,
    height: 600,
    landscape: false
  }

  _styles: StyleSheet.Styles

  get styles() {
    return this._styles || (this._styles = StyleSheet.create({
      container: {
        margin: 10,
        backgroundColor: '#fff',
      },
      content: {
      }
    }))
  }

  render() {
    return (
      <Artboard name={this.props.name} style={[this.styles.container, {
        height: this.props.landscape ? this.props.width : this.props.height,
        width: this.props.landscape ? this.props.height : this.props.width,
      }]}>
        {this.props.children}
      </Artboard>
    )
  }
}

type DeviceContainerProps = {
  landscape?: boolean,
  children?: React.Element<any>,
}

const IPhoneSE = ({landscape, children}: DeviceContainerProps) => (
  <Device name="iPhone SE" width={300} height={568} landscape={landscape}>
    {children}
  </Device>
)

const IPhoneX = ({landscape, children}: DeviceContainerProps) => (
  <Device name="iPhone X" width={375} height={812} landscape={landscape}>
    {children}
  </Device>
)

const IPad = ({landscape, children}: DeviceContainerProps) => (
  <Device name="iPad" width={768} height={1024} landscape={landscape}>
    {children}
  </Device>
)

const SmallDesktop = ({landscape, children}: DeviceContainerProps) => (
  <Device name="Small Desktop" width={800} height={600} landscape={landscape}>
    {children}
  </Device>
)

const styles = StyleSheet.create({
  artboard: {
    flexDirection: 'row',
    marginBottom: 100,
    backgroundColor: designSystem.colors.artboardBackgroundColor,
  }
})

type SpreadProps = {
  name?: string,
  style?: StyleSheet.StyleProp,
  children: React.Element<any>,
}

const Spread = ({name, style, children, ...otherProps}: SpreadProps) => (
  <Artboard
    name={name}
    style={[styles.artboard, style]}
    {...otherProps}
  >
    <IPhoneSE>{React.cloneElement(children)}</IPhoneSE>
    <IPhoneX>{React.cloneElement(children)}</IPhoneX>
    <IPad>{React.cloneElement(children)}</IPad>
    <SmallDesktop>{React.cloneElement(children)}</SmallDesktop>
  </Artboard>
)

export default () => {
  render((
    <Document>
      <Page>
        <Spread name="HelloWorld">
          <HelloWorld />
        </Spread>
        <Spread name="Draggable Box">
          <DraggableBox />
        </Spread>
        <Spread name="LockScreen">
          <LockScreen
            message="This is a message that will be replaced when the device is unlocked"
          />
        </Spread>
      </Page>
    </Document>
))

}
