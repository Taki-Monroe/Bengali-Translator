const fs = require('fs');

let patterns = require('./patterns.json');

function translate(text) {
  text = text.toLowerCase();
  let translatedText = '';
  let i = 0;

  while (i < text.length) {
    let foundPattern = false;
    let wordMatch = false;

    // Check if the current pattern matches a complete word in the input text
    for (let j = text.length - i; j >= 1; j--) {
      const word = text.substr(i, j);
      if (patterns[word]) {
        translatedText += patterns[word];
        i += j;
        foundPattern = true;
        wordMatch = true;
        break;
      }
    }

    if (!wordMatch) {
      // Check for pattern matches
      for (let j = 3; j >= 1; j--) {
        const pattern = text.substr(i, j);
        if (patterns[pattern]) {
          translatedText += patterns[pattern];
          i += j;
          foundPattern = true;
          break;
        }
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
  const lowercaseCode = code.toLowerCase().replace(/\s+/g, '');
  const lowercaseCharacter = character.replace(/\s+/g, '');

  if (!patterns[lowercaseCode]) {
    patterns[lowercaseCode] = lowercaseCharacter;

    fs.writeFile('./patterns.json', JSON.stringify(patterns, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Added pattern: ${lowercaseCode} -> ${lowercaseCharacter}`);
      }
    });
  } else {
    console.log(`Pattern ${code} already exists`);
  }
}

function overwritePattern(code, character) {
  const lowercaseCode = code.toLowerCase().replace(/\s+/g, '');
  const lowercaseCharacter = character.replace(/\s+/g, '');

  if (patterns[lowercaseCode]) {
    const previousCharacter = patterns[lowercaseCode];
    patterns[lowercaseCode] = lowercaseCharacter;

    fs.writeFile('./patterns.json', JSON.stringify(patterns, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Overwrote pattern: ${lowercaseCode} -> ${lowercaseCharacter} (previously ${previousCharacter})`);
      }
    });
  } else {
    console.log(`Pattern ${code} does not exist, cannot overwrite.`);
  }
}



module.exports = {
  translate,
  addPattern,
  overwritePattern
};
