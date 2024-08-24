function longestCommonPrefix(strs: string[]): string {
    
    if (strs.length === 1) {
        return strs[0];
    }

    strs.sort();

    for (let letterIndex = 0; letterIndex < strs[0].length; letterIndex++) {
        if (
            letterIndex > strs[strs.length - 1].length ||
            strs[0][letterIndex] !== strs[strs.length - 1][letterIndex]
        ) {
            return strs[0].slice(0, letterIndex);
        }
    }

    return "";
};
