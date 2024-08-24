const valueMap = {
    "I": 1,
    "IV": 4,
    "V": 5,
    "IX": 9,
    "X": 10,
    "XL": 40,
    "L": 50,
    "XC": 90,
    "C": 100,
    "CD": 400,
    "D": 500,
    "CM": 900,
    "M": 1000
};


function romanToInt(s: string): number {
    
    const numerals = s.match(/(?:C?M)|(?:C?D)|(?:X?C)|(?:X?L)|(?:I?X)|(?:I?V)|(?:I)/gm);
    
    let output = 0;

    numerals?.forEach((numeral: string) => {

        output += valueMap[numeral];
    });

    return output;
};
