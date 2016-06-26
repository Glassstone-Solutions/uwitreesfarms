var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var http = require('http');

if (!process.env.DATABASE_URI) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev_bambam',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'PwYxMbm5w2ztP5EKIx1bqt5HZIYMoHFy3b7xhDKF',
  masterKey: process.env.MASTER_KEY || 'JiMigz1dN7elHVkdBPJnIXaNh1JcJjjtTsa0oaIw',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  publicServerURL: process.env.PUB_SERVER_URL || 'http://10.0.2.2:1337/parse',
  push:{
    android: {
      senderId: 'bambam-1266',
      apiKey: 'AIzaSyBxv2pRo-npP3hE2GxpQfEOd7U6BrJoEDY'
    },
    ios:{
      pfx: '/file/path/to/XXX.p12',
      bundleId: 'jhdkhhjfkdjh',
      production: false
    }
  },
  liveQuery: {
    classNames: ["Tunes", "Comment"] // List of classes to support for query subscriptions
  }
});

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
var httpServer = http.createServer(app);
httpServer.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});
