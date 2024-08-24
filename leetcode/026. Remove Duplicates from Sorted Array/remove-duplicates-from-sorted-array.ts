function removeDuplicates(nums: number[]): number {

    if (nums.length === 1) {
        return 1;
    }

    let placeholderIndex = 1;
    let iteratorIndex = 1;

    while (iteratorIndex < nums.length) {
        while (nums[iteratorIndex] === nums[iteratorIndex - 1]) {
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
