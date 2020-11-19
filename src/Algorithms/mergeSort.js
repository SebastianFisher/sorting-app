export default function mergeSortAnimate(arr) {
    const animations = [];
    const copyArray = arr.slice();
    mergeHelper(copyArray, 0, copyArray.length - 1, animations)
    return [animations, copyArray];
}

// Helper func for mergeSort Animate
function mergeHelper(arr, start, end, animations) {
    if (start < end) {
        const mid = Math.floor(start + (end - start) / 2); // get mid index

        mergeHelper(arr, start, mid, animations); // recur left subarray

        mergeHelper(arr, mid + 1, end, animations); // recur right subarray

        merge(arr, start, mid, end, animations); // merge two arrays
    }
}

// l: start idx, m: mid idx, r: last idx
function merge(arr, start, mid, end, animations) {
    // Left and right subarrays of the array
    let L = arr.slice(start, mid + 1);
    let R = arr.slice(mid + 1, end + 1);

    let i = start, j = mid + 1, k = start;

    while (i <= mid && j <= end) {
        // Add comparison indices to animations array twice
        animations.push([i, j]);
        
        
        // Create variables for the index of the left subarray and right subarrays 
        // corresponding to current i and j
        const LIdx = i - start, RIdx = j - mid - 1;

        // If the first item in the left subarray is lower, add it
        if (L[LIdx] < R[RIdx]) {
            animations.push([k, L[LIdx]]);
            arr[k] = L[LIdx];
            animations.push([i, j]);
            i++;
        }
        // Otherwise add the first item from the right subarray
        else {
            animations.push([k, R[RIdx]]);
            arr[k] = R[RIdx];
            animations.push([i, j]);
            j++;
        }
        // increment k
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i <= mid) {
        // create index for left subarray
        const LIdx = i - start;

        // push index to animation twice
        animations.push([i, i]);
        

        // push index and new height to animation
        animations.push([k, L[LIdx]]);
        animations.push([i, i]);
        // change the element at k in arr to the element at LIdx in left subarray
        arr[k] = L[LIdx];

        // increment i and k
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j <= end) {
        // create index for right subarray
        const RIdx = j - mid - 1;

        // push index to animation twice
        animations.push([j, j]);
        

        
        // push index and new height to animation
        animations.push([k, R[RIdx]]);
        animations.push([j, j]);
        // change the element at k in arr to the element at RIdx in right subarray
        arr[k] = R[RIdx];

        // increment j and k
        j++;
        k++;
    }
    // For debugging if necessary
    // let L2 = [], R2 = [];
    // for (let i = 0; i < n1; i++) {
    //     L2[i] = arr[l + i];
    // }
    // for (let j = 0; j < n2; j++) {
    //     R2[j] = arr[m + 1 + j];
    // }
}
