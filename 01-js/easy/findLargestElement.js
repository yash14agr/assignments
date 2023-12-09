/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    if(numbers.length === 0) {return }
    let max = Number.MIN_SAFE_INTEGER;
    numbers.forEach((num) => {
        if (num > max) {
            max=num ;
        }
    })
    return max;
}

module.exports = findLargestElement;