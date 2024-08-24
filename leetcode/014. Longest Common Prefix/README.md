# Explanation

Sorting the starting array ensures the first and last element are the most distinct, so we compare
those two and return everything before the mismatch. Assuming the sort is optimized, the actual
check only scales based off the average length of the first and last word.

## Computational Complexity

`n`: The number of elements in the source array
`m`: The length of the first or last word in the set, whichever is shortest

*Assuming a sort function with O(log(n)) complexity*

**Best Case (no shared prefix)**: O(log(n))

**Average Case**: O(log(n)log(m))

**Worst Case (every element is the exact same word)**: O(log(n)m)

## Spatial Complexity

O(1), but it's worth noting that the source array is sorted in place to achieve this, which is
definitely an anti-pattern.
