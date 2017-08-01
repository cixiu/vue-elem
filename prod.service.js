var express = require('express');
var config = require('./config/index');
var app = express();
var proxyMiddleware = require('http-proxy-middleware');

/*
var bodyParser = require('body-parser');
var axios = require('axios');

app.use(bodyParser.json());
var apiRouter = express.Router();

apiRouter.get('/getEntries', function (req, res) {
  var url = 'https://mainsite-restapi.ele.me/shopping/v2/entries';
  axios.get(url, {
    headers: {
      referer: 'https://h5.ele.me/msite/',
      host: 'mainsite-restapi.ele.me'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});

apiRouter.post('/getCaptchasCode', function (req, res, next) {
  var url = 'https://mainsite-restapi.ele.me/v1/captchas';
  axios.post(url, null, {
    withCredentials: true
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});
;

apiRouter.get('/getVerifyCode', function (req, res, next) {
  var url = 'https://mainsite-restapi.ele.me/v4/mobile/verify_code/send';
  axios.post(url, req.query, {
    headers: {
      referer: 'https://h5.ele.me/msite/',
      host: 'mainsite-restapi.ele.me'
    },
    withCredentials: true
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e.response);
    res.status(400).send(e.response.data);
  });
});

apiRouter.get('/getLoginIn', function (req, res) {
  var url = 'https://mainsite-restapi.ele.me/v1/login/app_mobile';
  axios.post(url, req.query, {
    headers: {
      connection: 'keep-alive'
    },
    withCredentials: true
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e.response.headers);
    res.status(400).send(e.response.data);
  });
});

apiRouter.post('/getpasswordLoginIn', function (req, res) {
  var url = 'https://mainsite-restapi.ele.me/v2/login';
  axios.post(url, req.body, {
    headers: {
      connection: 'keep-alive'
    },
    withCredentials: true
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e.response);
    res.status(400).send(e.response.data);
  });
});

app.use('/api', apiRouter);
*/

var context = config.dev.proxyTable;
var options = {
  target: config.dev.proxyTarget,
  changeOrigin: true
};
app.use(proxyMiddleware(context, options));

app.use(express.static('./dist'));

var port = process.env.PORT || config.build.port;

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + port + '\n');
});

