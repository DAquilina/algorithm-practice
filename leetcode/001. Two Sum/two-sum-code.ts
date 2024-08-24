function twoSum(nums: number[], target: number): number[] {

    return recurse(nums, target);
};

function recurse(nums: Array<number>, target: number): undefined | Array<number> {

    if (nums.length === 1) {
        return undefined;
    }


    if (nums.length <= 3) {
        return checkAll(nums, target);
    }

    const [arr1, arr2] = split(nums);

    let result: undefined | Array<number> = recurse(arr2, target);

    if (result) {
        return result.map((num: number) => {

            return (num + arr1.length);
        });
    }
    
    result = recurse(arr1, target);

    if (result) {
        return result;
    }

    return checkAll(nums, target);
}

function split(nums: Array<number>): Array<Array<number>> {

    let arr1 = nums.slice(0, Math.floor(nums.length / 2));
    let arr2 = nums.slice(arr1.length);

    return [arr1, arr2];
}

function checkAll(nums: Array<number>, target: number): undefined | Array<number> {

    for (let index1 = 0; index1 < nums.length; index1++) {
        for (let index2 = index1 + 1; index2 < nums.length; index2++) {
            if (nums[index1] + nums[index2] === target) {
                return [index1, index2];
            }
        }
    }

    return undefined;
}
