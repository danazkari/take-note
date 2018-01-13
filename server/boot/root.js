'use strict';

// 1. Import the 'path' package
var path = require('path');

module.exports = function(server) {
  // 2. Move server status to '/status'
  // Install a `/status` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  // 3. Configure '/' to serve the static content
  router.get('/', function(req, res) {
    var indexFile = path.resolve(__dirname, '../..', server.get('indexFile'));
    res.sendFile(indexFile);
  });
  server.use(router);
};
