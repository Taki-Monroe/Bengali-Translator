// Increase user's pattern count in userData.json
const fs = require('fs');
const path = require('path');

function increasePatternCount(username) {
  const userDataPath = path.join(__dirname, 'userData.json');
  const userData = JSON.parse(fs.readFileSync(userDataPath));

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].username === username) {
      userData[i].patterns++;
      break;
    }
  }

  fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));
}

module.exports = { increasePatternCount };
