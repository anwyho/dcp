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


// Describes a string to match and whether or not it's repeated. 
interface Segment {
  s: string;
  isRepeated?: boolean; 
}

function match(regex: string, expr: string): boolean {
  // This is the finished implementation
  // return (new RegExp(`^${regex}$`)).test(expr)

  if (!isValidRegex(regex)) { throw new Error("hey, bad regex yo") }
  if (regex.length === 0) { return expr === "" } 
  if (regex.length === 1) { return expr.length === 1 } 

  let hasWildcards = false
  let minLength = 0;

  let segments: Segment[] = []
  let phrase = ""
  for (let i = 0; i < regex.length; i++) {
    if (regex.charAt(i) === "*") {
      if (phrase.length >= 2) {
        minLength += phrase.length - 1
        segments.push({s: phrase.substring(0, phrase.length - 1)})
      }
      segments.push({s: phrase.charAt(phrase.length - 1), isRepeated: true})
      hasWildcards = true
      phrase = ""
    } else {
      phrase += regex.charAt(i)
    }
  }

  if (phrase.length > 0) {
    segments.push({s: phrase})
    minLength += phrase.length
  }

  // TODO: This can probably be more integrated into matchSegements, 
  //  since the check is only done once. It would probably be useful
  //  near the tail end of segment matching. Might have to be very 
  //  integrated into the data structure we pass into matchSegments
  //  though. 
  if (expr.length < minLength) { return false }
  // console.log(`test: ${matchSegments([{s: "a", isRepeated: true}], 'a')}`)

  return matchSegments(segments, expr)
}

function matchSegments(segments: Segment[], expr: string): boolean {
  let [segment, ...remainingSegments] = segments
  if (segment === undefined) { return expr === "" }

  const isRepeated = Boolean(segment.isRepeated)
  if (isRepeated) {
    let matchFound = false
    while (!matchFound) {
      matchFound = matchSegments(remainingSegments, expr)
      // found a further match, so try it again
      if ((expr.length > 0 && segment.s === ".") || segment.s === expr.charAt(0)) {
        expr = expr.substring(1, expr.length)
      } else {
        break 
      }
    }
    return matchFound
  } else {
    for (let i = 0; i < segment.s.length; i++) {
      // not wildcard and not match
      if (segment.s.charAt(i) !== "." && segment.s.charAt(i) != expr.charAt(i)) {
        return false
      }
    }
    return matchSegments(remainingSegments, expr.substring(segment.s.length, expr.length))
  } 

  return true
}

function isValidRegex(regex: string): boolean {
  let followsAsterisk = true
  for (let i = 0; i < regex.length; i++) {
    let c = regex.charAt(i)
    if (c === '*') {
      if (followsAsterisk) { return false }
      followsAsterisk = true
    } else {
      followsAsterisk = false
    }
  }
  return true
}


// Testing Code

interface TestCase {
  regexes: string[];
  exprs: string[];
  // An undefined result means we're expecting an error
  expected?: boolean;
}

const tests: TestCase[] = [
  // invalid regexes
  {regexes: ["*", ".**", ".**.", "*.*.*", "a**", ".**.", "*a.*", "*.a*..*"], exprs: [""]},

  // matches blank string
  {regexes: ["", ".*", "a*", ".*.*"], exprs: [""]},
  
  // doesn't match blank string
  {regexes: ["a", ".", "..*", ".*.", ".*..*.*"], exprs: [""]},

  {regexes: ["a"], exprs: ["a"]},
  {regexes: ["abc"], exprs: ["abc"]},
  {regexes: ["a.c"], exprs: ["aac", "abc", "acc", "aaaa", "ababc"]},
  {regexes: ["a*c"], exprs: ["c", "ac", "aac", "aaac", "aaaa", "ababac", "aacc"]},
  {regexes: ["."], exprs: ["a", "aa", "ab"]},
  {regexes: [".*", "a*"], exprs: ["a", "aa", "aaa"]},
  {regexes: [".*"], exprs: ["ab", "aaab"]},
  {regexes: ["..*"], exprs: ["ab", "abb", "aaa", "aa", "a"]},
  {regexes: [".*ab"], exprs: ["ab", "bab", "bbab", "aab", "aaab"]},
  {regexes: [".*ab"], exprs: ["abab", "aaaabb", "caab"]},
  {regexes: ["a.*", ".*a.*", ".*a*.*a", ".*.*a.*.*", "..*a*.*"], exprs: ["a"]},
  {regexes: ["a.*", ".*a.*", ".*a*b.*a", ".*.*a.*.*", "..*a*.*"], exprs: ["ab"]},
];

// This code uses the actual RegExp implementation to test. 
let errors: TestCase[] = []
for (const tc of tests) {
  for (const regex of tc.regexes) {
    for (const expr of tc.exprs) {
      let result: boolean;
      let expected: boolean | null = null;
      try {
        let guardedRegex = `^${regex}$`
        expected = (new RegExp(guardedRegex)).test(expr)
      } catch(e) { /* received invalid regex, which is fine */ }

      console.log(`regex: /${regex}/ expr: "${expr ?? "error"}"`)
      try {
        result = match(regex, expr)
        if (expected === undefined) {
          console.log(`  got ${result}, expected error`)
          errors.push({regexes: [regex], exprs: [expr]})
        } else if (result !== expected) {
          console.log(`  got ${result}, expected ${expected}`)
          errors.push({regexes: [regex], exprs: [expr]})
        }
      } catch(e) {
        if (expected !== null) {
          console.log(`  got error, expected ${expected}`)
          errors.push({regexes: [regex], exprs: [expr]})
        } 
      }
    }
  }
}

console.log(`errors: ${errors}`)
if (errors.length === 0) {
  console.log("Success!")
}









