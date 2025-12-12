const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  loanTerm: {
    type: Number,
    required: true
  },
  loanType: {
    type: String,
    enum: ['Personal', 'Home', 'Auto', 'Education', 'Business'],
    required: true
  },
  interestRate: {
    type: Number,
    default: 12
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Disbursed', 'Completed'],
    default: 'Pending'
  },
  monthlyEMI: Number,
  totalInterest: Number,
  totalAmount: Number,
  purpose: String,
  approvalDate: Date,
  disbursementDate: Date,
  rejectionReason: String,
  documents: [{
    name: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);