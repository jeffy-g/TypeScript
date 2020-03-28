// summary of /^\s*(?:[*\s]+(?=\s)|\/\*\*)?\s+(@)?$/
// ^              # start of string
// \s*            # has whitespace ahead?
// (?:            # non-capturing group $1
//   [*\s]+(?=\s) # A string that is a mixture of "*" and whitespace terminated by one or more whitespaces
//   |            # or
//   \/\*\*       # jsdoc start "/**"
// )?\s+          # end non-capturing group $1
// (@)?           # has triggerCharacter? (capturing group $1)
// $              # end of string

// https://regex101.com/r/Qe4Mqs/4
/**
 * ```php
 *^              # start of string
 *\s*            # has whitespace ahead?
 *(?:            # non-capturing group $1
 *  [*\s]+(?=\s) # A string that is a mixture of "*" and whitespace terminated by one or more whitespaces
 *  |            # or
 *  \/\*\*       # jsdoc start "/**"
 *)?\s+          # end non-capturing group $1
 *(@)?           # has triggerCharacter? (capturing group $1)
 *$              # end of string
 * ```
 */
const re = /^\s*(?:[*\s]+(?=\s)|\/\*\*)?\s+(@)?$/;
