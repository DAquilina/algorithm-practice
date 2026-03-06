// https://regex101.com/r/k8b4BI/1

window.regexSet = window.regexSet ?? [];

// NOTE: Because this uses match group backreference, the output's match string will be empty, requiring additional logic to extract the matched text
window.regexSet.push({
  name: "consecutive-repeating-characters",
  regexp: /(.)\1+/g,
  regexpString: "\(\.\)\\1\+",
  intendedFlags: "g",
  expectedMatches: [
    "aaaaaaaaa",
    "(((((((((",
    ".........",
    "aab",
    "abb",
    "aaabbbccccabcd",
    "jxdlnaaij",
    "abcdefg []()-=12345678900",
    "aabcdefg []()-=1234567890",
    "abcdefg []]()-=1234567890",
    "=-=-=-=-=-=--=-=-=-=-=-=",
  ],
  expectedMismatches: [
    "vqblqcb",
    "abcdefg []()-=1234567890",
    "nigoczbnvoqwsvlwtlfcpgqjmxjucbg",
    "xezovfhcujyqdbchdldzankhflaczdxyhwodbxhxgfomhqvkbyldnvkuimwjpvjzrxev",
    "vlsdqir",
    "\":>?\":>?\":>?\":>?",
    "[][][][][][][][][][][][][]",
    "`1c35y 8o78nbir tu l; u;ou'i;y.utiryil y;iu-=uy9u0tryt e4 245373 589n5806 8olkrbteyje47e5 "
  ]
});
