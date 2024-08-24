# Explanation

This algorithm uses two pointers on the same array which start on the same index. The function will
step through the entire set, but the iterator jumps ahead every time it encounters the target value.
Once the value of the iterator is set, the placeholder value gets the value from the iterator's
index shifted down. By the time the iterator is outside the bounds of the array, we can be certain
that every instance of the target value has been removed from the bottom n elements, and then we can
just return the placeholder pointer, as it is now at the highest position guaranteed to not have the
target value.

## Computational Complexity

O(n)

## SPatial Complexity

O(1)
