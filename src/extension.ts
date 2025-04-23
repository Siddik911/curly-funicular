import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    
    // Register the "jumpToNextCodeBlock" command
    let jumpToNextCodeBlock = vscode.commands.registerCommand('extension.jumpToNextCodeBlock', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const position = editor.selection.active;
        const line = position.line;

        let nextBlockStart: vscode.Position | undefined = undefined;

        // Search for the next '{' or '}' in the document
        for (let i = line + 1; i < document.lineCount; i++) {
            const currentLine = document.lineAt(i);

            const openBraceIndex = currentLine.text.indexOf("{");
            if (openBraceIndex !== -1) {
                nextBlockStart = new vscode.Position(i, openBraceIndex);
                break;
            }

            const closeBraceIndex = currentLine.text.indexOf("}");
            if (closeBraceIndex !== -1) {
                nextBlockStart = new vscode.Position(i, closeBraceIndex);
                break;
            }
        }

        if (nextBlockStart) {
            editor.selection = new vscode.Selection(nextBlockStart, nextBlockStart);
            editor.revealRange(new vscode.Range(nextBlockStart, nextBlockStart));
        }
    });

    // Register the "jumpToPreviousCodeBlock" command
    let jumpToPreviousCodeBlock = vscode.commands.registerCommand('extension.jumpToPreviousCodeBlock', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const position = editor.selection.active;
        const line = position.line;

        let prevBlockStart: vscode.Position | undefined = undefined;

        // Search for the previous '{' or '}' in the document
        for (let i = line - 1; i >= 0; i--) {
            const currentLine = document.lineAt(i);

            const openBraceIndex = currentLine.text.indexOf("{");
            if (openBraceIndex !== -1) {
                prevBlockStart = new vscode.Position(i, openBraceIndex);
                break;
            }

            const closeBraceIndex = currentLine.text.indexOf("}");
            if (closeBraceIndex !== -1) {
                prevBlockStart = new vscode.Position(i, closeBraceIndex);
                break;
            }
        }

        if (prevBlockStart) {
            editor.selection = new vscode.Selection(prevBlockStart, prevBlockStart);
            editor.revealRange(new vscode.Range(prevBlockStart, prevBlockStart));
        }
    });

    // Register both commands
    context.subscriptions.push(jumpToNextCodeBlock, jumpToPreviousCodeBlock);
}

export function deactivate() {}
