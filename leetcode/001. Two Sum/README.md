# Explanation

Divide and conquer. Using a depth-first recursive traversal, the array gets split into groups of 3
or fewer elements. If a solution is found within those sets, we bubble the result back up and
adjust the resulting indices in steps based on whether the solution was found in the top or bottom
half of the division. If a solution, is not found, then check the combined set.

This algorithm is highly inefficient if the two solution indices are on complete opposite sides of
a massive array, but generally a lot faster in the average case.

## Computational Complexity

**Best Case (adjacent elements)**: O(log(n))

**Worst Case (opposite ends of the array)**: O(n^2);

## Spatial Complexity

O(n*log(n))
