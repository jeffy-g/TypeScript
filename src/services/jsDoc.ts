/* @internal */
namespace ts.JsDoc {

    /**
     * To Be Done
     */
    type TBD<T> = T | undefined;

    /**
     * [&#64;use JSDoc](https://jsdoc.app/)
     *
     * jsdoc tag names with synonyms {@linkplain https://jsdoc.app/ &#64;use JSDoc}
     *
     *   + 69 entries (with `field`, `template`)
     *   + format: <primary>:<synonym>,<synonym>,...
     *
     * **NOTE**: if this elements contained ":" then it means has `synonyms`
     */
    const jsDocTagNames = [
        "abstract:virtual",             // tag
        "access",                       // tag + <package|private|protected|public>
        "alias",                        // tag + <aliasNamepath>
        "async",                        // tag
        "augments:extends",             // tag + <namepath>
        "author",                       // tag + <name> [<emailAddress>]
        "borrows",                      // tag + <that namepath> as <this namepath>
        "callback",                     // tag + <namepath>
        "class:constructor",            // tag + [<type> <name>]
        "classdesc",                    /* tag + <some description> */
        "constant:const",               // tag + [<type> <name>]
        "constructs",                   // tag + [<name>]
        "copyright",                    /* tag + <some copyright text> */
        "default:defaultvalue",         // tag + [<some value>]
        "deprecated",                   /* tag + [<some text>] */
        "description:desc",             /* tag + <some description> */
        "enum",                         // tag + [<type>]
        "event",                        // tag + <className>#[event:]<eventName>
        "example",                      // tag + <javascript? code>
        "exports",                      // tag + <moduleName>
        "external:host",                // tag + <NameOfExternal>
        "field",                        // **not listed at https://jsdoc.app/
        "file:fileoverview,overview",   /* ?tag + <description> */
        "fires:emits",                  // tag + <className>#[event:]<eventName>
        "function:func,method",         // tag + [<FunctionName>]
        "generator",                    // tag
        "global",                       // tag
        "hideconstructor",              // tag
        "ignore",                       // tag
        "implements",                   // tag + {typeExpression}
        "inheritdoc",                   // tag
        "inner",                        // tag
        "instance",                     // tag
        "interface",                    // tag + [<name>]
        "kind",                         // tag + <kindName>
        "lends",                        // tag + <namepath>
        "license",                      // tag + <identifier>
        "listens",                      // tag + <eventName>
        "member:var",                   // tag + [<type>] [<name>]
        "memberof",                     // tag + <parentNamepath>
        "mixes",                        // tag + <OtherObjectPath>
        "mixin",                        // tag + [<MixinName>]
        "module",                       // tag + [[{<type>}] <moduleName>]
        "name",                         // tag + <namePath>
        "namespace",                    // tag + [[{<type>}] <SomeName>]
        "override",                     // tag
        "package",                      // tag + [{typeExpression}]
        "param:arg,argument",           /* tag + [{<type>}] <name> [<some text>] */
        "private",                      // tag + [{typeExpression}]
        "property:prop",                /* tag + [{<type>}] <name> [<some text>] */
        "protected",                    // tag
        "public",                       // tag
        "readonly",                     // tag
        "requires",                     // tag + <someModuleName>
        "returns:return",               /* tag + [{<type>}] [description] */
        "see",                          /* tag + <namepath> | <text> */
        "since",                        // tag + <versionDescription>
        "static",                       // tag
        "summary",                      /* tag + <Summary goes here.> */
        "template",                     // **not listed at https://jsdoc.app/
        "this",                         // tag + <namePath>
        "throws:exception",             /* tag + {<type>} free-form description */
        "todo",                         /* tag + <text describing thing to do.> */
        "tutorial",                     // tag + <tutorial tag?>
        "type",                         // tag + {typeName}
        "typedef",                      // tag + [<type>] <namepath>
        "variation",                    // tag + <variationNumber>
        "version",                      // tag + <version tag>
        "yields:yield"                  // tag + [{type}] [description]
    ];
    /**
     * [&#64;use JSDoc](https://jsdoc.app/)
     *
     *   + 2 entries
     *
     * **NOTE**: if this elements contained ":" then it means has `synonyms`
     */
    const inlinejsDocTagNames = [
        "link:linkcode,linkplain",
        "tutorial",
    ];

