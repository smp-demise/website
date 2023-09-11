const mongoose = require('mongoose');

module.exports = mongoose.model('lives', new mongoose.Schema({
  season: { type: mongoose.Types.Decimal128, required: true },
  lives: { type: Object, default: {} }
}));