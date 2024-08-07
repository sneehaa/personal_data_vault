const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String },
  data: { type: String }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;