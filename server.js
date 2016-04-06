var koa = require('koa')
  , app = koa()
  , router = require('koa-router')()
  , send = require('koa-send')
  , serve = require('koa-static')
  , config = require('./config')
  , server = require('http').createServer(app.callback())
  , io = require('socket.io')(server)
  , spawn = require('child_process').spawn
  , tweets = spawn('node', ['tweets.js'])
  , StringDecoder = require('string_decoder').StringDecoder
  , decoder = new StringDecoder('utf8')
;


io.on('connection', function (socket) {

  tweets.stdout.on('data', function (data) {
    try {
      data = JSON.parse(decoder.write(data));
      socket.emit('tweet', data);
    }
    catch (error) {
      console.log(error);
    }
  });

  tweets.stderr.on('data', function (data) {
    console.log('stderr: ', decoder.write(data));
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
