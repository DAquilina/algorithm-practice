class RegexMap {

  _regexMap = {};

  constructor() {

    (window.regexSet || []).forEach((regex) => {

      this._regexMap[regex.name] = {
        ...regex,
        description: regex.description,
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
      console.log(regex.description);
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

    for (const input of regex.expectedMatches) {
      regex.expression.lastIndex = 0;
      regex.expressionFromString.lastIndex = 0;

      if (!regex.expression.test(input) || !regex.expressionFromString.test(input)) {
        return false;
      }
    }

    for (const input of regex.expectedMismatches) {
      regex.expression.lastIndex = 0;
      regex.expressionFromString.lastIndex = 0;

      if (regex.expression.test(input) || regex.expressionFromString.test(input)) {
        return false;
      }
    }

    return true;
  }


  testAll() {

    let output = "";

    Object.keys(this._regexMap).forEach((name) => {

      output += `${name}: ${this.test(name) ? "Correct" : "Incorrect"}\n`;
    });

    return output;
  }
};
