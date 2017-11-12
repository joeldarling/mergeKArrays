const Heap = require("collections/heap");

function mergeKArrays(...inputArrays) {
  if(!inputArrays.every(item => Array.isArray(item))) {
    throw new Error('Arguments must be only arrays');
  }
  // create min heap
  const minHeap = new Heap(null, null, (a, b) => {
    return b.val - a.val;
  });
  const result = []; // this stores final result
  const arrCurrIdx = new Array(inputArrays.length).fill(0); // keep track of position for each array
  const totalSize = inputArrays.reduce((prev, curr) => prev + curr.length, 0); // sum lengths of all input arrays
  
  // initialize heap with front items of each array
  inputArrays.forEach((arr, idx) => {
    if(!arr.length) return; //ignore empty arrays
    minHeap.add({val: arr[0], idx});
  })

  // loop until result array matches total size of input arrays
  while(result.length < totalSize) {
    const {val, idx} = minHeap.pop(); // get the curr min from heap
    const currArray = inputArrays[idx]; // get the array that contained the val we just popped

    result.push(val); // add to result array
    arrCurrIdx[idx] += 1; // increment our position for current array

    // only add next element in array if exists
    if(arrCurrIdx[idx] < currArray.length) {
      minHeap.add({val: currArray[arrCurrIdx[idx]], idx});
    }
  }

  return result;
}

// test arrays
const arr1 = [1, 2, 3, 4];
const arr2 = [5, 7, 10, 12];
const arr3 = [];
const arr4 = [2, 123, 200];

// print result
console.log(mergeKArrays(arr1, arr2, arr3, arr4));