    /**
     * see [fetch-jsdoc.app.ts](file:///F:\my_work\develop\typescript\contribute-ts-fix-broken-regex\src\jsdoc/fetch-jsdoc.app.ts)
     */
    const documentationOfBlock = [
        "abstract|This member must be implemented (or overridden) by the inheritor.",                        "access|Specify the access level of this member (private, package-private, public, or protected).",
        "alias|Treat a member as if it had a different name.",                                               "async|Indicate that a function is asynchronous.",
        "augments|Indicate that a symbol inherits from, and adds to, a parent symbol.",                      "author|Identify the author of an item.",
        "borrows|This object uses something from another object.",                                           "callback|Document a callback function.",
        "classdesc|Use the following text to describe the entire class.",                                    "class|This function is intended to be called with the \"new\" keyword.",
        "constant|Document an object as a constant.",                                                        "constructs|This function member will be the constructor for the previous class.",
        "copyright|Document some copyright information.",                                                    "default|Document the default value.",
        "deprecated|Document that this is no longer the preferred way.",                                     "description|Describe a symbol.",
        "enum|Document a collection of related properties.",                                                 "event|Document an event.",
        "example|Provide an example of how to use a documented item.",                                       "exports|Identify the member that is exported by a JavaScript module.",
        "external|Identifies an external class, namespace, or module.",                                      "file|Describe a file.",
        "fires|Describe the events this method may fire.",                                                   "function|Describe a function or method.",
        "generator|Indicate that a function is a generator function.",                                       "global|Document a global object.",
        "hideconstructor|Indicate that the constructor should not be displayed.",                            "ignore|Omit a symbol from the documentation.",
        "implements|This symbol implements an interface.",                                                   "inheritdoc|Indicate that a symbol should inherit its parent's documentation.",
        "inner|Document an inner object.",                                                                   "instance|Document an instance member.",
        "interface|This symbol is an interface that others can implement.",                                  "kind|What kind of symbol is this?",
        "lends|Document properties on an object literal as if they belonged to a symbol with a given name.", "license|Identify the license that applies to this code.",
        "listens|List the events that a symbol listens for.",                                                "memberof|This symbol belongs to a parent symbol.",
        "member|Document a member.",                                                                         "mixes|This object mixes in all the members from another object.",
        "mixin|Document a mixin object.",                                                                    "module|Document a JavaScript module.",
        "namespace|Document a namespace object.",                                                            "name|Document the name of an object.",
        "override|Indicate that a symbol overrides its parent.",                                             "package|This symbol is meant to be package-private.",
        "param|Document the parameter to a function.",                                                       "private|This symbol is meant to be private.",
        "property|Document a property of an object.",                                                        "protected|This symbol is meant to be protected.",
        "public|This symbol is meant to be public.",                                                         "readonly|This symbol is meant to be read-only.",
        "requires|This file requires a JavaScript module.",                                                  "returns|Document the return value of a function.",
        "see|Refer to some other documentation for more information.",                                       "since|When was this feature added?",
        "static|Document a static member.",                                                                  "summary|A shorter version of the full description.",
        "template|declare a `template` token, which is mainly used for the `javascript` side jsdoc", /* customized document */
        "this|What does the 'this' keyword refer to here?",                                                  "throws|Describe what errors could be thrown.",
        "todo|Document tasks to be completed.",                                                              "tutorial|Insert a link to an included tutorial file.",
        "typedef|Document a custom type.",                                                                   "type|Document the type of an object.",
        "variation|Distinguish different objects with the same name.",                                       "version|Documents the version number of an item.",
        "yields|Document the value yielded by a generator function.",
    ];
    /**
     * see [jsdoc.app.ts](file:///F:/my_work/develop/typescript/contribute-ts-fix-broken-regex/tmp/script-tmp/externals/jsdoc.app.ts)
     */
    const documentationOfInline = [
        "link|Link to another item in the documentation.",
        "tutorial|Link to a tutorial."
    ];

