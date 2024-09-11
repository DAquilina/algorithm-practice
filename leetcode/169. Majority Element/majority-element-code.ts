function majorityElement(nums: number[]): number {
    
    // return hashSolution(nums);
    return majorityVoteSolution(nums);
};

/**
 * Implementation of the Boyer–Moore majority vote algorithm
 *
 * https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm
 */
function majorityVoteSolution(nums: Array<number>): number {

    let currentMajority: number;
    let count = 0;

    nums.forEach((num: number) => {

        if (count === 0) {
            currentMajority = num;
            count = 1;
        }
        else {
            count += (currentMajority === num) ? 1 : -1;
        }
    });

    // Since we know that there is a majority, we can skip the second pass
    return currentMajority;
}

/**
 * Basic solution with `O(n)` spatial complexity and `O(n + m) ~> O(n)` time complexity, where
 * `m` is the number of unique elements in the set (which is at most `n/2 - 1`).
 *
 * Iterates through the set once, counting the number of each element found in a dictionary,
 * then iterates through the dictionary and returns the highest element. Can be made slightly
 * more efficient by returning the first element of the hash with `n/2` or greater occurrences.
 */
function hashSolution(nums: Array<number>): number {

    const hash: { [key: number]: number } = {};

    for (let index = 0; index < nums.length; index++) {
        hash[nums[index]] = (hash[nums[index]] ?? 0) + 1;

        if (hash[nums[index]] > (nums.length / 2)) {
            break;
        }
    }

    let majorityNumber: string | undefined;
    let max: number | undefined;

    for (let num in hash) {
        if (majorityNumber === undefined || (max !== undefined && hash[num] > max)) {
            majorityNumber = num;
            max = hash[num];
        }
    }

    return +majorityNumber;
}
