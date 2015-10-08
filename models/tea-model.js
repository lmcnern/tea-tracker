var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teaSchema = new Schema({
  name:  String,
  type: String,
  brand:   String,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tea', teaSchema);
