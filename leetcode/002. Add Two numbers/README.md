# Explanation

A single traversal which builds the output linked list inline as the numbers are added. If either input is either not provided or is exactly 0, then
the other input is returned as-is without having to run the calculation. Otherwise every node is visited exactly once using a recursive function to
process parallel nodes.

## Computational Complexity

**Best Case (Falsey Input)**: O(1)

**Worst Case (Typical)**: O(n)

## Spatial Complexity

O(n*log(n))
