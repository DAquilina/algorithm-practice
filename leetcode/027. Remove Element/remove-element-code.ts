function removeElement(nums: number[], val: number): number {
    
    let placeholderIndex = 0;
    let iteratorIndex = 0;

    for (iteratorIndex; iteratorIndex < nums.length;) {
        while (nums[iteratorIndex] === val) {
            iteratorIndex++;
        }

        if (iteratorIndex >= nums.length) {
            return placeholderIndex;
        }

        nums[placeholderIndex] = nums[iteratorIndex];
        placeholderIndex++;
        iteratorIndex++;
    }

    return placeholderIndex;
};