    /**
     * @version 1.0
     * @date 2020/4/30
     */
    const syntaxMap = {
        block: {
            access: "@access <package|private|protected|public>",
            alias: "@alias <aliasNamepath>",
            async: "@async",
            augments: "@augments <namepath>",
            author: "@author <name> [<emailAddress>]",
            borrows: "@borrows <that namepath> as <this namepath>",
            /**
             * &#64;callback is similar to &#64;typedef,  
             * but it specifies a function type instead of an object type
             * 
             * see {@link https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#typedef-callback-and-param|Type Checking JavaScript Files}
             */
            callback: "@callback <namepath>",
            class: "@class [<type> <name>]",
            classdesc: "@classdesc <some description>",
            constant: "@constant [<type> <name>]",
            constructs: "@constructs [<name>]",
            copyright: "@copyright <some copyright text>",
            default: "@default [<some value>]",
            deprecated: "@deprecated [<some text>]",
            description: "@description <some description>",
            enum: "@enum [<type>]",
            event: "@event <className>#[event:]<eventName>",
            exports: "@exports <moduleName>",
            external: "@external <NameOfExternal>",
            fires: "@fires <className>#[event:]<eventName>",
            function: "@function [<FunctionName>]",
            generator: "@generator",
            hideconstructor: "@hideconstructor",
            implements: "@implements {typeExpression}",
            kind: "@kind <kindName>",
            lends: "@lends <namepath>",
            license: "@license <identifier>",
            listens: "@listens <eventName>",
            member: "@member [<type>] [<name>]",
            memberof: "@memberof <parentNamepath>",
            mixes: "@mixes <OtherObjectPath>",
            mixin: "@mixin [<MixinName>]",
            module: "@module [[{<type>}] <moduleName>]",
            name: "@name <namePath>",
            namespace: "@namespace [[{<type>}] <SomeName>]",
            param: "@param [{typeExpression}] <name> [-] <description>", /* customized */
            requires: "@requires <someModuleName>",
            returns: "@returns [{type}] [description]",
            see: "@see <namepath>",
            since: "@since <versionDescription>",
            summary: "@summary Summary goes here.",
            template: "@template {typeName} <template token> [<description>]", /* customized */
            this: "@this <namePath>",
            throws: "@throws free-form description",
            todo: "@todo text describing thing to do.",
            tutorial: "@tutorial",
            type: "@type {typeName} [<description>]", /* customized */
            typedef: "@typedef [<type>] <namepath>",
            variation: "@variation <variationNumber>",
            yields: "@yields [{type}] [description]"
        },
        inline: {
            link: "{@link namepathOrURL}\n[link text]{@link namepathOrURL}\n{@link namepathOrURL|link text}\n{@link namepathOrURL link text (after the first space)}",
            tutorial: "{@tutorial tutorialID}\n[link text]{@tutorial tutorialID}\n{@tutorial tutorialID|link text}\n{@tutorial tutorialID link text (after the first space)}"
        }
    };

    let jsDocTagNameCompletionEntries: CompletionEntry[];
    let jsDocTagCompletionEntries: CompletionEntry[];

    let jsDocInlineTagNameCompletionEntries: CompletionEntry[];
    let jsDocInlineTagCompletionEntries: CompletionEntry[];

