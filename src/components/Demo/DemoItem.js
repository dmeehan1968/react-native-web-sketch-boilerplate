import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

const DemoItem = ({title, onPress, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      height: 40,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      justifyContent: 'center',
      padding: 10,
      ...style
    }}>
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
