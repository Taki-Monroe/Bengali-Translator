const express = require('express');
const { translate, addPattern } = require('./translator');

const app = express();
const port = process.env.PORT || 3000;

app.get('/translate', (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ message: 'Missing required parameter: text' });
  }

  const translatedText = translate(text);
  res.json({ text: translatedText });
});

app.post('/add-pattern', express.json(), (req, res) => {
  const { code, character } = req.body;

  if (!code || !character) {
    return res.status(400).json({ message: 'Missing required parameters: code, character' });
  }

  const patternExists = checkPatternExists(code);

  if (patternExists) {
    return res.status(409).json({ message: 'Pattern already exists', status: 'failed' });
  }

  addPattern(code, character);
  res.json({ message: 'Pattern added successfully', status: 'success' });
});

function checkPatternExists(code) {
  const lowercaseCode = code.toLowerCase();
  const patterns = require('./patterns.json');
  return patterns.hasOwnProperty(lowercaseCode);
}

// Serve the index.html file from the public directory
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
