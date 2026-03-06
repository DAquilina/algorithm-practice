// https://regex101.com/r/sJQSWD/1

window.regexSet = window.regexSet ?? [];

// NOTE: If you want the expression to only match non-consecutive repeating characters, then you can use: /(?=(.)+\1+)/g
//       This would make the algorithm a bit more efficient. You can use this and consecutive-repeating-characters together by splitting the input
//       string by consecutive repeating characters to ensure that each substring only contains non-consecutive repeating characters
// NOTE: Because this uses match group backreference, the output's match string will be empty, requiring additional logic to extract the matched text
window.regexSet.push({
  name: "repeating-characters",
  regexp: /(?=(.).*\1+)/g,
  regexpString: "\(\?=\(\.\)\.\*\\1\+\)",
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
    "vqblqcb",
    "nigoczbnvoqwsvlwtlfcpgqjmxjucbg",
    "xezovfhcujyqdbchdldzankhflaczdxyhwodbxhxgfomhqvkbyldnvkuimwjpvjzrxev",
    "`1c35y 8o78nbir tu l; u;ou'i;y.utiryil y;iu-=uy9u0tryt e4 245373 589n5806 8olkrbteyje47e5 ",
    "\":>?\":>?\":>?\":>?",
    "[][][][][][][][][][][][][]"
  ],
  expectedMismatches: [
    "abcdefg []()-=1234567890",
    "vlsdqir",
    "fhdiwkjal",
    "!@#$%^&*()_+-=[]{};:'\"`,./<>? ",
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  ]
});
