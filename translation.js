const express = require('express');
const { translate, addPattern, overwritePattern } = require('./translator');
const { increasePatternCount } = require('./increasePatternCount');
const router = express.Router();
const { getCurrentUser } = require('./userService');

router.get('/translate', (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ message: 'Missing required parameter: text' });
  }

  const translatedText = translate(text);
  res.json({ text: translatedText });
});

router.post('/add-pattern', express.json(), (req, res) => {
  const { code, character } = req.body;
  const username = getCurrentUser(req);

  if (!code || !character) {
    return res.status(400).json({ message: 'Missing required parameters: code, character' });
  }

  const patternExists = checkPatternExists(code);

  if (patternExists) {
    return res.status(409).json({ message: 'Pattern already exists', status: 'failed' });
  }

  addPattern(code, character);
  increasePatternCount(username); // <-- Increase the pattern count for the current user
  res.json({ message: 'Pattern added successfully', status: 'success' });
});

function checkPatternExists(code) {
  const lowercaseCode = code.toLowerCase();
  const patterns = require('./patterns.json');
  return patterns.hasOwnProperty(lowercaseCode);
}

router.put('/overwrite-pattern', express.json(), (req, res) => {
  const { code, character } = req.body;
  const username = getCurrentUser(req);

  if (!code || !character) {
    return res.status(400).json({ message: 'Missing required parameters: code, character' });
  }

  const patternExists = checkPatternExists(code);

  if (!patternExists) {
    return res.status(404).json({ message: 'Pattern does not exist', status: 'failed' });
  }

  overwritePattern(code, character);
  increasePatternCount(username); // <-- Increase the pattern count for the current user
  res.json({ message: 'Pattern overwritten successfully', status: 'success' });
});

module.exports = router;
