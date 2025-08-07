const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: Date,
  reason: String,
  notes: String,
});

const paymentSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  unpaidAmount: { type: Number, default: 0 },
  nextVisit: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);




