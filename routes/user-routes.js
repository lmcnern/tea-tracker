var bodyParser = require('body-parser');
var verify = require('../middleware/verify');
var User = require('../models/user-model');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.route('/users')
    //get a user
    .get(verify, function (req, res) {
      var userId = req.userId;
      User.findById(userId, function(err, user) {
       if(err) res.status(500).json({msg: 'User could not be created'});
       else res.send(user);
      });
    })
    //create a user
    .post(function(req, res) {
      var user = new User(req.body);
      user.password = user.generateHash(req.body.password);
      user.save(function(err) {
        if(err) return res.status(500).json({msg: 'Server Error: cannot save user, \n'  + err});
        res.json({msg: 'user account created', token:user.generateToken()});
      });
    })
    //update a user
    .put(verify, function(req, res) {
      var userId = req.userId;
      var key = req.body.key;
      User.findByIdAndUpdate(userId, {$addToSet: {'votes': key}}, function(err, data) {
        if (err) return res.status(500).json({msg: 'Server Error: cannot update user, \n' + err});
        res.json({msg: 'user account updated'});
      });
    })

};
