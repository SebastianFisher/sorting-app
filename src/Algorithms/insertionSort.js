import { swap } from "./monkeySort.js";

export default function insertionSortAnimate(arr) {
    const animations = [];
    const copyArr = arr.slice();
    insertionSort(copyArr, animations);
    return [animations, copyArr];
}

function insertionSort(arr, animations) {
    for (let i = 1; i < arr.length; ++i) {
        for (let k = i; k > 0; --k) {
            // Push indices color and uncolor elements and heights to switch them
            animations.push([k, k - 1]);
            if (arr[k] < arr[k - 1]) {
                // Swap elements in array
                animations.push([k, k - 1, arr[k], arr[k - 1]]);
                const temp = arr[k];
                arr[k] = arr[k - 1];
                arr[k - 1] = temp;
            } else {
                animations.push([k, k - 1, false]);
                break
            }
        }
    }
}

const array = [15, 125, 67, 1, 61, 2, 34, 15];
console.log(insertionSortAnimate(array)[0]);