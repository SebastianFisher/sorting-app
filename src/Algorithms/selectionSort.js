import {swap} from "./monkeySort.js";

export default function selectionSortAnimate(arr) {
    const animations = [];
    const copyArr = arr.slice();
    selectionSort(copyArr, animations);
    return [animations, copyArr];
}

// For this selection sort, I find the smallest number multiple times and then move it to the front by swapping
function selectionSort(arr, animations) {
    for (let i = 0; i < arr.length; i++) {
        if (minNum(arr, i, animations)) break;
    }
}

// finds min number in arr[..., start, ...end]
function minNum(arr, start, animations) {
    let min = arr[start];
    let minIdx = start;
    let lastMinIdx = start;
    let pairsSorted = 0;
    for (let i = start + 1; i < arr.length; i++) {
        console.log(i);
        animations.push(minIdx);
        if (arr[i] < min) {
            animations.push([i, true, minIdx]);
            min = arr[i];
            minIdx = i;
        } else {
            animations.push([i, false]);
        }
        if (i !== start && arr[i] > arr[i - 1]) {
            pairsSorted++;
        }
    }
    animations.push("max found");
    swap(arr, start, minIdx, animations);
    return pairsSorted === (arr.length - start - 1);
}