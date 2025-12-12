const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Overdue'],
    default: 'Pending'
  },
  transactionId: String,
  paymentMethod: {
    type: String,
    enum: ['Bank Transfer', 'Card', 'UPI', 'Cheque'],
    default: 'Bank Transfer'
  },
  remarks: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);