const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get User Profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update User Profile
router.put('/profile', async (req, res) => {
  try {
    const { name, phone, address, city, state, zipCode, aadharNumber, panNumber, monthlyIncome, employmentType, company } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, city, state, zipCode, aadharNumber, panNumber, monthlyIncome, employmentType, company, updatedAt: new Date() },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Users (Admin)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').limit(50);
    res.json({ success: true, users, total: users.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;