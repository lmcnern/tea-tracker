var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var config = require('./configFile');

app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/app');

//on mongoose.connect()
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection to mongodb successful!')
});

//routes
var router = express.Router();
require(__dirname + '/routes/tea-routes')(router);
require(__dirname + '/routes/user-routes')(router);
app.use('/api', router);

//404 error
app.all('*', function(req, res) {
  res.status(404).json({'msg': 'path does not exist'});
});

//listen at port
app.listen(port, function() {
  console.log('Server listening at port ' + port);
});
