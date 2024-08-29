class RegexMap {

  _regexMap = {};

  constructor() {

    (window.regexSet || []).forEach((regex) => {

      this._regexMap[regex.name] = {
        ...regex,
        expression: regex.regexp,
        expressionFromString: new RegExp(regex.regexpString, regex.intendedFlags),
        regexp: undefined
      };
    });
  }


  dumpAll() {

    let regex;

    Object.keys(this._regexMap).forEach((name) => {

      regex = this.get(name);

      console.log("----------");
      console.log(`${name}: ${regex.regexpString}`);
      console.log("Expected Matches:", regex.expectedMatches);
      console.log("Expected Mismatches:", regex.expectedMismatches);
      console.log("----------");
    });
  }


  get(name) {

    return this._regexMap[name];
  }


  test(name) {

    const regex = this.get(name);

    let matchCount = 0;

    [
      ...regex.expectedMatches, ...regex.expectedMismatches
    ].forEach((str) => {

      if (regex.expression.test(str) && regex.expressionFromString.test(str)) {
        matchCount++;
      }
    });

    return (matchCount === regex.expectedMatches.length);
  }


  testAll() {

    let output = "";

    Object.keys(this._regexMap).forEach((name) => {

      output += `${name}: ${this.test(name) ? "Correct" : "Incorrect"}\n`;
    });

    return output;
  }
};
