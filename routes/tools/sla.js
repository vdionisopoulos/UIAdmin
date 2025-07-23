const express = require('express');
const router = express.Router();

// SLA Calculator
router.get('/sla-calculator', (req, res) => {
  res.render('tools/sla-calculator', { title: 'SLA Calculator' });
});

// SLA Comparison
router.get('/sla-comparison', (req, res) => {
  res.render('tools/sla-comparison', { title: 'SLA Comparison' });
});

// SLA Reverse (placeholder route, implement later)
router.get('/sla-reverse', (req, res) => {
  res.render('tools/sla-reverse', { title: 'SLA Reverse' });
});

router.get('/sla-reverse', (req, res) => {
  res.render('tools/sla-reverse', { title: 'SLA Reverse' });
});


module.exports = router;
