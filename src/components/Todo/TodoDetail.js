import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

const TodoDetail = ({style, title}) => (
  <View
    style={style}
  >
    <Text>
      Content Here for item '{title}'
    </Text>
  </View>
)

TodoDetail.propTypes = {
  /*
   * Optional styles to be passed to the detail view
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  /*
   * Title of the item as string
   */
  title: PropTypes.string,
}

export default TodoDetail
