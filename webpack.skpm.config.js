module.exports = function(config) {
  config.resolve = config.resolve || {}
  config.resolve.alias = {
    'react-native$': 'react-sketchapp'
  }
  config.devtool = 'eval-cheap-module-source-map'
  config.module.rules = config.module.rules.map(function(rule) {
    if (rule.use.loader === 'babel-loader') {
      // Stage-0 necessary for static contextTypes in React.Components
      // rule.use.options.presets.push('stage-0')
      rule.use.options.plugins = [
        'transform-runtime',
        'transform-class-properties',
        'transform-function-bind'
      ]
      // rule.use.options.sourceMap = true
    }
    return rule
  })

}
