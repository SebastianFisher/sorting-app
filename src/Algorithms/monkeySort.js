// By far my favorite sorting algorithm ;)
export default function monkeySortAnimate(arr) {
    let animations = []
    const copyArr = arr.slice();
    monkeySort(copyArr, animations);
    return [animations, copyArr];
}

// Checks to see if the array is sorted
function isSorted(arr, animations) {
    for (let i = 0; i < arr.length - 1; ++i) {
        // Push indices that are being compared
        animations.push([i, i + 1]);
        if (arr[i] > arr[i + 1]) {
            animations.push(["checked", false]);
            return false;
        }
    }
    animations.push(["checked", true]);
    return true;
}

// Swap elements at indices i and j in arr
function swap(arr, i, j, animations) {
    // Push indices color and uncolor elements and heights to switch them
    animations.push([i, j, true]);
    animations.push([i, j, arr[i], arr[j]]);

    // Swap elements in array
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


function monkeySort(arr, animations) {
    while (!isSorted(arr, animations)) {
        const numElements = arr.length;
        for (let i = 0; i < numElements; i++) {
            swap(arr, i, Math.floor(Math.random() * numElements), animations);
        }
        animations.push("randomized");
    }
}
