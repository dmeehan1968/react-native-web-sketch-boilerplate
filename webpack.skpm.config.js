module.exports = function(config) {
  config.resolve = config.resolve || {}

  // map imports for react-native to react-sketchup
  config.resolve.alias = {
    'react-native$': 'react-sketchapp'
  }

  // look for sketch specific modules before generic
  config.resolve.extensions = (config.resolve.extensions || []).concat(['.sketch.js', '.js'])

  // use cheap source maps
  config.devtool = 'eval-cheap-module-source-map'

  config.module.rules = config.module.rules.map(function(rule) {
    if (rule.use.loader === 'babel-loader') {

      // add convenience transforms for ES7 syntax
      rule.use.options = rule.use.options || {}
      rule.use.options.plugins = (rule.use.options.plugins || []).concat([
        'transform-runtime',
        'transform-class-properties',
      ])

      // enable source maps
      rule.use.options.sourceMap = true
    }
    return rule
  })

}
