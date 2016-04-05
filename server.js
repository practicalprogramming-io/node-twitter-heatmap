var koa = require('koa')
  , app = koa()
  , router = require('koa-router')()
  , send = require('koa-send')
  , serve = require('koa-static')
  , config = require('./config')
  , server = require('http').createServer(app.callback())
  , io = require('socket.io')(server)
  , spawn = require('child_process').exec
  , tweets = spawn('node tweets.js')
;


tweets.stdout.on('data', function (data) {
  console.log(data);
//  console.log(data);
/*    if (data.coordinates && data.coordinates !== null) {
    socket.emit('tweet', data.coordinates);
  }
*/  });

tweets.stderr.on('data', function (data) {
  console.log(data);
/*    if (data.coordinates && data.coordinates !== null) {
    socket.emit('tweet', data.coordinates);
  }
*/  });

tweets.on('close', function (code) {
  console.log('here' + code);
/*    if (data.coordinates && data.coordinates !== null) {
    socket.emit('tweet', data.coordinates);
  }
*/  });


io.on('connection', function (socket) {


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
