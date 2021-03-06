'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
// Four
function movePiece(startStack, endStack) {
  var ring = stacks[startStack].pop();
  console.log(ring);
  stacks[endStack].push(ring);
  return stacks;
}
// Three
function isLegal(startStack, endStack) {
  var start = stacks[startStack].length - 1;
  var end = stacks[endStack].length - 1;
  console.log(stacks[startStack][start]);
    if (stacks[startStack][start] < stacks[endStack][end]) {
      movePiece(startStack, endStack);
      }
    else {
      console.log("no");
    }
  }
// Two
function checkForWin(startStack, endStack) {
  if (stacks[endStack] === stacks["a"]) {
    return "You win!"
  }
    else {
      isLegal(startStack, endStack);
    }

}
// One
function towersOfHanoi(startStack, endStack) {
  checkForWin(startStack, endStack);
  isLegal(startStack, endStack);
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
//this is updated code
// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
