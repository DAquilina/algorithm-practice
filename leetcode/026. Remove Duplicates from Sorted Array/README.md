# Explanation

I actually solved the **Remove Element** before this one, so I essentially used the same algorithm
with minor tweaks to solve this one. We just step through the array, and jump the target index for
the copy past any duplicate elements. Since we compare the current element to its preceding
element, we also need a check for the case where `nums.length === 1`, since that result is always
static and it would involve accessing an index outside of the array to pass it through the loop.
TypeScript is okay with that, but a lot of languages aren't.

## Computational Complexity

O(n)

## Spatial Complexity

O(1)
