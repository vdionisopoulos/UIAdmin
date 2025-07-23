const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const COUNTER_FILE = path.join(__dirname, '../../data/share-counts.json');

// POST /api/share/increment
router.post('/increment', express.json(), (req, res) => {
  const { tool } = req.body;
  if (!tool) return res.status(400).json({ error: 'Missing tool name' });

  fs.readFile(COUNTER_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });

    const counts = JSON.parse(data);
    counts[tool] = (counts[tool] || 0) + 1;

    fs.writeFile(COUNTER_FILE, JSON.stringify(counts, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Write error' });
      res.json({ count: counts[tool] });
    });
  });
});

// GET /api/share/:tool
router.get('/:tool', (req, res) => {
  const tool = req.params.tool;

  fs.readFile(COUNTER_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });

    const counts = JSON.parse(data);
    res.json({ count: counts[tool] || 0 });
  });
});

module.exports = router;
