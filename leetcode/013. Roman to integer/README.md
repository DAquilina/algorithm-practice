# Explanation

Using a REGEX is a reasonably efficient means of splitting out the individual numerals, giving
priority to values which are prefixed. Once you have that set, you merely iterate through it an
accumulate a total. `forEach` turned out to be more efficient than using `reduce`. Also, making
prefix numerals optional part of the suffix group instead of explicitly including prefixed and
non-prefixed groups boosted speed slightly.

## Computational Complexity

O(n), though the max of `n` is 29.

## Spatial Complexity

O(1)
