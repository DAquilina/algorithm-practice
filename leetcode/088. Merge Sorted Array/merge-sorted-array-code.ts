/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {

    let mIndex = m;
    let nIndex = n;

    while (mIndex + nIndex > -1) {
        if (mIndex && (!nIndex || nums1[mIndex - 1] > nums2[nIndex - 1])) {
            nums1[mIndex + nIndex - 1] = nums1[--mIndex];
        }
        else {
            nums1[mIndex + nIndex - 1] = nums2[--nIndex];
        }
    }
};
