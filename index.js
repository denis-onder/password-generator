const fs = require("fs");
const passwordLength = Number(process.argv[2]) || 16;

const STATE = {
  bools: [true, false],
  words: fs
    .readFileSync("./words.txt")
    .toString()
    .split("\n"),
  symbols: fs
    .readFileSync("./symbols.txt")
    .toString()
    .split("\n")
};

function random(type) {
  const { bools, words, symbols } = STATE;
  switch (type) {
    case "bool":
      return bools[Math.floor(Math.random() * bools.length)];
    case "index":
      return Math.floor(Math.random() * words.length);
    case "symbol":
      return symbols[Math.floor(Math.random() * symbols.length)];
    case "number":
      return Math.floor(Math.random() * 10).toString();
    case "letter":
      return words[random("index")][0];
  }
}

function generate() {
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    let character;
    // Randomly replace a character in the string with a symbol or a number
    const replaceWithSymbolOrNumber = random("bool");
    if (replaceWithSymbolOrNumber) {
      const isItASymbol = random("bool");
      character = random(isItASymbol ? "symbol" : "number");
    } else {
      character = random("letter");
      // Random capitalization
      const capitalizeCharacter = random("bool");
      capitalizeCharacter ? character.toUpperCase() : character.toLowerCase();
    }
    password += character;
  }
  return password;
}

(() => {
  let password = generate();
  console.log(password);
})();
