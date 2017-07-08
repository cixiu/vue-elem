require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
// var allowCrossDomain = function (req, res, next) {
//   res.header({
//     'Access-Control-Allow-Credentials': true,
//     'Access-Control-Allow-Headers': 'Content-Type, X-ELEME-USERID, X-Eleme-RequestID, X-Shard',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//     'Access-Control-Allow-Origin': '*'
//   })
//   next()
// }

// app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(cookieParser())
// 服务端代理请求url
var apiRouter = express.Router()

apiRouter.post('/getCaptchasCode', function (req, res, next) {
  var url = 'https://mainsite-restapi.ele.me/v1/captchas';
  // res.header('Access-Control-Allow-Origin', 'https://h5.ele.me')
  axios.post(url, null, {
    withCredentials: true
  }).then((response) => {
    // console.log(response)
    // console.log(req.cookies)
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})


apiRouter.get('/getVerifyCode', function (req, res, next) {
  var url = 'https://mainsite-restapi.ele.me/v4/mobile/verify_code/send';
  // res.header('Access-Control-Allow-Origin', 'https://h5.ele.me')
  axios.post(url, req.query, {
    headers: {
      referer: 'https://h5.ele.me/msite/',
      host: 'mainsite-restapi.ele.me'
    },
    withCredentials: true
  }).then((response) => {
    console.log(response)
    res.json(response.data)
  }).catch((e) => {
    console.log(e.response)
    res.status(400).send(e.response.data)
  })
})

apiRouter.get('/getLoginIn', function (req, res) {
  var url = 'https://mainsite-restapi.ele.me/v1/login/app_mobile';
  // res.header('Access-Control-Allow-Origin', 'https://h5.ele.me')
  axios.post(url, req.query, {
    headers: {
      connection: 'keep-alive'
    },
    withCredentials: true
  }).then((response) => {
    console.log(response)
    res.json(response.data)
  }).catch((e) => {
    console.log(e.response.headers)
    res.status(400).send(e.response.data)
  })
})

apiRouter.post('/getpasswordLoginIn', function (req, res) {
  // res.header('Access-Control-Allow-Origin', 'https://h5.ele.me')
  var url = 'https://mainsite-restapi.ele.me/v2/login';
  axios.post(url, req.body, {
    headers: {
      connection: 'keep-alive'
    },
    withCredentials: true
  }).then((response) => {
    console.log(response)
    res.json(response.data)
  }).catch((e) => {
    console.log(e.response)
    res.status(400).send(e.response.data)
  })
})

app.use('/api', apiRouter)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
