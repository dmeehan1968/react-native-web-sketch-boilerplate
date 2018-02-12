import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

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

const NavBar = ({title, backLabel, actionLabel, onBack, style}) => (
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

NavBar.propTypes = {
  /*
   * Title text for the NavBar
   */
  title: PropTypes.string.isRequired,
  /*
   * Optional label for the back button (hidden if no label)
   */
  backLabel: PropTypes.string,
  /*
   * Optional label for the action button (hidden if no label)
   */
  actionLabel: PropTypes.string,
  /*
   * Function to handle when the back button is pressed
   */
  onBack: PropTypes.func.isRequired,
  /*
   * Addtional styles to apply to the NavBar title
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
}

export default NavBar
