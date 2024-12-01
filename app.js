const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const debug = require('debug')('my-application');
const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'react-client/build')));

app.use('/', routes);
app.set('port', process.env.PORT || 4000);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//event handlers
const loadSocketHandlers = require("./ws_handlers");

const onConnect = (socket) => {
    console.log("client connected:" + socket.id);
    loadSocketHandlers(io, socket);
}

var server = app.listen(app.get('port'), function() {
    console.log('server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server)

io.on("connection", onConnect)



module.exports = app;