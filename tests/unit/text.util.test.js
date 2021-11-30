const { expect } = require('chai');
const { checkPalindrome } = require('../../src/utils/text.util');

describe('Text util tests', () => {
  it('checkPalindrome should return true for single word palindrome', () => {
    const isPalindrome = checkPalindrome('malayalam');
    expect(isPalindrome).to.be.true;
  });

  it('checkPalindrome should return false for single word non-palindrome', () => {
    const isPalindrome = checkPalindrome('hindi');
    expect(isPalindrome).to.be.false;
  });

  it('checkPalindrome should return true for single word mixed-case palindrome', () => {
    const isPalindrome = checkPalindrome('Malayalam');
    expect(isPalindrome).to.be.true;
  });

  it('checkPalindrome should return true for multi word palindrome', () => {
    const isPalindrome = checkPalindrome('A nut for a jar of tuna');
    expect(isPalindrome).to.be.true;
  });

  it('checkPalindrome should return true for multi word palindrome with special characters', () => {
    const isPalindrome = checkPalindrome('Madam, in Eden, I’m Adam');
    expect(isPalindrome).to.be.true;
  });
});
