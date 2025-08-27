function isPalindrome(x: number): boolean {
    
    if (x < 0) {
        return false;
    }

    if (x < 10) {
        return true;
    }

    return checkPalindromeUsingPureMath(x);
};

function checkPalindromeUsingPureMath(x: number): boolean {

    const digits = (Math.log10(x) + 1) | 0;
    const halfDigits = (digits / 2) | 0;

    const bottom = x % Math.pow(10, halfDigits);
    let top = (x - bottom) / Math.pow(10, halfDigits);

    if (digits % 2 === 1) {
        top /= 10;
    }

    top = top | 0;

    for (let digit = 0; digit < halfDigits; digit++) {

        if (
            ((top | 0) % 10) !==
            (((bottom / Math.pow(10, halfDigits - digit - 1)) % 10) | 0)
        ) {
            return false;
        }

        top /= 10;
    }

    return true;
}
