function assert(hexColourA, hexColourB, expectedAverage) {

    const result = averageColours(hexColourA, hexColourB);

    console.log("----------");
    console.log(hexColourA, hexColourB, result, result.toLowerCase() === expectedAverage.toLowerCase());
}

/**
 * Write a function that takes 2 colors as arguments and returns the average color.
 * The parameters will be two 6-digit hexadecimal strings. This does not need to be validated.
 * The return value should be a 6-digit hexadecimal string.
 * The hexadecimal strings represent colors in RGB, much like in CSS, but without the leading #.
 * The average color is to be determined by taking the arithmetic mean for each component: red, green and blue.
 */
function averageColours(hexColourA, hexColourB) {

    const xrgbA = [];
    const xrgbB = [];

    const output = [];

    [0, 2, 4].forEach((offset, index) => {

        // convert each individual hex colour value to its decimal equivalent, take the average of the equivalent from the other number,
        // and then convert back into a padded hex string
        output.push(
            Math.floor(
                (
                    parseInt(hexColourA.substring(offset, offset + 2), 16) +
                    parseInt(hexColourB.substring(offset, offset + 2), 16)) / 2
            ).toString(16).padStart(2, "0")
        );
    });

    return output.join("");
}


// Testing
assert("000000", "000000", "000000");
assert("FFFFFF", "FFFFFF", "FFFFFF");
assert("000000", "FFFFFF", "7F7F7F");
assert("000000", "FF0000", "7F0000");
assert("000000", "00FF00", "007F00");
assert("000000", "0000FF", "00007F");
assert("042704", "d47da6", "6C5255");
