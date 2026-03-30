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
  totalBill: { type: Number, default: 0 },
  payments: [paymentSchema],
  unpaidAmount: { type: Number, default: 0 },
  visits: [visitSchema],
  nextVisit: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);



