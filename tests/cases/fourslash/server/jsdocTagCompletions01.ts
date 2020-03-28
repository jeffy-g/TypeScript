/// <reference path="../fourslash.ts"/>

//
// fourslash test: src/services/completions.ts#getCompletionData (#37546)
//
// TIP: available marker characters - "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$1234567890_"
//  see src/harness/fourslashImpl.ts#parseFileContent

// tests/cases/fourslash/server/openFileWithSyntaxKind.ts
// tests/cases/fourslash/server/jsdocTypedefTagNamespace.ts
// tests/cases/fourslash/server/tsxIncrementalServer.ts
// tests/cases/fourslash/server/jsdocTypedefTag.ts

// gulp runtests --runners=fourslash-server


// @Filename: dummy.ts
/////**
//// +/*1*/
//// */
////function a0(s: string) {}
////

// gulp runtests --runners=fourslash-server

/**
 +
 */
const jsDocTagNames = [
    "abstract",        "access",          "alias",           "argument",        "async",           "augments",        "author",          "borrows",         "callback",        "class",
    "classdesc",       "constant",        "constructor",     "constructs",      "copyright",       "default",         "deprecated",      "description",     "emits",           "enum",
    "event",           "example",         "exports",         "extends",         "external",        "field",           "file",            "fileoverview",    "fires",           "function",
    "generator",       "global",          "hideconstructor", "host",            "ignore",          "implements",      "inheritdoc",      "inner",           "instance",        "interface",
    "kind",            "lends",           "license",         "listens",         "member",          "memberof",        "method",          "mixes",           "module",          "name",
    "namespace",       "override",        "package",         "param",           "private",         "property",        "protected",       "public",          "readonly",        "requires",
    "returns",         "see",             "since",           "static",          "summary",         "template",        "this",            "throws",          "todo",            "tutorial",
    "type",            "typedef",         "var",             "variation",       "version",         "virtual",         "yields"
];
const jsDocTags = jsDocTagNames.map(name => "@" + name);

// const jsDocTagNameEntries = jsDocTagNames.map(name => {
//     return {
//         name,
//         kind: "keyword",
//         sortText: completion.SortText.LocationPriority
//     };
// });
// const jsDocTagEntries = jsDocTags.map(name => {
//     return {
//         name,
//         kind: "keyword",
//         sortText: completion.SortText.LocationPriority
//     };
// });

verify.completions({
    marker: "1",
    exact: undefined // or []
});

/*
1) fourslash-server tests
       tests/cases/fourslash/server/jsdocTagCompletions01.ts
         fourslash-server test jsdocTagCompletions01.ts runs correctly:
     Error: Error No content available.
      at SessionClient.processResponse (src\harness\client.ts:118:23)
      at SessionClient.getCompletionsAtPosition (src\harness\client.ts:193:35)
      at Function.proxy.<computed> [as getCompletionsAtPosition] (src\harness\fourslashImpl.ts:369:66)
      at TestState.getCompletionListAtCaret (src\harness\fourslashImpl.ts:1155:41)
      at TestState.verifyCompletionsWorker (src\harness\fourslashImpl.ts:795:44)
      at TestState.verifyCompletions (src\harness\fourslashImpl.ts:789:26)
      at Verify.completions (src\harness\fourslashInterfaceImpl.ts:222:28)
      at eval (tests\cases\fourslash\server\jsdocTagCompletions01.ts:57:8)
      at runCode (src\harness\fourslashImpl.ts:3745:13)
      at runFourSlashTestContent (src\harness\fourslashImpl.ts:3704:9)
      at Object.runFourSlashTest (src\harness\fourslashImpl.ts:3688:9)
      at Context.<anonymous> (src\testRunner\fourslashRunner.ts:57:43)
      at processImmediate (internal/timers.js:456:21)
*/
