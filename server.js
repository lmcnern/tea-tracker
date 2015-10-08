var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/app');

//on mongoose.connect()
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection to mongodb successful!')
});

//routes
var teaRoutes = express.Router();
require('./routes/tea-routes')(teaRoutes);
app.use('/api', teaRoutes);

//404 error
app.all('*', function(req, res) {
  res.status(404).json({'msg': 'path does not exist'});
});

//listen at port
app.listen(port, function() {
  console.log('Server listening at port ' + port);
});
