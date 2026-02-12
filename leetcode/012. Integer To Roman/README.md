# Explanation

### Solution 1

`romanMap` contains elements of decreasing value which are systematically eliminated by stepping down the value of `num`. Every time a quantity is
removed from `num`, the corresponding roman numeral is appended to the output until the result is 0;

### Solution 2

Similar to Solution 1, but instead of using logic to break down `num` everything is hard-coded to minimize the amount of in-memory values needed. It's
incredibly stupid and does not even remotely scale up, but it's at exactly 30 conditional checks and at most 8 simple arithmetic calculations, which
is lightning fast.

## Computational Complexity

### Solution 1

O(n), though the max of `n` is 13.

### Solution 2

O(1)

## Spatial Complexity

### Solution 1

O(1)

### Solution 2

O(1)
