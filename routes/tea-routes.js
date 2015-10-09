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
    });
  });
  //update existing tea
  router.put('/tea/:id', function(req, res) {
    var updateTea = req.body;
    delete updateTea._id;
    Tea.findByIdAndUpdate(req.params.id, updateTea, function(err, data) {
      if (err) {
        console.log('PUT error ' + err + '.');
        return res.status(500).json({'msg': 'error!'});
      } else {
        res.json(data);
      }
      });
    });
  //DELETE tea
  router.delete('/tea/:id', function(req, res) {
    Tea.remove({_id: req.params.id }, function(err, data) {
    if (err) {
      console.log('DELETE error ' + err + '.');
      return res.status(500).json({'msg': 'error!'});
    } else {
      res.json(data);
    }
    });
  });
}
