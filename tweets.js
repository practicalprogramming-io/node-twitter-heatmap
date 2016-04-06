var config = require('./config')
  , twitter = require('twitter')
  , client = new twitter(config.twitter_access)
;

client.stream(

  'statuses/filter',
  {'locations': '-180, -90, 180, 90'},

  function (stream) {

    stream.on('data', function (data) {
      if (data.coordinates && data.coordinates !== null) {
        console.log(JSON.stringify(data.coordinates));
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
