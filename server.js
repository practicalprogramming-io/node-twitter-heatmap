var koa = require('koa')
  , app = koa()
  , router = require('koa-router')()
  , send = require('koa-send')
  , serve = require('koa-static')
  , config = require('./config')
  , twitter = require('twitter')
  , client = new twitter(config.twitter_access)
  , server = require('http').createServer(app.callback())
  , io = require('socket.io')(server)
;


io.on('connection', function (socket) {
  client.stream(
    'statuses/filter',
    {'locations': '-180,-90,180,90'},
    function (stream) {

      stream.on('data', function (data) {
        if (data.coordinates && data.coordinates !== null) {
          socket.emit('tweet', data.coordinates);
        }
      });

      stream.on('error', function (error) {
        console.log(error);
      });

      stream.on('limit', function (limit) {
        console.log(limit);
      });

      stream.on('warning', function (warning) {
        console.log(warning);
      });

      stream.on('disconnect', function (disconnect) {
        console.log(disconnect);
      });

  });
});

app.use(serve(__dirname + '/public'));

router.get('/', function *(next) {
  yield send(this, __dirname + '/index.html');
});

app
  .use(router.routes())
  .use(router.allowedMethods())
;

server.listen(3000);
