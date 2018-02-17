// @flow

type View = {
  /*
   * React component to be used to render the view.  Function or class
   */
  component: Function,
  /*
   * The title for the NavBar, literal string or function which receives
   * the computed props for the view
   */
  title: Function | string,
  /*
   * Option properties object to be passed to the component
   */
  props?: Object,
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
  handlers?: { [string]: Function }
}

export type ViewsType = { [string]: View }
// export default ViewsPropTypes
