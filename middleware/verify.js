var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var User = require('../models/user-model');

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(500).json({msg:'failed to verify User'});
       } else {
        User.findOne({username: decoded}, function(err, user){
          if (err){
            console.error(err);
            res.status(500).json({msg: "internal server err: failed to handle request"});
          } else {
            req.userId = user._id;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({msg: 'You shall not pass!'});
  }
};
