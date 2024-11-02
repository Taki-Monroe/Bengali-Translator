const fs = require('fs');

let patterns = require('./patterns.json');

function translate(text) {
  let translatedText = '';
  let i = 0;

  while (i < text.length) {
    let foundPattern = false;

    for (let j = 3; j >= 1; j--) {
      const pattern = text.substr(i, j);
      if (patterns[pattern]) {
        translatedText += patterns[pattern];
        i += j;
        foundPattern = true;
        break;
      }
    }

    if (!foundPattern) {
      translatedText += text[i];
      i++;
    }
  }

  return translatedText;
}

function addPattern(code, character) {
  if (!/^[ঀ-৿]+$/.test(character)) {
    console.error('Invalid character input. Only Bengali characters are allowed.');
    return;
  }

  const lowercaseCode = code.toLowerCase();

  if (!patterns[lowercaseCode]) {
    patterns[lowercaseCode] = character;

    fs.writeFile('./patterns.json', JSON.stringify(patterns, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Added pattern: ${lowercaseCode} -> ${character}`);
      }
    });
  } else {
    console.log(`Pattern ${code} already exists`);
  }
}

module.exports = {
  translate,
  addPattern
};
