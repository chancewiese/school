// 1
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log("arr:", arr1.concat(arr2));

// 2
console.log([1, 2, 3].join(","));

// 3
const arr = [1, 2, 3];
const item = 3;
console.log(arr.includes(item));

// 4
array = [1, 2, 3, 4, 5];
const position = array.indexOf(4);
if (position !== -1) {
   console.log(`Item is in position ${position}`);
} else {
   console.log(`Item is not in array`);
}

// 5
function sortStringArray(arr, direction) {
   toReturn = arr.sort();
   if (direction) {
      toReturn.reverse();
   }
   return toReturn;
}
myArray = ["a", "c", "b", "e"];
console.log(sortStringArray(myArray, 1));

// 6
function stackArray(arr, numToRemove, itemToAdd) {
   const removedValues = arr.splice[(0, numToRemove)];
   return [itemToAdd, ...arr];
}
