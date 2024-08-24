# Explanation

By starting with the top range of `m` and `n`, we can start filling in the back end of `nums1`,
which is 0-padded with `n` elements, and ensure that we do not override any values that we may need
later. We then step down each array, pulling out the larger of the two numbers and decrementing the
index only for the array from which an element was copied so that we always have a pointer to the
largest unused number in each array.

## Computational Complexity

`m`: the number of elements with a noteworthy value in `nums1`
`n`: the number of elements in `nums2`

O(m + n)

## Spatial Complexity

O(1)
