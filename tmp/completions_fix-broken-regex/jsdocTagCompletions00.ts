/// <reference path="../fourslash.ts"/>

//
// fourslash test: src/services/completions.ts#getCompletionData (#37546)
//

// @Filename: dummy.ts
/////** /*2*/*/
////function dummy(a: string) {}
////
/////**
//// +/*3*/
//// */
////function a0(s: string) {}
////
/////**
//// + @/*3_1*/
//// */
////function a1(s: string) {}
////
/////**
//// */*4*/
//// */
////function a2(s: string) {}
////
/////**
//// * @/*5*/
//// */
////function a3(s: string) {}
////

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


// CompletionInfo.entries is CompletionDataKind.JsDocTag [/** |c|*/]
verify.completions({
    marker: "2",
    includes: jsDocTags,
    // exact: jsDocTags
});

// completionInfo request will be fail [ +|c|]
try {
    verify.completions({ marker: "3" });
} catch (e) {
    console.assert(e.message === "Error No content available.", e.message);
}

// completionInfo request will be fail [ + @|c|]
try {
    verify.completions({ marker: "3_1" });
} catch (e) {
    console.assert(e.message === "Error No content available.", e.message);
}

// CompletionInfo.entries is CompletionDataKind.JsDocTag [ *|c|]
verify.completions({
    marker: "4",
    includes: jsDocTags,
});

// CompletionInfo.entries is CompletionDataKind.JsDocTagName [ * @|c|]
goTo.marker("4");
edit.insert(" @");
verify.completions({
    // marker: "5",
    includes: jsDocTagNames,
});
