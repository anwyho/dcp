# Spec

This problem was asked by Facebook.

Implement regular expression matching with the following special characters:

`.` (period) which matches any single character
`*` (asterisk) which matches zero or more of the preceding element
That is, implement a function that takes in a string and a valid regular expression and returns
whether or not the string matches the regular expression.

For example, given the regular expression "ra." and the string "ray", your function should
return true.
The same regular expression on the string "raymond" should return false.

Given the regular expression ".*at" and the string "chat", your function should return true.
The same regular expression on the string "chats" should return false.

# Notes on implementation

The testing runner code uses the JavaScript `RegExp` implementation.
The test cases are just regexes and corresponding strings to match against.
There could be a lot of benefit here with fuzzing tools, but it doesn't make too much sense since we're comparing against a far better regex implementation.
The results are derived from what `RegExp` says matches.

# Output

```
$ nodemon --watch './*' --exec "ts-node" ./main.ts
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): **/*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./main.ts`
regex: /*/ expr: ""
regex: /.**/ expr: ""
regex: /.**./ expr: ""
regex: /*.*.*/ expr: ""
regex: /a**/ expr: ""
regex: /.**./ expr: ""
regex: /*a.*/ expr: ""
regex: /*.a*..*/ expr: ""
regex: // expr: ""
regex: /.*/ expr: ""
regex: /a*/ expr: ""
regex: /.*.*/ expr: ""
regex: /a/ expr: ""
regex: /./ expr: ""
regex: /..*/ expr: ""
regex: /.*./ expr: ""
regex: /.*..*.*/ expr: ""
regex: /a/ expr: "a"
regex: /abc/ expr: "abc"
regex: /a.c/ expr: "aac"
regex: /a.c/ expr: "abc"
regex: /a.c/ expr: "acc"
regex: /a.c/ expr: "aaaa"
regex: /a.c/ expr: "ababc"
regex: /a*c/ expr: "c"
regex: /a*c/ expr: "ac"
regex: /a*c/ expr: "aac"
regex: /a*c/ expr: "aaac"
regex: /a*c/ expr: "aaaa"
regex: /a*c/ expr: "ababac"
regex: /a*c/ expr: "aacc"
regex: /./ expr: "a"
regex: /./ expr: "aa"
regex: /./ expr: "ab"
regex: /.*/ expr: "a"
regex: /.*/ expr: "aa"
regex: /.*/ expr: "aaa"
regex: /a*/ expr: "a"
regex: /a*/ expr: "aa"
regex: /a*/ expr: "aaa"
regex: /.*/ expr: "ab"
regex: /.*/ expr: "aaab"
regex: /..*/ expr: "ab"
regex: /..*/ expr: "abb"
regex: /..*/ expr: "aaa"
regex: /..*/ expr: "aa"
regex: /..*/ expr: "a"
regex: /.*ab/ expr: "ab"
regex: /.*ab/ expr: "bab"
regex: /.*ab/ expr: "bbab"
regex: /.*ab/ expr: "aab"
regex: /.*ab/ expr: "aaab"
regex: /.*ab/ expr: "abab"
regex: /.*ab/ expr: "aaaabb"
regex: /.*ab/ expr: "caab"
regex: /a.*/ expr: "a"
regex: /.*a.*/ expr: "a"
regex: /.*a*.*a/ expr: "a"
regex: /.*.*a.*.*/ expr: "a"
regex: /..*a*.*/ expr: "a"
regex: /a.*/ expr: "ab"
regex: /.*a.*/ expr: "ab"
regex: /.*a*b.*a/ expr: "ab"
regex: /.*.*a.*.*/ expr: "ab"
regex: /..*a*.*/ expr: "ab"
errors:
Success!
[nodemon] clean exit - waiting for changes before restart
```

