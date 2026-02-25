// https://regex101.com/r/9Ovzvp/1

window.regexSet = window.regexSet ?? [];

window.regexSet.push({
  name: "phone-na",
  description: "Matches any variation of the North American phone number. Should correctly capture the country code, area code, and both segments of the target number regardless of punctuation and whitespace",
  regexp: /^ *(?:\+?(?<countrycode>[0-9]{1,3}))?[.\/\-_ ]*\(?(?<areacode>[0-9]{3})?\)?[.\/\-_ ]*(?<phone1>[0-9]{3})[.\/\-_ ]*(?<phone2>[0-9]{4}) *$/,
  regexpString: "^ *(?:\\+?(?<countrycode>[0-9]{1,3}))?[.\\/\\-_ ]*\\(?(?<areacode>[0-9]{3})?\\)?[.\\/\\-_ ]*(?<phone1>[0-9]{3})[.\\/\\-_ ]*(?<phone2>[0-9]{4}) *$",
  intendedFlags: "",
  notes: [
    "Many phone formats end up being some variation of a country code followed by 10 numbers even if the individual components differ. As a result, leaving out that formatting should allow any phone number to be accepted by the pattern, though the capture groups may not follow the expected paradigm"
  ],
  expectedMatches: [
    "8675309",
    "867-5309",
    "867_5309",
    "5558675309",
    "555-867-5309",
    "18675309",
    "+18675309",
    "+448675309",
    "+1 867-5309",
    "+15558675309",
    "+1(555)867-5309",
    "+1 (555) 867-5309",
    "(555)    867-5309",
    "      1.555.867.5309    ",
    "+91 9812345678",
    "+44 7911123456",
    "+212 0511223344",
    "+27 011 867 5309"
  ],
  expectedMismatches: [
    "1",
    "+1",
    "867",
    "5309",
    "911",
    "+ () -",
    "-15558675309",
    "867!5309",
    "86753098675309",
    "",
    "phone: 867-5309",
    "15558675309x123",
    "15558675309;123",
    "abbbcccdddd",
    "+91 98123-45678",
    "+44 7911 123456",
    "+212 05 11 22 33 44",
    "+86 755 1111 2222",
    "+¹ ¹²³ ¹²³ ¹²³¼"
  ]
});
