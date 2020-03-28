// ^(?:                # non-capturing group $1
//   \s*               # has whitespace ahead?
//   (?:               # non-capturing group $2
//     [*\s]+(?=\s+) # A string that is a mixture of "*" and whitespace terminated by one or more whitespaces
//   )?\s+             # adjust for previous anchor
//   |                 # or
//   \s*\/\*\*\s+      # e.g - " /** "
// )                   # end non-capturing group $1
// (
//   @                 # has triggerCharacter? (capturing group $1)
// )?$

// https://regex101.com/r/Qe4Mqs/3
/**
 * ```perl
 *^(?:                # non-capturing group $1
 *  \s*               # has whitespace ahead?
 *  (?:               # non-capturing group $2
 *    [*\s]+(?=\s+)   # A string that is a mixture of "*" and whitespace terminated by one or more whitespaces
 *  )?\s+             # adjust for previous anchor
 *  |                 # or
 *  \s*\/\*\*\s+      # e.g - [ /** ]
 *)                   # end non-capturing group $1
 *(
 *  @                 # has triggerCharacter? (capturing group $1)
 *)?$
 * ```
 */
const re = /^(?:\s*(?:[*\s]+(?=\s+))?\s+|\s*\/\*\*\s+)(@)?$/;