    export function getJsDocCommentsFromDeclarations(declarations: readonly Declaration[]): SymbolDisplayPart[] {
        // Only collect doc comments from duplicate declarations once:
        // In case of a union property there might be same declaration multiple times
        // which only varies in type parameter
        // Eg. const a: Array<string> | Array<number>; a.length
        // The property length will have two declarations of property length coming
        // from Array<T> - Array<string> and Array<number>
        const documentationComment: string[] = [];
        forEachUnique(declarations, declaration => {
            for (const { comment } of getCommentHavingNodes(declaration)) {
                if (comment === undefined) continue;
                pushIfUnique(documentationComment, comment);
            }
        });
        return intersperse(map(documentationComment, textPart), lineBreakPart());
    }

    function getCommentHavingNodes(declaration: Declaration): readonly (JSDoc | JSDocTag)[] {
        switch (declaration.kind) {
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocPropertyTag:
                return [declaration as JSDocPropertyTag];
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocTypedefTag:
                return [(declaration as JSDocTypedefTag), (declaration as JSDocTypedefTag).parent];
            default:
                return getJSDocCommentsAndTags(declaration);
        }
    }

    export function getJsDocTagsFromDeclarations(declarations?: Declaration[]): JSDocTagInfo[] {
        // Only collect doc comments from duplicate declarations once.
        const tags: JSDocTagInfo[] = [];
        forEachUnique(declarations, declaration => {
            for (const tag of getJSDocTags(declaration)) {
                tags.push({ name: tag.tagName.text, text: getCommentText(tag) });
            }
        });
        return tags;
    }

    function getCommentText(tag: JSDocTag): TBD<string> {
        const { comment } = tag;
        const addComment = (s: Node | string) => {
            const text = typeof s === "string"? s: s.getText();
            return comment === undefined ? text : `${text} ${comment}`;
        };

        switch (tag.kind) {
            case SyntaxKind.JSDocImplementsTag:
                return addComment((tag as JSDocImplementsTag).class);
            case SyntaxKind.JSDocAugmentsTag:
                return addComment((tag as JSDocAugmentsTag).class);
            case SyntaxKind.JSDocTemplateTag:
                return addComment((tag as JSDocTemplateTag).typeParameters.map(x => x.getText()).join(", "));
            case SyntaxKind.JSDocTypeTag:
                return addComment((tag as JSDocTypeTag).typeExpression);
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocSeeTag:
                const { name } = tag as JSDocTypedefTag | JSDocPropertyTag | JSDocParameterTag | JSDocSeeTag;
                return name ? addComment(name) : comment;
            default:
                return comment;
        }
        // function withNode(node: Node) {
        //     return addComment(node.getText());
        // }
        // function withList(list: NodeArray<Node>): string {
        //     return addComment(list.map(x => x.getText()).join(", "));
        // }
    }

    /**
     * Completion Entry Emitter
     *
     * @param name jsdoc tag (name)
     */
    const emitCompletionEntry = (name: string, kind = ScriptElementKind.jsDocTag) => ({ name, kind, kindModifiers: "", sortText: Completions.SortText.LocationPriority }) as CompletionEntry;
    /**
     * jsDocTag Completion Entry Emitter
     *
     * @param name jsdoc tag name
     */
    const emitTagCompletionEntry = (name: string, kind = ScriptElementKind.jsDocTag) => emitCompletionEntry("@" + name, kind);

