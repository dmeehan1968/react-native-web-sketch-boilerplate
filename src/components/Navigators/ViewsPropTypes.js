import PropTypes from 'prop-types'

/*
 * An object containing properties that are objects describing the
 * available views
 */
export default PropTypes.objectOf(

  PropTypes.shape({
    /*
     * React component to be used to render the view.  Function or class
     */
    component: PropTypes.func.isRequired,
    /*
     * The title for the NavBar
     */
    title: PropTypes.oneOfType([
      /*
       * Literal string to be used for the title
       */
      PropTypes.string,
      /*
       * Function to determine the title for the NavBar.  Receives the
       * computed props for the component as a argument
       */
      PropTypes.func,
    ]).isRequired,
    /*
     * Option properties object to be passed to the component
     */
    props: PropTypes.object,
    /*
     * An object containing handlers to be passed as props to the
     * component.  This allows existing component handlers to be mapped
     * to nvigator actions.  Receives the original arguments plus an
     * additional 'navigator' argument, which has a 'navigate' property
     * which is a function which takes a string which is the name of the
     * view to navigate to (as appears in the 'views' property) and an
     * optional object argument which are props to be passed to the view
     *
     * navigator = {
     *  navigate: (view, props) => {}
     * }
     */
    handlers: PropTypes.objectOf(
      PropTypes.func,
    ),
  }),
)
