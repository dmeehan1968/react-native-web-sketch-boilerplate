import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

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
          fontSize: 24,
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
      style={[{
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginLeft: backLabel ? 0 : 75,
        marginRight: actionLabel ? 0 : 75,
      }, style]}
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