    // helper
    const selectJSDocData = (kind: ScriptElementKind) => {
        return (kind === ScriptElementKind.jsDocTag ? [
            jsDocTagNames, documentationOfBlock, syntaxMap.block,
        ] : [
            inlinejsDocTagNames, documentationOfInline, syntaxMap.inline,
        ]) as [
            string[], string[], Record<string, string>
        ];
    };
    /**
     * This function will only be executed the first time
     *
     * @param names jsdoc tag name (with @?)
     * @param kind ScriptElementKind.jsDocTag or ScriptElementKind.inlineJsDocTag
     * @version 2.2
     * @date 2020/5/15
     */
    const parseJSDocTagNamesForCompletionEntry = (names: string[], kind = ScriptElementKind.jsDocTag) => {
        const entries: CompletionEntry[] = [];
        const [
            tagNamesData,   // jsDocTagNames or inlinejsDocTagNames
            documentations, // documentationOfBlock or documentationOfInline
            syntaxData      // syntaxMap.block or syntaxMap.inline
        ] = selectJSDocData(kind);

        for (let nameIndex = 0, index = 0, end = names.length; nameIndex < end;) {
            let name = names[nameIndex++];
            if (name.indexOf(":") > 0) {
                // "link:linkcode,linkplain" -> ["link", "linkcode,linkplain"]
                let syms: string;
                [name, syms] = name.split(":");

                const reTag  = new RegExp(`@${name}`, "g");
                const syntax = syntaxData[name];
                let documentData: string; {
                    const uniqName = name + "|";
                    documentData = find(documentations, e => e.indexOf(uniqName) === 0)!.split("|")[1];
                }

                for (const sym of syms.split(",")) {
                    tagNamesData.push(sym);
                    if (documentData) {
                        documentations.push(`${sym}|${documentData}`);
                    }
                    if (syntax) {
                        syntaxData[sym] = syntax.replace(reTag, `@${sym}`);
                    }
                    entries[index++] = emitCompletionEntry(sym, kind);
                }
            }

            entries[index++] = emitCompletionEntry(name, kind);
        }

        return entries;
    };

    export function getJSDocTagNameCompletions(): CompletionEntry[] {
        if (jsDocTagNameCompletionEntries) return jsDocTagNameCompletionEntries;
        return jsDocTagNameCompletionEntries = parseJSDocTagNamesForCompletionEntry(jsDocTagNames);
    }
    export function getInlineJSDocTagNameCompletions(): CompletionEntry[] {
        if (jsDocInlineTagNameCompletionEntries) return jsDocInlineTagNameCompletionEntries;
        return jsDocInlineTagNameCompletionEntries = parseJSDocTagNamesForCompletionEntry(inlinejsDocTagNames, ScriptElementKind.inlineJsDocTag);
    }

    export function getJSDocTagCompletions(): CompletionEntry[] {
        return jsDocTagCompletionEntries || (jsDocTagCompletionEntries = map(getJSDocTagNameCompletions(), e => {
            return emitTagCompletionEntry(e.name);
        }));
    }
    export function getInlineJSDocTagCompletions(): CompletionEntry[] {
        return jsDocInlineTagCompletionEntries || (jsDocInlineTagCompletionEntries = map(getInlineJSDocTagNameCompletions(), e => {
            return emitTagCompletionEntry(e.name, ScriptElementKind.inlineJsDocTag);
        }));
    }

