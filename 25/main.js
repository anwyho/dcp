// # Spec
//
// Implement regular expression matching with the following special characters:
// 
// `.` (period) which matches any single character
// `*` (asterisk) which matches zero or more of the preceding element
// That is, implement a function that takes in a string and a valid regular expression and returns 
// whether or not the string matches the regular expression.
// 
// For example, given the regular expression "ra." and the string "ray", your function should 
// return true. 
// The same regular expression on the string "raymond" should return false.
// 
// Given the regular expression ".*at" and the string "chat", your function should return true.  
// The same regular expression on the string "chats" should return false.
function match(regex, expr) {
    // This is the finished implementation
    // return (new RegExp(`^${regex}$`)).test(expr)
    if (!isValidRegex(regex)) {
        throw new Error("hey, bad regex yo");
    }
    if (regex.length === 0) {
        return expr === "";
    }
    if (regex.length === 1) {
        return expr.length === 1;
    }
    var hasWildcards = false;
    var minLength = 0;
    var segments = [];
    var phrase = "";
    for (var i = 0; i < regex.length; i++) {
        if (regex.charAt(i) === "*") {
            if (phrase.length >= 2) {
                minLength += phrase.length - 1;
                segments.push({ s: phrase.substring(0, phrase.length - 1) });
            }
            segments.push({ s: phrase.charAt(phrase.length - 1), isRepeated: true });
            hasWildcards = true;
            phrase = "";
        }
        else {
            phrase += regex.charAt(i);
        }
    }
    if (phrase.length > 0) {
        segments.push({ s: phrase });
        minLength += phrase.length;
    }
    // TODO: This can probably be more integrated into matchSegements, 
    //  since the check is only done once. It would probably be useful
    //  near the tail end of segment matching. Might have to be very 
    //  integrated into the data structure we pass into matchSegments
    //  though. 
    if (expr.length < minLength) {
        return false;
    }
    // console.log(`test: ${matchSegments([{s: "a", isRepeated: true}], 'a')}`)
    return matchSegments(segments, expr);
}
function matchSegments(segments, expr) {
    var segment = segments[0], remainingSegments = segments.slice(1);
    if (segment === undefined) {
        return expr === "";
    }
    var isRepeated = Boolean(segment.isRepeated);
    if (isRepeated) {
        var matchFound = false;
        while (!matchFound) {
            matchFound = matchSegments(remainingSegments, expr);
            // found a further match, so try it again
            if ((expr.length > 0 && segment.s === ".") || segment.s === expr.charAt(0)) {
                expr = expr.substring(1, expr.length);
            }
            else {
                break;
            }
        }
        return matchFound;
    }
    else {
        for (var i = 0; i < segment.s.length; i++) {
            // not wildcard and not match
            if (segment.s.charAt(i) !== "." && segment.s.charAt(i) != expr.charAt(i)) {
                return false;
            }
        }
        return matchSegments(remainingSegments, expr.substring(segment.s.length, expr.length));
    }
    return true;
}
function isValidRegex(regex) {
    var followsAsterisk = true;
    for (var i = 0; i < regex.length; i++) {
        var c = regex.charAt(i);
        if (c === '*') {
            if (followsAsterisk) {
                return false;
            }
            followsAsterisk = true;
        }
        else {
            followsAsterisk = false;
        }
    }
    return true;
}
var tests = [
    // invalid regexes
    { regexes: ["*", ".**", ".**.", "*.*.*", "a**", ".**.", "*a.*", "*.a*..*"], exprs: [""] },
    // matches blank string
    { regexes: ["", ".*", "a*", ".*.*"], exprs: [""] },
    // doesn't match blank string
    { regexes: ["a", ".", "..*", ".*.", ".*..*.*"], exprs: [""] },
    { regexes: ["a"], exprs: ["a"] },
    { regexes: ["abc"], exprs: ["abc"] },
    { regexes: ["a.c"], exprs: ["aac", "abc", "acc", "aaaa", "ababc"] },
    { regexes: ["a*c"], exprs: ["c", "ac", "aac", "aaac", "aaaa", "ababac", "aacc"] },
    { regexes: ["."], exprs: ["a", "aa", "ab"] },
    { regexes: [".*", "a*"], exprs: ["a", "aa", "aaa"] },
    { regexes: [".*"], exprs: ["ab", "aaab"] },
    { regexes: ["..*"], exprs: ["ab", "abb", "aaa", "aa", "a"] },
    { regexes: [".*ab"], exprs: ["ab", "bab", "bbab", "aab", "aaab"] },
    { regexes: [".*ab"], exprs: ["abab", "aaaabb", "caab"] },
    { regexes: ["a.*", ".*a.*", ".*a*.*a", ".*.*a.*.*", "..*a*.*"], exprs: ["a"] },
    { regexes: ["a.*", ".*a.*", ".*a*b.*a", ".*.*a.*.*", "..*a*.*"], exprs: ["ab"] },
];
// This code uses the actual RegExp implementation to test. 
var errors = [];
for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
    var tc = tests_1[_i];
    for (var _a = 0, _b = tc.regexes; _a < _b.length; _a++) {
        var regex = _b[_a];
        for (var _c = 0, _d = tc.exprs; _c < _d.length; _c++) {
            var expr = _d[_c];
            var result = void 0;
            var expected = null;
            try {
                var guardedRegex = "^" + regex + "$";
                expected = (new RegExp(guardedRegex)).test(expr);
            }
            catch (e) { /* received invalid regex, which is fine */ }
            console.log("regex: /" + regex + "/ expr: \"" + (expr !== null && expr !== void 0 ? expr : "error") + "\"");
            try {
                result = match(regex, expr);
                if (expected === undefined) {
                    console.log("  got " + result + ", expected error");
                    errors.push({ regexes: [regex], exprs: [expr] });
                }
                else if (result !== expected) {
                    console.log("  got " + result + ", expected " + expected);
                    errors.push({ regexes: [regex], exprs: [expr] });
                }
            }
            catch (e) {
                if (expected !== null) {
                    console.log("  got error, expected " + expected);
                    errors.push({ regexes: [regex], exprs: [expr] });
                }
            }
        }
    }
}
console.log("errors: " + errors);
if (errors.length === 0) {
    console.log("Success!");
}
