'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
// 1. Include 'path' package
var path = require('path');

var app = module.exports = loopback();

app.start = function() {
  // 2. Get the FQPN of the index file in client
  var staticFolder = path.dirname(
    path.resolve(__dirname, '..', app.get('indexFile'))
  );
  // 3. Set staticFolder as static in the server
  app.use(loopback.static(staticFolder));
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