    const highlightSyntax = (syntax: string) => {
        if (/\n/.test(syntax)) {
            return syntax.split("\n").reduce(
                (acc, line, idx, array) => acc + `\`${line}\`${(idx < array.length - 1) ? "  \n": ""}`, ""
            );
        }
        else {
            return `\`${syntax}\``;
        }
    };
    /**
     * share with jsdoc tag names
     *
     * @param name jsdoc tag name (with @
     * @version 2.0
     * @date 2020/5/15
     */
    export function getJSDocTagCompletionDetails(
        name: string, completionKind: Completions.CompletionDataKind
    ): CompletionEntryDetails {
        const isBlock = completionKind <= Completions.CompletionDataKind.JsDocTag;
        const hasAt = name[0] === "@";
        // let infos: TBD<JSDocTagInfo[]>;
        let documentation: TBD<SymbolDisplayPart[]>;

        // TODO: "tutorial" does contains at both block and inline
        let entry: TBD<CompletionEntry>; {
            const jsDocTagCompletionsFunction = isBlock? (
                hasAt ? getJSDocTagCompletions : getJSDocTagNameCompletions
            ) : (
                hasAt ? getInlineJSDocTagCompletions : getInlineJSDocTagNameCompletions
            );
            entry = find(jsDocTagCompletionsFunction(), e => e.name === name);
        }
        const kind = entry && entry.kind || ScriptElementKind.unknown;

        if (entry) {
            let synonyms: TBD<string[]>;
            const tagName = hasAt ? entry.name.substring(1) : entry.name; {
                const uniqName = tagName + ":";
                const findPredicate = (n: string) => n.indexOf(uniqName) === 0;
                const tagWithSyms = find(isBlock? jsDocTagNames : inlinejsDocTagNames, findPredicate);
                if (tagWithSyms/*  && tagWithSyms.indexOf(":") > 0 */) {
                    synonyms = tagWithSyms.split(":")[1].split(",");
                }
            }
            // infos = [{
            //     name: tagName,
            //     // TODO: Quote a short description from https://jsdoc.app/
            //     text: kind
            // }];

            let tinyDocument: string; {
                const uniqName = tagName + "|";
                tinyDocument = find(
                    isBlock ? documentationOfBlock : documentationOfInline, e => e.indexOf(uniqName) === 0
                )?.split("|")[1] || "no document";
            }
            let syntax: TBD<string>; {
                const category = syntaxMap[isBlock ? "block": "inline"] as Record<string, string>;
                syntax = category[tagName];
            }

            documentation = [{
                // DEVNOTE: details seems to be parsed as markdown
                // DONE: link url is different for block type and inline type (2020/4/15 already done)
                // https://jsdoc.app/tags-tutorial.html
                // https://jsdoc.app/tags-inline-link.html OK
                //                        ^^^^^^^
                // TODO: more smarty code - 2020/4/15 12:31:36 OK? (2020/4/15 almost done?)
                // DEVNOTE: "\n\n" for vscode details format (maybe markdown
                text: `${
                    tinyDocument // Diagnostics.use_strict_directive_used_here.message
                }\n\n${synonyms? `Synonyms: ${ synonyms.map(s => "@" + s).join(", ") }\n\n`: ""
                }\n\n${syntax? `Syntax:  \n_${highlightSyntax(syntax)}_\n\n`: ""
                }More details - [@use JSDoc](https://jsdoc.app/tags-${isBlock? "": "inline-"}${tagName}.html)`,
                kind: "jsDocKeyword"
            }];

            // documentation = [{
            //     // DEVNOTE: details seems to be parsed as markdown
            //     // DONE: link url is different for block type and inline type (2020/4/15 already done)
            //     // https://jsdoc.app/tags-tutorial.html
            //     // https://jsdoc.app/tags-inline-link.html OK
            //     //                        ^^^^^^^
            //     // TODO: more smarty code - 2020/4/15 12:31:36 OK? (2020/4/15 almost done?)
            //     // DEVNOTE: "\n\n" for vscode details format (maybe markdown
            //     text: `${
            //         tinyDocument // Diagnostics.use_strict_directive_used_here.message
            //     }\n\n${synonyms? `Synonyms: ${
            //         synonyms.map(s => "@" + s).join(", ")}\n\n`: ""
            //     }More details - [@use JSDoc](https://jsdoc.app/tags-${isBlock? "": "inline-"}${tagName}.html)`,
            //     kind: "jsDocKeyword"
            // }];
        }

        return {
            name,
            kind, // TODO: should have its own kind?
            kindModifiers: "",
            displayParts: [textPart(name)],
            documentation,//: documentation || undefined,
            //// tags: infos || undefined,
            // codeActions: undefined, TODO:?
        };
    }
    // export const getJSDocTagNameCompletionDetails = getJSDocTagCompletionDetails;

