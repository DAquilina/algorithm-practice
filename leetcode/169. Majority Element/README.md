# Explanation

Uses the Boyer–Moore majority vote algorithm to determine the majority element using a rolling
counter.

If the counter is at 0, then the current element becomes the target element with a value of 1. If
the element is encountered again, the counter increases, but if any other element is encountered,
the counter is decreased since the other element "cancels out" the presence of the target element.
By the time the iterator completes traversing the array, only an element represented by more than
half of the available elements will have not been cancelled out.

There is also a hash solution provided, which simply traverses the array once counts the number of
each element, then just returns the number with the highest count. Another viable solution (not
provided) would be to sort the array and return the middle element, since the majority element is
guaranteed to occupy that slot.

## Boyer-Moore

### Computational Complexity

`n`: the the number of elements in `nums`
`m`: the number of unique elements in `nums` (at most `n/2`)

O(n + m) -> O(n + 0.5n) -> O(n)

### Spatial Complexity

O(1)

## Hash

### Computational Complexity

O(n)

### Spatial Complexity

O(n)

## Sort

### Computational Complexity

O(nlog(n))

### Spatial Complexity

O(1) or O(log(n)), depending on the sorting algorithm
