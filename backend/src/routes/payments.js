const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create Payment
router.post('/', async (req, res) => {
  try {
    const { loanId, amount, paymentMethod } = req.body;
    
    if (!loanId || !amount) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    
    const payment = new Payment({
      loanId,
      userId: req.user.id,
      amount,
      paymentMethod,
      status: 'Completed',
      transactionId: 'TXN_' + Date.now()
    });
    
    await payment.save();
    
    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Payment History
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('loanId')
      .sort({ paymentDate: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Loan Payments
router.get('/loan/:loanId', async (req, res) => {
  try {
    const payments = await Payment.find({ loanId: req.params.loanId });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;