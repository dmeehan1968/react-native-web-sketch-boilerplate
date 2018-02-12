import PropTypes from 'prop-types'

const StylePropTypes = shape => PropTypes.oneOfType([
  PropTypes.shape(shape),       /* object literal */
  PropTypes.number,             /* StyleSheet ordinal */
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(shape),   /* object literal */
      PropTypes.number,         /* StyleSheet ordinal */
    ])
  ),
])

export default StylePropTypes
