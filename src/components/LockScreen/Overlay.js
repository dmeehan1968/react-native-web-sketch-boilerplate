import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  }
})

const Overlay = ({style, message}) => (
  <View style={styles.view}>
    <Text style={[style,
      styles.text
    ]}
    >{message}</Text>
  </View>
)

Overlay.propTypes = {
  /*
   * Test message to display in the overlay
   */
  message: PropTypes.string.isRequired,
  /*
   * Additional styles to apply to the overlay
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
}

export default Overlay
