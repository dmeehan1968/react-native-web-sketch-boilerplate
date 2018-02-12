import React from 'react'
import { render, Artboard, Document, Page, StyleSheet } from 'react-sketchapp'
import PropTypes from 'prop-types'

import HelloWorld from './src/components/HelloWorld'
import { LockScreen } from './src/components/LockScreen'
import DraggableBox from './src/components/DraggableBox'

import designSystem from './src/components/designSystem'

class Device extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    landscape: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    name: 'Desktop',
    width: 800,
    height: 600,
    landscape: false
  }

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

const IPhoneSE = ({landscape, children}) => (
  <Device name="iPhone SE" width={300} height={568} landscape={landscape}>
    {children}
  </Device>
)

IPhoneSE.propTypes = {
  landscape: PropTypes.bool,
  children: PropTypes.node,
}

const IPhoneX = ({landscape, children}) => (
  <Device name="iPhone X" width={375} height={812} landscape={landscape}>
    {children}
  </Device>
)

IPhoneX.propTypes = {
  landscape: PropTypes.bool,
  children: PropTypes.node,
}

const IPad = ({landscape, children}) => (
  <Device name="iPad" width={768} height={1024} landscape={landscape}>
    {children}
  </Device>
)

IPad.propTypes = {
  landscape: PropTypes.bool,
  children: PropTypes.node,
}

const SmallDesktop = ({landscape, children}) => (
  <Device name="Small Desktop" width={800} height={600} landscape={landscape}>
    {children}
  </Device>
)

SmallDesktop.propTypes = {
  landscape: PropTypes.bool,
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  artboard: {
    flexDirection: 'row',
    marginBottom: 100,
    backgroundColor: designSystem.colors.artboardBackgroundColor,
  }
})

const Spread = ({name, style, children, ...otherProps}) => (
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

Spread.propTypes = {
  name: PropTypes.string,
  style: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({}),
          PropTypes.number,
        ])
      ),
      PropTypes.number,
    ]),
  children: PropTypes.node,
}

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
