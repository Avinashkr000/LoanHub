const express = require('express');
const Loan = require('../models/Loan');
const User = require('../models/User');
const router = express.Router();

// Create Loan Application
router.post('/', async (req, res) => {
  try {
    const { loanAmount, loanTerm, loanType, purpose } = req.body;
    
    if (!loanAmount || !loanTerm || !loanType) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    
    const interestRate = 12; // Default 12% per annum
    const monthlyRate = interestRate / 12 / 100;
    const numPayments = loanTerm * 12;
    
    // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyEMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalAmount = monthlyEMI * numPayments;
    const totalInterest = totalAmount - loanAmount;
    
    const loan = new Loan({
      userId: req.user.id,
      loanAmount,
      loanTerm,
      loanType,
      purpose,
      interestRate,
      monthlyEMI: Math.round(monthlyEMI),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
    
    await loan.save();
    
    // Update user loan count
    await User.updateOne({ _id: req.user.id }, { $inc: { totalLoansApplied: 1 } });
    
    res.status(201).json({
      success: true,
      message: 'Loan application created successfully',
      loan
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get User Loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Single Loan
router.get('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ success: false, message: 'Loan not found' });
    }
    res.json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Loan Status (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status, rejectionReason, updatedAt: new Date() },
      { new: true }
    );
    
    // Update user approved loans count
    if (status === 'Approved') {
      await User.updateOne({ _id: loan.userId }, { $inc: { totalLoansApproved: 1 } });
    }
    
    res.json({ success: true, message: 'Loan updated', loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Loan
router.delete('/:id', async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;