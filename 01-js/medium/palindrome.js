/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.split(' ').join('')
  // console.log(str)
  str = str.replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, '')
  // str = str.replace(/[^\w ]/, '')
  // console.log(str)
  for (let i = 0; i < (str.length) / 2; i++) {
    if (str[i] != str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}
// isPalindrome('!hyaaay h,')
module.exports = isPalindrome;
