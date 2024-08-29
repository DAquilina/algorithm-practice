# Explanation

Very similar to the solution to **Remove Duplicates from Sorted Array**, except we also check to see
if the following element is a match. If the target number is flanked on both sides by itself, then
there are at least three of that number, so we skip ahead until this is no longer true. We're
essentially taking the first and last occurrence of each number, and skipping the ones in the
middle.

## Computational Complexity

O(n)

## Spatial Complexity

O(1)
