# Explanation

We use log10 to determine the number of digits, then split the number into a top and bottom half
using modulus, discarding the middle digit if the number of digits is odd. Then, in a loop, we check
to see if the lowest digit of the "top" half is equal to the highest digit of the "bottom" half by
shifting each number the correct number of places and using division and flooring before checking
the digit in the ones column using mod10. If the result is ever a mismatch, we know there's no
palindrome and can return false. If the loop completes, we return true.

Notes:

1) There is almost certainly a way to use fewer calls to pow10, which would reduce the execution
    time as that is the most computationally-intensive function on display
2) While there is a hard limit on the size of an integer, we save a bit of time by only needing to
    check half of the numbers
3) Floating bit precision makes using the bottom half as a decimal number (which would allow us to
    do `bottom *= 10` instead of `bottom / Math.pow(10, halfDigits - 1 - 1)`) infeasible

## Computational Complexity

O(log(n))

## Spatial Complexity

O(1)
