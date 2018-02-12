import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import designSystem from '../designSystem'

const styles = StyleSheet.create({
  demoItem: {
    width: '100%',
    height: designSystem.list.item.height,
    borderStyle: 'solid',
    borderBottomColor: designSystem.list.item.separator.color,
    borderBottomWidth: designSystem.list.item.separator.width,
    justifyContent: 'center',
    padding: 10,
  }
})

const DemoItem = ({title, onPress, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.demoItem, style]}
  >
    <Text>
      {title}
    </Text>
  </TouchableOpacity>
)

DemoItem.propTypes = {
  /*
   * The text to be displayed in the item
   */
  title: PropTypes.string.isRequired,
  /*
   * Additional styles to be applied
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  /*
   * Function to call when the item is pressed
   */
  onPress: PropTypes.func,
}

export default DemoItem
