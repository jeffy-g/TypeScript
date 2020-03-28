/// <reference path="./fourslash.ts"/>

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


/////**
//// +/*1*/
//// */
////function a0(s: string) {}
////

// gulp runtests --runners=fourslash-server

/**
 ** * 
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
// const jsDocTags = jsDocTagNames.map(name => "@" + name);


// line 2: [ +|c|]
verify.completions({
    marker: "1",
    exact: undefined // or []
});

// line 2: [ +|c|] ->  [ +@|c|]
// before the fix, jsdoc tag names was listed but no longer appears
edit.insert("@");
verify.completions({
    exact: undefined
});

// line 2: [ +@|c|] -> [ *|c|]
// before the fix, jsdoc tags was listed but no longer appears
edit.replaceLine(1, " *");
verify.completions({
    exact: undefined
});

// line 2: [ *|c|] -> [ * |c|]
// jsdoc tags are listed when there is more than one whitespace after "*"
edit.insert(" ");
verify.completions({
    includes: ["@abstract"]
});

// line 2: [ * |c|] -> [ * @|c|]
// jsdoc tag names will be listed
edit.insert("@");
verify.completions({
    includes: ["abstract"]
});
