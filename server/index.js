// @flow
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../web/webpack.express.dev.js'
const compiler = webpack(webpackConfig)

const app = express()
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.json())

/* global __dirname */
/* global process */

const DIST_DIR = path.resolve(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use('/', express.static(DIST_DIR))

app.get("*", (req: express$Request, res: express$Response, next: express$NextFunction) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
          return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
  })
})

const port = process.env.PORT || 3000

export default app.listen(port, () => {
  console.log(`Started on port ${port}`) // eslint-disable-line no-console
})
