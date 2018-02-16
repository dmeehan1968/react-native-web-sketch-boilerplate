// @flow
import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

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

type Props = {
  /*
   * Test message to display in the overlay
   */
  message: string,
  /*
   * Additional styles to apply to the overlay
   */
  style: StyleSheet.StyleProp,
}

const Overlay = ({style, message}: Props) => (
  <View style={styles.view}>
    <Text style={[style,
      styles.text
    ]}
    >{message}</Text>
  </View>
)

export default Overlay
