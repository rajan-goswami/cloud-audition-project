/**
 * Check if a given string is palindrome or not
 *
 * @param {string} text input text
 * @returns boolean
 */
const checkPalindrome = (text) => {
  const re = /[^A-Za-z0-9]/g;
  const lowRegStr = text.toLowerCase().replace(re, '');
  const reverseStr = lowRegStr.split('').reverse().join('');
  return reverseStr === lowRegStr;
};

module.exports = {
  checkPalindrome,
};
