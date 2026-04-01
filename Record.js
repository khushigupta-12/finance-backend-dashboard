
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income','expense'], required: true },
  category: String,
  date: { type: Date, default: Date.now },
  note: String
});

module.exports = mongoose.model('Record', schema);