    export function getJSDocParameterNameCompletions(tag: JSDocParameterTag): CompletionEntry[] {
        if (!isIdentifier(tag.name)) {
            return emptyArray;
        }
        const nameThusFar = tag.name.text;
        const jsdoc = tag.parent;
        const fn = jsdoc.parent;
        if (!isFunctionLike(fn)) return [];

        return mapDefined(fn.parameters, param => {
            if (!isIdentifier(param.name)) return undefined;

            const name = param.name.text;
            if (jsdoc.tags!.some(t => t !== tag && isJSDocParameterTag(t) && isIdentifier(t.name) && t.name.escapedText === name) // TODO: GH#18217
                || nameThusFar !== undefined && !startsWith(name, nameThusFar)) {
                return undefined;
            }

            return { name, kind: ScriptElementKind.parameterElement, kindModifiers: "", sortText: Completions.SortText.LocationPriority };
        });
    }

    export function getJSDocParameterNameCompletionDetails(name: string): CompletionEntryDetails {
        return {
            name,
            kind: ScriptElementKind.parameterElement,
            kindModifiers: "",
            displayParts: [textPart(name)],
            documentation: emptyArray,
            tags: undefined,
            codeActions: undefined,
        };
    }

    /**
     * Checks if position points to a valid position to add JSDoc comments, and if so,
     * returns the appropriate template. Otherwise returns an empty string.
     * 
     * Valid positions are
     * 
     *   - outside of comments, statements, and expressions, and
     *   - preceding a:
     *     - function/constructor/method declaration
     *     - class declarations
     *     - variable statements
     *     - namespace declarations
     *     - interface declarations
     *     - method signatures
     *     - type alias declarations
     *
     * Hosts should ideally check that:
     *   - The line is all whitespace up to 'position' before performing the insertion.
     *   - If the keystroke sequence "/&#42;&#42;" induced the call, we also check that the next
     * non-whitespace character is '&#42;', which (approximately) indicates whether we added
     * the second '&#42;' to complete an existing (JSDoc) comment.
     * 
     * @param fileName The file in which to perform the check.
     * @param position The (character-indexed) position in the file where the check should
     *     be performed.
     */
    export function getDocCommentTemplateAtPosition(newLine: string, sourceFile: SourceFile, position: number): TextInsertion | undefined {
        const tokenAtPos = getTokenAtPosition(sourceFile, position);
        const existingDocComment = findAncestor(tokenAtPos, isJSDoc);
        if (existingDocComment && (existingDocComment.comment !== undefined || length(existingDocComment.tags))) {
            // Non-empty comment already exists.
            return undefined;
        }

        const tokenStart = tokenAtPos.getStart(sourceFile);
        // Don't provide a doc comment template based on a *previous* node. (But an existing empty jsdoc comment will likely start before `position`.)
        if (!existingDocComment && tokenStart < position) {
            return undefined;
        }

        const commentOwnerInfo = getCommentOwnerInfo(tokenAtPos);
        if (!commentOwnerInfo) {
            return undefined;
        }
        const { commentOwner, parameters } = commentOwnerInfo;
        if (commentOwner.getStart(sourceFile) < position) {
            return undefined;
        }

        if (!parameters || parameters.length === 0) {
            // if there are no parameters, just complete to a single line JSDoc comment
            return { newText: "/** */", caretOffset: 3 };
        }

        const indentationStr = getIndentationStringAtPosition(sourceFile, position);

        // A doc comment consists of the following
        // * The opening comment line
        // * the first line (without a param) for the object's untagged info (this is also where the caret ends up)
        // * the '@param'-tagged lines
        // * TODO: other tags.
        // * the closing comment line
        // * if the caret was directly in front of the object, then we add an extra line and indentation.
        const preamble = "/**" + newLine + indentationStr + " * ";
        const result =
            preamble + newLine +
            parameterDocComments(parameters, hasJSFileExtension(sourceFile.fileName), indentationStr, newLine) +
            indentationStr + " */" +
            (tokenStart === position ? newLine + indentationStr : "");

        return { newText: result, caretOffset: preamble.length };
    }

    function getIndentationStringAtPosition(sourceFile: SourceFile, position: number): string {
        const { text } = sourceFile;
        const lineStart = getLineStartPositionForPosition(position, sourceFile);
        let pos = lineStart;
        for (; pos <= position && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++);
        return text.slice(lineStart, pos);
    }

