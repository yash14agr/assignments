/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;
  lower_str1 = str1.toLowerCase()
  lower_str1 = lower_str1.split("").sort().join("")
  lower_str2 = str2.toLowerCase()
  lower_str2 = lower_str2.split("").sort().join("")
  
  if (lower_str1 != lower_str2) return false;
  else return true;


}
isAnagram('listen', 'silent')
module.exports = isAnagram;
