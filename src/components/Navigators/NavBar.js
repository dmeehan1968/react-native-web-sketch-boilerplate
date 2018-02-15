// @flow
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import designSystem from '../designSystem'

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: designSystem.colors.separator,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  backLabel: {
    fontSize: 24,
    width: 75,
    paddingLeft: 10,
    color: designSystem.colors.pressableText
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
  actionLabel: {
    width: 75,
    paddingRight: 10
  },
  noBackLabel: {
    marginLeft: 75,
  },
  noActionLabel: {
    marginRight: 75,
  }
})

type Props = {
  /*
   * Title text for the NavBar
   */
  title: string,
  /*
   * Optional label for the back button (hidden if no label)
   */
  backLabel?: ?string,
  /*
   * Optional label for the action button (hidden if no label)
   */
  actionLabel?: string,
  /*
   * Function to handle when the back button is pressed
   */
  onBack: Function,
  /*
   * Addtional styles to apply to the NavBar title
   */
  style?: StyleSheet.StyleProp,
}

const NavBar = ({title, backLabel, actionLabel, onBack, style}: Props) => (
  <View style={styles.view}>
    {backLabel ?
      <Text
        name="backLabel"
        style={styles.backLabel}
        onPress={onBack}
      >
        {backLabel}
      </Text>
    : null }
    <Text
      name="title"
      style={[styles.title, style, backLabel ? null : styles.noBackLabel, actionLabel ? null : styles.noActionLabel]}
    >
      {title}
    </Text>
    {actionLabel ?
      <Text style={styles.actionLabel}>
        {actionLabel}
      </Text>
    : null }
  </View>
)

export default NavBar
