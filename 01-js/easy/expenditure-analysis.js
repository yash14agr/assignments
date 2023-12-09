/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let totalSpentByCategory = [];
  transactions.forEach((transaction) => {
    let cat = transaction.category
    let p = transaction.price
    let flag = 0
    //using Find()
    totalSpentByCategory.find((obj) => {
      if (obj.category === cat) {
        obj.totalSpent += p
        flag = 1
      }
    })
    // totalSpentByCategory.forEach((obj) => {
    //   if (obj.category === cat) {
    //     obj.totalSpent += p
    //     flag = 1
    //   }
    // })
    if (flag == 0) {
      totalSpentByCategory.push({ category: cat, totalSpent: p })
    }
  })
  return totalSpentByCategory;
}


module.exports = calculateTotalSpentByCategory;