    function parameterDocComments(parameters: readonly ParameterDeclaration[], isJavaScriptFile: boolean, indentationStr: string, newLine: string): string {
        return parameters.map(({ name, dotDotDotToken }, i) => {
            const paramName = name.kind === SyntaxKind.Identifier ? name.text : "param" + i;
            const type = isJavaScriptFile ? (dotDotDotToken ? "{...any} " : "{any} ") : "";
            return `${indentationStr} * @param ${type}${paramName}${newLine}`;
        }).join("");
    }

    interface CommentOwnerInfo {
        readonly commentOwner: Node;
        readonly parameters?: readonly ParameterDeclaration[];
    }
    function getCommentOwnerInfo(tokenAtPos: Node): CommentOwnerInfo | undefined {
        return forEachAncestor(tokenAtPos, getCommentOwnerInfoWorker);
    }
    function getCommentOwnerInfoWorker(commentOwner: Node): CommentOwnerInfo | undefined | "quit" {
        switch (commentOwner.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodSignature:
                const { parameters } = commentOwner as FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | MethodSignature;
                return { commentOwner, parameters };

            case SyntaxKind.PropertyAssignment:
                return getCommentOwnerInfoWorker((commentOwner as PropertyAssignment).initializer);

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.TypeAliasDeclaration:
                return { commentOwner };

            case SyntaxKind.VariableStatement: {
                const varStatement = <VariableStatement>commentOwner;
                const varDeclarations = varStatement.declarationList.declarations;
                const parameters = varDeclarations.length === 1 && varDeclarations[0].initializer
                    ? getParametersFromRightHandSideOfAssignment(varDeclarations[0].initializer)
                    : undefined;
                return { commentOwner, parameters };
            }

            case SyntaxKind.SourceFile:
                return "quit";

            case SyntaxKind.ModuleDeclaration:
                // If in walking up the tree, we hit a a nested namespace declaration,
                // then we must be somewhere within a dotted namespace name; however we don't
                // want to give back a JSDoc template for the 'b' or 'c' in 'namespace a.b.c { }'.
                return commentOwner.parent.kind === SyntaxKind.ModuleDeclaration ? undefined : { commentOwner };

            case SyntaxKind.ExpressionStatement:
                return getCommentOwnerInfoWorker((commentOwner as ExpressionStatement).expression);
            case SyntaxKind.BinaryExpression: {
                const be = commentOwner as BinaryExpression;
                if (getAssignmentDeclarationKind(be) === AssignmentDeclarationKind.None) {
                    return "quit";
                }
                const parameters = isFunctionLike(be.right) ? be.right.parameters : emptyArray;
                return { commentOwner, parameters };
            }
            case SyntaxKind.PropertyDeclaration:
                const init = (commentOwner as PropertyDeclaration).initializer;
                if (init && (isFunctionExpression(init) || isArrowFunction(init))) {
                    return { commentOwner, parameters: init.parameters };
                }
        }
    }

    /**
     * Digs into an an initializer or RHS operand of an assignment operation
     * to get the parameters of an apt signature corresponding to a
     * function expression or a class expression.
     *
     * @param rightHandSide the expression which may contain an appropriate set of parameters
     * @returns the parameters of a signature found on the RHS if one exists; otherwise 'emptyArray'.
     */
    function getParametersFromRightHandSideOfAssignment(rightHandSide: Expression): readonly ParameterDeclaration[] {
        while (rightHandSide.kind === SyntaxKind.ParenthesizedExpression) {
            rightHandSide = (<ParenthesizedExpression>rightHandSide).expression;
        }

        switch (rightHandSide.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return (<FunctionExpression>rightHandSide).parameters;
            case SyntaxKind.ClassExpression: {
                const ctr = find((rightHandSide as ClassExpression).members, isConstructorDeclaration);
                return ctr ? ctr.parameters : emptyArray;
            }
        }

        return emptyArray;
    }
}
