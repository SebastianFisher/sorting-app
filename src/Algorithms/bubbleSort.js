export default function bubbleSortAnimate(arr) {
    const animations = [];
    const copyArr = arr.slice();
    bubbleSort(copyArr, animations);
    return [animations, copyArr];
}

function bubbleSort(arr, animations) {
    for (let i = 0; i < arr.length; i++) {
        let swaps = 0;
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Push elements once to change color of focused elements
                animations.push([j, j + 1, true]);
                // Push indices and new height for elements
                animations.push([j, j + 1, arr[j + 1], arr[j]]);

                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swaps++;
            } else {
                // Push elements once to change color of focused elements
                animations.push([j, j + 1, false]);
                // Push null to indicate no switch
                animations.push(null);
            }
            animations.push([j, j + 1, undefined]);
        }
        if (swaps === 0) {
            break;
        }
    }
}
