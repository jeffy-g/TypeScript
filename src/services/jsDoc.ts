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
     *   + 67 entries
     *
     *   + format: <primary>:<synonym>,<synonym>,...
     */
    const jsDocTagNames = [
        "abstract:virtual",
        "access",
        "alias",
        "async",
        "augments:extends",
        "author",
        "borrows",
        "callback",
        "class:constructor",
        "classdesc",
        "constant:const",
        "constructs",
        "copyright",
        "default:defaultvalue",
        "deprecated",
        "description:desc",
        "enum",
        "event",
        "example",
        "exports",
        "external:host",
        "file:fileoverview,overview",
        "fires:emits",
        "function:func,method",
        "generator",
        "global",
        "hideconstructor",
        "ignore",
        "implements",
        "inheritdoc",
        "inner",
        "instance",
        "interface",
        "kind",
        "lends",
        "license",
        "listens",
        "member:var",
        "memberof",
        "mixes",
        "mixin",
        "module",
        "name",
        "namespace",
        "override",
        "package",
        "param:arg,argument",
        "private",
        "property:prop",
        "protected",
        "public",
        "readonly",
        "requires",
        "returns:return",
        "see",
        "since",
        "static",
        "summary",
        "this",
        "throws:exception",
        "todo",
        "tutorial",
        "type",
        "typedef",
        "variation",
        "version",
        "yields:yield"
    ];
    /**
     * [&#64;use JSDoc](https://jsdoc.app/)
     *
     *   + 2 entries
     */
    const inlinejsDocTagNames = [
        "link:linkcode,linkplain",
        "tutorial",
    ];

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
        const documentationComment: SymbolDisplayPart[] = [];
        forEachUnique(declarations, declaration => {
            for (const { comment } of getCommentHavingNodes(declaration)) {
                if (comment === undefined) continue;
                if (documentationComment.length) {
                    documentationComment.push(lineBreakPart());
                }
                documentationComment.push(textPart(comment));
            }
        });
        return documentationComment;
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
                const { name } = tag as JSDocTypedefTag | JSDocPropertyTag | JSDocParameterTag;
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
     * jsDocTag Completion Entry Emitter
     *
     * @param name jsdoc tag name
     */
    const emitJSDocTagCompletionEntry = (name: string) => ({ name, kind: ScriptElementKind.keyword, kindModifiers: "", sortText: "0" }) as CompletionEntry;
    /**
     * jsDocTag Name Completion Entry Emitter
     *
     * @param name jsdoc tag name
     */
    const emitJSDocTagNameCompletionEntry = (name: string) => emitJSDocTagCompletionEntry("@" + name);
    // helper
    const parseJSDocTagNamesForCompletionEntry = (names: string[]) => {
        const entries: CompletionEntry[] = [];
        for (let i = 0, end = names.length; i < end;) {
            let name = names[i];
            if (name.indexOf(":") > 0) {
                // "link:linkcode,linkplain" -> ["link", "linkcode,linkplain"]
                name = name.split(":")[0];
            }
            entries[i++] = emitJSDocTagCompletionEntry(name);
        }
        return entries;
    };

    export function getJSDocTagNameCompletions(): CompletionEntry[] {
        if (jsDocTagNameCompletionEntries) return jsDocTagNameCompletionEntries;
        return jsDocTagNameCompletionEntries = parseJSDocTagNamesForCompletionEntry(jsDocTagNames);
    }
    export function getInlineJSDocTagNameCompletions(): CompletionEntry[] {
        if (jsDocInlineTagNameCompletionEntries) return jsDocInlineTagNameCompletionEntries;
        return jsDocInlineTagNameCompletionEntries = parseJSDocTagNamesForCompletionEntry(inlinejsDocTagNames);
    }

    export function getJSDocTagCompletions(): CompletionEntry[] {
        return jsDocTagCompletionEntries || (jsDocTagCompletionEntries = map(getJSDocTagNameCompletions(), e => {
            return emitJSDocTagNameCompletionEntry(e.name);
        }));
    }
    export function getInlineJSDocTagCompletions(): CompletionEntry[] {
        return jsDocInlineTagCompletionEntries || (jsDocInlineTagCompletionEntries = map(getInlineJSDocTagNameCompletions(), e => {
            return emitJSDocTagNameCompletionEntry(e.name);
        }));
    }

    /**
     * share with jsdoc tag names
     *
     * @param name jsdoc tag name (with @
     */
    export function getJSDocTagCompletionDetails(name: string): CompletionEntryDetails {

        const finder = (e => e.name === name) as (e: CompletionEntry) => boolean;
        let infos: TBD<JSDocTagInfo[]>;
        let documentation: TBD<SymbolDisplayPart[]>;

        const entry = find(getJSDocTagCompletions(), finder) || find(getInlineJSDocTagCompletions(), finder);
        if (entry) {
            let synonyms: TBD<string[]>;
            const tagName = entry.name.substring(1);
            const finder2 = (name: string) => name.indexOf(tagName) === 0;
            const data = find(jsDocTagNames, finder2) || find(inlinejsDocTagNames, finder2);
            if (data && data.indexOf(":") > 0) {
                synonyms = data.split(":")[1].split(",");
            }
            infos = [{
                name: tagName, text: tagName
            }];
            documentation = [{
                // DEVNOTE: details seems to be parsed as markdown
                text: `${synonyms? `synonyms: ${synonyms.map(s => "@" + s).join(", ")}\n\n`: ""}see - https://jsdoc.app/tags-${tagName}.html`,
                kind: "keyword"
            }];
        }

        return {
            name,
            kind: ScriptElementKind.unknown, // TODO: should have its own kind?
            kindModifiers: "",
            displayParts: [textPart(name)],
            documentation: documentation || undefined,
            tags: infos || undefined,
            codeActions: undefined,
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

            return { name, kind: ScriptElementKind.parameterElement, kindModifiers: "", sortText: "0" };
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
     * Valid positions are
     *      - outside of comments, statements, and expressions, and
     *      - preceding a:
     *          - function/constructor/method declaration
     *          - class declarations
     *          - variable statements
     *          - namespace declarations
     *          - interface declarations
     *          - method signatures
     *          - type alias declarations
     *
     * Hosts should ideally check that:
     * - The line is all whitespace up to 'position' before performing the insertion.
     * - If the keystroke sequence "/\*\*" induced the call, we also check that the next
     * non-whitespace character is '*', which (approximately) indicates whether we added
     * the second '*' to complete an existing (JSDoc) comment.
     * @param fileName The file in which to perform the check.
     * @param position The (character-indexed) position in the file where the check should
     * be performed.
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
