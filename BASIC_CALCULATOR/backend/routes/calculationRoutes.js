const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

/**
 * POST - Save calculation
 */
router.post('/', async (req, res) => {
  const { expression, result } = req.body;

  try {
    const newCalc = new Calculation({
      expression,
      result
    });

    await newCalc.save();
    res.status(201).json(newCalc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET - Get all calculations (history)
 */
router.get('/', async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ createdAt: -1 });
    res.status(200).json(calculations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE - Clear history
 */
router.delete('/', async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.status(200).json({ message: "History cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
