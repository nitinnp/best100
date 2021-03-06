'use strict';
var express = require('express');
var path = require('path');
var http = require('http');
var debug = require('debug')('nodejs-regular-webapp2:server');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var routes = require('./server/routes/index');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: true
}));
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/lib', express.static(path.join(__dirname, '/node_modules')));
app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/css', express.static(path.join(__dirname, '/public/assets/css')));
app.use('/js', express.static(path.join(__dirname, '/public/assets/js')));
app.use('/config', express.static(path.join(__dirname, '/config')));
app.use('/', routes);
app.use('/amazonlisting', routes);
app.use('/ituneslisting', routes);
app.use('/bestbuylisting', routes);
app.use('/walmartlisting', routes);
app.use('/rakutenlisting', routes);

app.get('*', function(req, res, next) {
  res.sendfile("public/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}


module.exports = app;
//# sourceMappingURL=index.js.map