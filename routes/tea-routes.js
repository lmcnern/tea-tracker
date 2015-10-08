'use strict';

var bodyParser = require('body-parser');
var Tea = require(__dirname + '/../models/tea-model');

module.exports = function(router) {
  router.use(bodyParser.json());
  //GET
  router.get('/tea', function(req, res) {
    Tea.find({}, function(err, data) {
      if (err || !data) {
        res.status(500).json({error: err});
      } else {
        res.json(data);
      }
    });
  });
  //GET by ID
  router.get('/tea/:id', function(req, res) {
    Tea.findById(req.params.id, function(err, data) {
      if (err || !data) {
        res.status(500).json({error: err});
      } else {
        res.json(data);
      }
    });
  });
  //POST new tea
  router.post('/tea', function(req, res) {
    var newTea = new Tea({
      name: req.body.name,
      type: req.body.type,
      brand: req.body.brand,
      dateAdded: Date()
    });
    newTea.save(function(err, data) {
      if (err || !data) {
        res.status(500).json({error: err});
      } else {
        res.json({msg: 'location created', id: data._id});
      }
    })
  })
}
